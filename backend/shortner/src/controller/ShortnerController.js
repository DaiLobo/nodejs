import crypto from "crypto";
import userAgent from "user-agent";
import ShortnerModel from "../model/ShortnerModel.js";

class ShortnerController {
    async index(request, response) {
        const shortners = await ShortnerModel.find().lean(); //lean traz apenas o dados
        //shotnermodel é uma promise, entao precisa do await e do async
        response.json({shortners});
    }
    
    async getOne(request, response) {
        const { id } = request.params;

        try {
            const shortner = await ShortnerModel.findById(id);

            if(shortner){
                return response.json({shortner});
            }
            
            response.status(404).json({message: "Shortner Not Found"})

        } catch(error) {
            console.log(error.message); //importante como desenvolvedor saber pq q deu erro
            response.status(400).json({message: "Unexpected Error"}); //erro de logica
        }

    }
    
    async store(request, response) {
        const {name, link, expiredDate} = request.body; //desestruturando para pegar os valores passados pelo objeto
        
        const [, hash] = crypto.randomUUID().split("-"); //desestrutuando, pegando segunda posição
        //split pega a string q crypto retorna e separa em posições de array a cada -
        
        const shortner = await ShortnerModel.create({
            hash,
            name,
            link,
            expiredDate,
        });

        response.json({shortner});
    }

    async update(request, response) {
        const { id } = request.params;
        const {name, link, expiredDate} = request.body;

        const shortner = await ShortnerModel.findByIdAndUpdate(id, {
            name,
            link,
            expiredDate,
        },
        {new: true});

        response.json({shortner});
    }

    async remove (request, response) {
        const { id } = request.params;

        try {
            const shortner = await ShortnerModel.findById(id);

            if(shortner){
                await shortner.remove();
            }
        } catch(error) {
            response.status(400).json({message: "Unexpected Error"}); //erro de logica
        }
    }

    async redirect(request, response){
        const { hash } = request.params;
        const userAgentDetails = userAgent.parse(request.headers["user-agent"])
        const metadata = {
            ip: request.ip,
            language: request.headers["accept-language"],
            userAgent: request.headers["user-agent"],
            userAgentDetails,
        }
        const shortner = await ShortnerModel.findOne({hash});

        if(shortner){

            if(shortner.expired){
                return response.json({message: "Link Expired!"});
            }

            shortner.hits++; //fica salvo em memória
            shortner.metadata.push(metadata);
            await shortner.save(); //p persistir os dados no banco

            return response.redirect(shortner.link);
        }
        response.json({message: "Shortner Not Found!"})
    }
}

export default ShortnerController;