import Controller from "./Controller.js";

class SessionController extends Controller{
    constructor () {
        super("session", {
            findMany: {
                include: {SessionSeats: true}
            }
        })
    }

    maxColumns = 12;
    maxLines = 10;
    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    generateSeats() {
        const seats = [];

        for (let i = 0; i < this.maxColumns; i++) {
            for (let j = 0; j < this.maxLines; j++) {
                const column = i + 1;
                const line = this.alphabet[j];

                seats.push({
                line, column, disable: false,
                state: false,
                name: `${line}${column}`,
                type: "STANDARD"
                })
            }
        }

        return seats;
    }

    store(request, response) {

        //response.json({body: this.generateSeats()})

        const { room, sessionDate, price, movieId } = request.body;

        this.prismaClient.session.findMany({include: {SessionSeats: true}})

        request.body = { //sobreescrevendo
            room,
            price,
            sessionDate,
            SessionSeats: { 
                createMany: {
                    data: this.generateSeats(),
                } 
            },
            movie: {connect:{id: movieId}} //connect confere se o filme existe e conecta o filme com a sessao, forma segura de estabelcer um relacionamento
        }

        super.store(request, response)

        // this.prismaClient.session.create({ //preparar os dados para enviar pelo pai
        //     data: {
        //         room,
        //         sessionDate,
        //         SessionSeats: { 
        //             createMany: {
        //                 data: this.generateSeats()
        //             } 
        //         },
        //         movie: {connect:{id: movieId}} //connect confere se o filme existe e conecta o filme com a sessao, forma segura de estabelcer um relacionamento
        //     }
        // })
    }


}

export default SessionController