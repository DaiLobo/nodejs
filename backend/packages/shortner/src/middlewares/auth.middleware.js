import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = (request, response, next) => { //usa como interceptador para cada requisão
    const {authorization} = request.headers;

    if(request.url === "/api/login" || request.url === "/api/users" && request.method === "POST"){
        return next ();
    }

    if(!authorization) {
        response.status(401).send({message: "Authorization not found"});
    }

    const [, token] = authorization.split(' ');

    try {
        const payload = jsonwebtoken.verify(token, JWT_SECRET);
        request.loggedUser = payload;
    } catch (error) {
        return response.status(401).send({message: "Token Invalid"});
    }


    next();

}