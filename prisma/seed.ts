import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed a default user for associations
  const defaultUser = await prisma.user.upsert({
    where: { email: 'defaultuser@example.com' },
    update: {},
    create: {
      clerkId: 'clerk_user_id_123',
      email: 'defaultuser@example.com',
      firstName: 'Default',
      lastName: 'User',
      role: 'USER', // Adjust role as needed
    },
  });

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product A',
      description: 'High quality product A',
      price: 10.99,
      stockQuantity: 100,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product B',
      description: 'Durable and affordable product B',
      price: 25.50,
      stockQuantity: 50,
    },
  });

  // Seed Sales with userId
  await prisma.sale.create({
    data: {
      productId: product1.id,
      quantity: 2,
      total: 21.98,
      userId: defaultUser.id, // Add userId
    },
  });

  await prisma.sale.create({
    data: {
      productId: product2.id,
      quantity: 1,
      total: 25.50,
      userId: defaultUser.id, // Add userId
    },
  });

  // Seed Purchases with userId
  await prisma.purchase.create({
    data: {
      productId: product1.id,
      quantity: 50,
      total: 549.50,
      supplier: 'Supplier XYZ',
      userId: defaultUser.id, // Add userId
    },
  });

  await prisma.purchase.create({
    data: {
      productId: product2.id,
      quantity: 20,
      total: 510.00,
      supplier: 'Supplier ABC',
      userId: defaultUser.id, // Add userId
    },
  });

  // Seed Expenses with userId
  await prisma.expense.create({
    data: {
      description: 'Office Supplies',
      amount: 100.00,
      userId: defaultUser.id, // Add userId
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Utility Bills',
      amount: 200.00,
      userId: defaultUser.id, // Add userId
    },
  });

  // Seed Reports with userId
  await prisma.report.create({
    data: {
      type: 'Profit/Loss',
      content: {
        totalSales: 47.48,
        totalExpenses: 300.00,
        netProfit: -252.52,
      },
      userId: defaultUser.id, // Add userId
    },
  });

  await prisma.report.create({
    data: {
      type: 'Stock Performance',
      content: {
        products: [
          { name: 'Product A', sales: 2, stockRemaining: 100 },
          { name: 'Product B', sales: 1, stockRemaining: 50 },
        ],
      },
      userId: defaultUser.id, // Add userId
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
