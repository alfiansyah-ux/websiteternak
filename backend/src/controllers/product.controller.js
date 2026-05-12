const prisma = require('../utils/prisma');

const listProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0,
        },
      },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(products);
  } catch (error) {
    console.error('List products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        farmer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'FARMER') {
      return res.status(403).json({ message: 'Only farmers can add products' });
    }

    const { name, type, price, stock, description, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: {
        farmerId: req.user.id,
        name,
        type,
        price: Number(price),
        stock: Number(stock),
        description,
        imageUrl,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, type, price, stock, description, imageUrl } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role !== 'ADMIN' && existing.farmerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        type: type ?? existing.type,
        price: price !== undefined ? Number(price) : existing.price,
        stock: stock !== undefined ? Number(stock) : existing.stock,
        description: description ?? existing.description,
        imageUrl: imageUrl ?? existing.imageUrl,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role !== 'ADMIN' && existing.farmerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};