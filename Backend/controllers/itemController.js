const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const itemController = {
  // Get all items
  getAllItems: async (req, res) => {
    try {
      const { search } = req.query;
    
    const where = search ? {
      OR: [
        { studentName: { contains: search, mode: 'insensitive' } },
        { cohort: { contains: search, mode: 'insensitive' } },
        {
          courses: {
            some: {
              title: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ]
    } : {};

      const items = await prisma.item.findMany({
        where,
        include: {
          courses: true // Include related courses
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  },

  // Get single item
  getItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await prisma.item.findUnique({
        where: { id },
        include: {
          courses: true // Include related courses
        }
      });
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  },

  // Create item
  createItem: async (req, res) => {
    try {
      const { studentName, cohort, courses, status } = req.body;
      
      const item = await prisma.item.create({
        data: {
          studentName,
          cohort,
          status: status || 'active',
          courses: {
            create: courses // Create related courses
          }
        },
        include: {
          courses: true // Include courses in response
        }
      });
      
      res.status(201).json(item);
    } catch (error) {
      console.error('Create error:', error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  },

  // Update item
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { studentName, cohort, courses, status } = req.body;

      // First delete existing courses
      await prisma.course.deleteMany({
        where: {
          itemId: id
        }
      });

      // Then update item and create new courses
      const item = await prisma.item.update({
        where: { id },
        data: {
          studentName,
          cohort,
          status,
          courses: {
            create: courses // Create new courses
          }
        },
        include: {
          courses: true // Include updated courses in response
        }
      });

      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
  },

  // Delete item
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.item.delete({
        where: { id }
      });
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }
};

module.exports = itemController;