import crypto from "crypto"
import UserModel from "../model/UserModel.js"

class UserController { //exportando as seguintes funções, que são as 5 do CRUD:
    async index (request, response) {
        const users = await UserModel.find().lean(); //lean tira todas as funcões e só traz os dados
        response.send(users) 
    }
    async getOne (request, response) {
        const id = request.params.id;
        const user = await UserModel.findById(id);

        if (user){
            return response.send(user); //params é um objeto, dado isso pode ter vários paramatros
        } 
        response.status(404).send({ message: "User not exist" })
        
    }
    async store (request, response) {
        const {email, name, password, phones} = request.body; //com spread se fosse adicionado mais atributos o banco n relacional iria adicionar, p evitar foi feito dessa outra forma
        //desestruturado e abaixo assinado
        const user = await UserModel.create({email, name, password, phones});
     
        response.send(user);
    }
    async remove (request, response) {
        const {id} = request.params;
        const user = await UserModel.findById(id);
    
        if (user){
            await user.remove();
            return response.send({message: "User deleted"});
        }
        
        response.status(404).send({message: "User not found"})
    
    }
    async update (request, response) {
        const {id} = request.params;
        //validação nos campos
        const {name, email, password, phones} = request.body;

        await UserModel.findByIdAndUpdate(id, {
            name,
            email,
            password,
            phones,
        })
    
        // const userIndex = users.findIndex((user) => user.id === id); //se não encontrar ele retorna -1
    
        if(!user){
            return response.status(404).send({message: "User not found"})
        }
    
        // if(name && email){ //sem isso, se o usuario não passagem nenhum valor para os campos, os valores iam zerar
    
        //     users[userIndex] = {
        //        id,
        //        name: request.body.name, //|| users[userIndex].name
        //        email: request.body.email, //|| users[userIndex].email
        //     };
        
        // }
    
        response.send({ user });
    
    }
}

export default UserController;