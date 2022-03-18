import crypto from "crypto"
import {users} from "../model/UserModel.js"

const Controller ={ //exportando as seguintes funções, que são as 5 do CRUD:
    index: (request, response) => {
        response.send(users) 
    },
    getOne: (request, response) => {
        const user = users.find((user) => user.id === request.params.id);

        if (user){
            return response.send(user); //params é um objeto, dado isso pode ter vários paramatros
        } 
        response.status(404).send({ message: "User not exist" })
        
    },
    store: (request, response) => {
        const {email, name} = request.body; //com spread se fosse adicionado mais atributos o banco n relacional iria adicionar, p evitar foi feito dessa outra forma
        const user = {email, name, id: crypto.randomUUID()};
        users.push(user);
     
        response.send(user);
    },
    remove: (request, response) => {
        const {id} = request.params;
        const userIndex = users.findIndex((user) => user.id === id);
    
        if (userIndex === -1){
            return response.status(404).send({message: "User not found"})
        }
    
        users.splice(userIndex, 1)
    
        response.send({message: "User deleted"});
    },
    update: (request, response) => {
        const {id} = request.params;
        //validação nos campos
        const {name, email} = request.body;
    
        const userIndex = users.findIndex((user) => user.id === id); //se não encontrar ele retorna -1
    
        if(userIndex === -1){
            return response.status(404).send({message: "User not found"})
        }
    
        if(name && email){ //sem isso, se o usuario não passagem nenhum valor para os campos, os valores iam zerar
    
            users[userIndex] = {
               id,
               name: request.body.name, //|| users[userIndex].name
               email: request.body.email, //|| users[userIndex].email
            };
        
        }
    
        response.send({ user: users[userIndex] });
    
    },
}

export default Controller;