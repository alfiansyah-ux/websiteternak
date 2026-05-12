const prisma = require('../utils/prisma');

const createOrder = async (req, res) => {
  try {
    if (req.user.role !== 'CUSTOMER') {
      return res.status(403).json({ message: 'Only customers can place orders' });
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const productIds = items.map((item) => Number(item.productId));

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Some products are invalid' });
    }

    const lineItems = items.map((item) => {
      const product = products.find((product) => product.id === Number(item.productId));
      const quantity = Number(item.quantity);
      if (!product || quantity <= 0) {
        throw new Error('Invalid order item');
      }
      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      return {
        product,
        quantity,
        price: product.price,
      };
    });

    const totalAmount = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          customerId: req.user.id,
          totalAmount,
          status: 'PAID',
        },
      });

      await Promise.all(
        lineItems.map(async (item) => {
          await tx.orderItem.create({
            data: {
              orderId: createdOrder.id,
              productId: item.product.id,
              quantity: item.quantity,
              price: item.price,
            },
          });

          await tx.product.update({
            where: { id: item.product.id },
            data: { stock: item.product.stock - item.quantity },
          });
        })
      );

      return createdOrder;
    });

    const createdOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Create order error:', error);
    const message = error.message.includes('Insufficient stock') ? error.message : 'Server error';
    res.status(400).json({ message });
  }
};

const listOrders = async (req, res) => {
  try {
    let where = {};

    if (req.user.role === 'CUSTOMER') {
      where.customerId = req.user.id;
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error('List orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'CUSTOMER' && order.customerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  listOrders,
  getOrderById,
};