import { PrismaClient } from '@prisma/client'

interface GlobalWithPrisma {
  prisma?: PrismaClient;
}

const globalWithPrisma = globalThis as GlobalWithPrisma;
const prisma = globalWithPrisma.prisma || new PrismaClient();

export default prisma;
