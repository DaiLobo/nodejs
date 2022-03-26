const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {

    const sessions = await prisma.session.findMany({include: {movie: true}}); //listar todas as sessoes e os filmes delas
    console.log(sessions);

    // const session = await prisma.session.create({ //prisma.NomeEntidade.função
    //     data: {
    //         sessionDate: new Date(),
    //         room: "IMAX",
    //         movie: {connect: {id: "a23e7397-2447-4fba-a5f2-5000a210e939"}} //poderia tbm já criar um movie usando create no lugar de connect
    //     }

    // })


    // const movies = await prisma.movie.createMany({
    //     data: [{
    //         name: "Interestelae",
    //         description: "SCI-FI",
    //         duration: 180,
    //         classification: "PARENT_GUIDANCE_SUGGESTED"
    //     },
    // {
    //     name: "Batman Begins",
    //     description: "Batman...",
    //     duration: 180,
    //     classification: "RESTRICTED"
    // },{
    //     name: "Batman Dark Knight",
    //     description: "Batman...",
    //     duration: 150,
    //     classification: "RESTRICTED"
    // }]
    // })

    // console.log(movies.count)
})()


// async function createUser(name, email, birthDate) { //criar usuario
//     await prisma.user.create({data: {
//         name,
//         email,
//         birthDate
//     }})
// }

// async function listUsers() { //listar usuario
//     const users = await prisma.user.findMany({select: {name: true}});
//     console.log(users);
// }

// listUsers()

//createUser("Diana", "diana@hotmail.com", new Date());