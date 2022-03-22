import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
class UserController { //exportando as seguintes funções, que são as 5 do CRUD:
    
    hashPassword(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
    
        return hash;
    }
    
    async index (request, response) {
        const users = await UserModel.find().lean(); //lean tira todas as funcões e só traz os dados
        response.send(users);
    }

    async login(request, response){
        const {email, password} = request.body; //enviando no corpo da requisição o email e a senha
        const user = await UserModel.findOne({email}).lean();//traz algum registro a partir de qqr informação

        if(!user){
            return response.status(404).send({message: "User not found"})
        }

        if (bcrypt.compareSync(password, user.password)){ //transformar um usuário em um token
            delete user.password; //para apagar só do objeto, do banco não

            const token = jwt.sign(user, JWT_SECRET);
            return response.send({token});
        }
        response.status(404).send({message: "Password Invalid"});
    }

    async getOne (request, response) {
        const id = request.params.id;
        const user = await UserModel.findById(id);

        if (user){
            return response.send(user); //params é um objeto, dado isso pode ter vários paramatros
        } 
        response.status(404).send({ message: "User not exist" });
        
    }

    async store (request, response) {
        const {email, name, password, phones} = request.body; //com spread se fosse adicionado mais atributos o banco n relacional iria adicionar, p evitar foi feito dessa outra forma
        //desestruturado e abaixo assinado
        const user = await UserModel.create({email, name, password: this.hashPassword(password), phones});
     
        response.send(user);
    }

    async remove (request, response) {
        const {id} = request.params;
        const user = await UserModel.findById(id);
    
        if (user){
            await user.remove();
            return response.send({message: "User deleted"});
        }
        
        response.status(404).send({message: "User not found"});
    
    }

    async update (request, response) {
        const {id} = request.params;
        //validação nos campos
        const {name, email, password, phones} = request.body;

        await UserModel.findByIdAndUpdate(id, {
            name,
            email,
            password: this.hashPassword(password),
            phones,
        })
    
        // const userIndex = users.findIndex((user) => user.id === id); //se não encontrar ele retorna -1
    
        if(!user){
            return response.status(404).send({message: "User not found"});
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