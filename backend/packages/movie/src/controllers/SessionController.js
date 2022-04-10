import Controller from "./Controller.js";
import Joi from 'joi';

import prisma from "@prisma/client"; //pegando o enum e transforma em um objeto do js


const {SessionRoom, SeatType, SeatStatus} = prisma;

const schema = Joi.object({
    room: Joi.string().required().valid(...Object.values(SessionRoom)), //pega do objeto todos os valores. se for objeto transforma em array. "..."" p converter em varios parametros
    sessionDate: Joi.date().required(),
    price: Joi.number().required().precision(2).positive(),
    movieId: Joi.string().required()
});

class SessionController extends Controller{

    constructor () {
        super("session"
        // , {
        //     findMany: {
        //       include: { SessionSeats: true, movie: true },
        //     },
        // }
        );
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
                state: "AVAILABLE",
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

        //this.prismaClient.session.findMany({include: {SessionSeats: true}})

        const validation = schema.validate({room, sessionDate, price, movieId});

        if (validation.error) {
            return response.status(400).json(validation)
        }

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
        };

        super.store(request, response);

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

    update(request, response) {

        const { room, sessionDate, price, movieId } = request.body;

        const validation = schema.validate({room, sessionDate, price, movieId});

        if (validation.error) {
            return response.status(400).json(validation)
        }

        request.body = { //sobreescrevendo
            room,
            price,
            sessionDate,
            movie: {connect:{id: movieId}} //connect confere se o filme existe e conecta o filme com a sessao, forma segura de estabelcer um relacionamento
        };

        super.update(request, response);

    }

    async updateSeat(request, response){

        const {sessionId, seatId} = request.params;
        const {disabled, state, type} = request.body;

        const seatSchema = Joi.object({
            disable: Joi.boolean(),
            state: Joi.valid(...Object.values(SeatStatus)),
            type: Joi.valid(...Object.values(SeatType)),
        });

        const sessionSeat = {
            disabled, state, type
        }

        const validate = seatSchema.validate(sessionSeat);

        if(validate.error) {
            response.status(400).json(validate.error)
        }
        
        const sessionSeatUpdated = await this.prismaClient.sessionSeats.update({
            data: sessionSeat, where: {id: seatId}
        })
    
        response.json(sessionSeatUpdated)

    }


}

export default SessionController