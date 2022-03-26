class Controller {
    async index(request, response) {
        const movies = await prisma.movie.findMany();
        response.json(movies);
    }
    async getOne(request, response) {
        const id = request.params.id;
        const movie = await prisma.movie.findUnique({where: {id}});

        if(!movie){
            return response.status(404).send({message: "Registry not found"});
        }

        response.json(movie)
    }
    async store(request, response) {
        const {name, description, duration, classification} = request.body;
        const movie = await prisma.movie.create({data: {
            name,
            description,
            duration,
            classification: classification || undefined //ou usar ?? conferir se é nulo ou undefined para pegar o valor padrão
        }});
        response.json(movie);
    }
    async update(request, response) {
        const {id} = request.params;
        const {name, description, duration, classification} = request.body;

        try {
            const movie = await prisma.movie.update(
            {
                data: {name, description, duration, classification}, 
                where: {id}
            })
        response.json(movie);
        } catch {
            response.status(404).json({message: "Registry not found"})
        }
    }
    async remove(request, response) {
        const {id} = request.params;
        
        try {
            await prisma.movie.delete({where: {id}});
            response.json({message: "Registry removed"});
        }
        catch (error) {
            response.status(404).json({message: "Registry not removed"})
        }
    }
}

export default Controller;