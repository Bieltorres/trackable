const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@plataforma.com' },
      select: { id: true, email: true, role: true, password: true }
    });

    console.log('Admin user:', admin ? {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      hasPassword: !!admin.password,
      passwordLength: admin.password?.length
    } : 'NOT FOUND');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
