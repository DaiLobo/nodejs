const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser(name, email, birthDate) {
    await prisma.user.create({data: {
        name,
        email,
        birthDate
    }})
}

createUser("Diana", "diana@hotmail.com", new Date());