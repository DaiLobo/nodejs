import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRouter from "./routes/UserRouter.js";
import ShortnerRouter from "./routes/ShortnerRouter.js";
import {AuthMiddleware} from "./middlewares/auth.middleware.js";


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL; //p acessar a informação do .env
const PORT = process.env.PORT;

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((error) => {
        console.log({error});
    });



//express é uma função, quando vc instância essa função passa a ter acesso a vários elementos e API
const app = express();

//middleware é uma função que fica ouvindo oq acontece entre requisições
//importante para validações entre requisições

app.use(express.json()); // fazer o express saber receber um json

//imprimir as requisoções realizadas pelo usuário
// app.use((request, response, next) => {
//     console.log(request.method, request.url);

//     next(); //passa para a próxima função ou middleware
// })
//para substituir o middleware de cima, foi usado o morgan
app.use(morgan("dev"));

app.use(AuthMiddleware); //middle para fazer o controle da autenticação das rotas

app.use("/api", UserRouter); //quando se trabalha com router é muito usado o middleware
app.use(ShortnerRouter);

//criar serviço para o express ouça e fique executando
//o ideal é avisar ao desenvolvedor e falar que o serviço está rodando e que a porta está funcionando

app.listen(PORT, () => {
console.log(`Server Running on PORT ${PORT}`)
}); //função q permite passar uma porta e um callback. ele ouve as conexões.



