const prisma = require('../utils/prisma');

const createLivestock = async (req, res) => {
  try {
    const { type, age, weight, healthCondition, vaccinationStatus, entryDate } = req.body;

    if (req.user.role !== 'FARMER') {
      return res.status(403).json({ message: 'Only farmers can add livestock' });
    }

    const livestock = await prisma.livestock.create({
      data: {
        farmerId: req.user.id,
        type,
        age: Number(age),
        weight: Number(weight),
        healthCondition: healthCondition || 'Healthy',
        vaccinationStatus: vaccinationStatus || 'Up to date',
        entryDate: entryDate ? new Date(entryDate) : undefined,
      },
    });

    res.status(201).json(livestock);
  } catch (error) {
    console.error('Create livestock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLivestockList = async (req, res) => {
  try {
    const where = req.user.role === 'FARMER' ? { farmerId: req.user.id } : {};

    const livestocks = await prisma.livestock.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(livestocks);
  } catch (error) {
    console.error('Get livestock list error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLivestockById = async (req, res) => {
  try {
    const livestockId = Number(req.params.id);

    const livestock = await prisma.livestock.findUnique({
      where: { id: livestockId },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!livestock) {
      return res.status(404).json({ message: 'Livestock not found' });
    }

    if (req.user.role !== 'ADMIN' && livestock.farmerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(livestock);
  } catch (error) {
    console.error('Get livestock detail error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateLivestock = async (req, res) => {
  try {
    const livestockId = Number(req.params.id);
    const { type, age, weight, healthCondition, vaccinationStatus, entryDate } = req.body;

    const existingLivestock = await prisma.livestock.findUnique({
      where: { id: livestockId },
    });

    if (!existingLivestock) {
      return res.status(404).json({ message: 'Livestock not found' });
    }

    if (req.user.role !== 'ADMIN' && existingLivestock.farmerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const livestock = await prisma.livestock.update({
      where: { id: livestockId },
      data: {
        type,
        age: age !== undefined ? Number(age) : existingLivestock.age,
        weight: weight !== undefined ? Number(weight) : existingLivestock.weight,
        healthCondition: healthCondition || existingLivestock.healthCondition,
        vaccinationStatus: vaccinationStatus || existingLivestock.vaccinationStatus,
        entryDate: entryDate ? new Date(entryDate) : existingLivestock.entryDate,
      },
    });

    res.json(livestock);
  } catch (error) {
    console.error('Update livestock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteLivestock = async (req, res) => {
  try {
    const livestockId = Number(req.params.id);

    const existingLivestock = await prisma.livestock.findUnique({
      where: { id: livestockId },
    });

    if (!existingLivestock) {
      return res.status(404).json({ message: 'Livestock not found' });
    }

    if (req.user.role !== 'ADMIN' && existingLivestock.farmerId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await prisma.livestock.delete({ where: { id: livestockId } });

    res.json({ message: 'Livestock deleted successfully' });
  } catch (error) {
    console.error('Delete livestock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createLivestock,
  getLivestockList,
  getLivestockById,
  updateLivestock,
  deleteLivestock,
};
