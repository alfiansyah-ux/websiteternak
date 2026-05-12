const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Password123!',
      role: 'ADMIN',
      phone: '081234567890',
    },
    {
      name: 'Farmer User',
      email: 'farmer@example.com',
      password: 'Farmer123!',
      role: 'FARMER',
      phone: '081234567891',
    },
    {
      name: 'Customer User',
      email: 'customer@example.com',
      password: 'Customer123!',
      role: 'CUSTOMER',
      phone: '081234567892',
    },
  ];

  for (const userData of users) {
    const existing = await prisma.user.findUnique({ where: { email: userData.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
        },
      });
      console.log(`Created demo user: ${userData.email}`);
    } else {
      console.log(`Demo user already exists: ${userData.email}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
