import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  })

  const managerRole = await prisma.role.create({
    data: {
      name: 'Manager',
    },
  })

  const employeeRole = await prisma.role.create({
    data: {
      name: 'Employee',
    },
  })

  // Seed Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Alice Admin',
      email: 'alice.admin@example.com',
      passwordHash: 'hashed_password_admin', // Replace with a hashed password
      roleId: adminRole.id,
    },
  })

  const managerUser = await prisma.user.create({
    data: {
      name: 'Bob Manager',
      email: 'bob.manager@example.com',
      passwordHash: 'hashed_password_manager', // Replace with a hashed password
      roleId: managerRole.id,
    },
  })

  const employeeUser = await prisma.user.create({
    data: {
      name: 'Charlie Employee',
      email: 'charlie.employee@example.com',
      passwordHash: 'hashed_password_employee', // Replace with a hashed password
      roleId: employeeRole.id,
    },
  })

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product A',
      description: 'High quality product A',
      price: 10.99,
      stockQuantity: 100,
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Product B',
      description: 'Durable and affordable product B',
      price: 25.50,
      stockQuantity: 50,
    },
  })

  // Seed Sales
  await prisma.sale.create({
    data: {
      productId: product1.id,
      quantity: 2,
      total: 21.98,
      employeeId: employeeUser.id,
    },
  })

  await prisma.sale.create({
    data: {
      productId: product2.id,
      quantity: 1,
      total: 25.50,
      employeeId: employeeUser.id,
    },
  })

  // Seed Purchases
  await prisma.purchase.create({
    data: {
      productId: product1.id,
      quantity: 50,
      total: 549.50,
      supplier: 'Supplier XYZ',
      employeeId: managerUser.id,
    },
  })

  await prisma.purchase.create({
    data: {
      productId: product2.id,
      quantity: 20,
      total: 510.00,
      supplier: 'Supplier ABC',
      employeeId: managerUser.id,
    },
  })

  // Seed Expenses
  await prisma.expense.create({
    data: {
      description: 'Office Supplies',
      amount: 100.00,
      employeeId: adminUser.id,
    },
  })

  await prisma.expense.create({
    data: {
      description: 'Utility Bills',
      amount: 200.00,
      employeeId: adminUser.id,
    },
  })

  // Seed Reports
  await prisma.report.create({
    data: {
      type: 'Profit/Loss',
      content: {
        totalSales: 47.48,
        totalExpenses: 300.00,
        netProfit: -252.52,
      },
    },
  })

  await prisma.report.create({
    data: {
      type: 'Stock Performance',
      content: {
        products: [
          { name: 'Product A', sales: 2, stockRemaining: 100 },
          { name: 'Product B', sales: 1, stockRemaining: 50 },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
