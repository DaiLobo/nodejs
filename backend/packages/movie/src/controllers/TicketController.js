import Controller from "./Controller.js";
import Joi from "joi";

import prisma from "@prisma/client"; 

const {TicketCategory} = prisma; //pegar as interfaces

class TicketController extends Controller{
    constructor () {
        super("ticket", {
            findMany: {
                include: {
                    session: { include: { movie: true } },
                    seat: true,
                    user: true,
                },
            },
          });
    }

    async store(request, response) {
        const {category, seatId, sessionId} = request.body;

        const schema = Joi.object({
            seatId: Joi.string().required(),
            sessionId: Joi.string().required(),
            category: Joi.string().valid(...Object.values(TicketCategory))
        })

        const validate = schema.validate({category, seatId, sessionId});

        if(validate.error) {
            return response.status(400).json(validate.error)
        }

        const userId = "fa3ca6f7-e159-4aae-8822-0aa4ff76b567";

        const ticket = await this.prismaClient.ticket.creat({
            data: {
                category,
                paymentStatus: true,
                user: {connect: {id: userId}},
                seat: {connect: {id: seatId}},
                session: {connect: {id: sessionId}}
            }
        });

        await this.prismaClient.sessionSeats.update({
            data: {state: "BLOCKED"},
            where: {id: seatId}
        }) //locar um assento

        response.json(ticket)
    }
}

export default TicketController