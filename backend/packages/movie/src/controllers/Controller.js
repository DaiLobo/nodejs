import prismaClient from "../prisma.js";
import logger from "../utils/logger.js"

class Controller {

    constructor(model){ //para acessar de forma dinamico o registrycontroller, usercontroller e tals
        this.model = model;
        this.client = prismaClient[model] //p acessar de forma dinamica passar valor assim, ja q prismaclient é objeto pode-se usar o colchetes

        if(!this.client) { //validando model
            logger.error(`Model: ${model} not found on Prisma Schema`)
        }
    }

    /**
     * @description Get One Registry by Id according to Model name
     * @param {*} request 
     * @param {*} response 
     */

    async index(request, response) {
        const registries = await this.client.findMany();
        response.json(registries);
    }
    async getOne(request, response) {
        const id = request.params.id;
        const registry = await this.client.findUnique({where: {id}});

        if(!registry){
            logger.error(`Registry with id: ${id} not found`)
            return response.status(404).send({message: "Registry not found"});
        }

        response.json(registry)
    }
    async store(request, response) {
        const registry = await this.client.create({
            data: request.body
            });
        response.json(registry);
    }
    async update(request, response) {
        const {id} = request.params;

        try {
            const registry = await this.client.update(
            {
                data: request.body, 
                where: {id}
            })
        response.json(registry);
        } catch {
            logger.error(`Registry with id: ${id} not found`)
            response.status(404).json({message: "Registry not found"})
        }
    }
    async remove(request, response) {
        const {id} = request.params;
        
        try {
            await this.client.delete({where: {id}});
            response.json({message: "Registry removed"});
        }
        catch (error) {
            logger.error(`Registry with id: ${id} not found`)
            response.status(404).json({message: "Registry not removed"})
        }
    }
}

export default Controller;