import prisma from '@prisma/client'

const prismaClient = new prisma.PrismaClient({log: ["info", "query"]})

export default prismaClient