import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes.js" //rota que contem todas as outras rotas
import logger from "./utils/logger.js"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors()) //permite qualquer origem fazer requisição *
app.use(
    morgan(":method :url :status :response-time ms - :res[content-length]", {
        stream: {
            write: (message) => logger.http(message.trim()),
        },
    })
)
//app.use(morgan("dev", {stream: logger.stream.write}))
app.use(helmet())
app.use("/api", routes)

app.get('/', (req, res) => {
    res.send({message: "Welcome to PitangFlix"})
})

//Middle de autenticacao, liberar apenas /login /user (POST)

app.listen(PORT, () => {
    logger.info(`Listening PORT: ${PORT}`) //informar ao usuario se está rodando
})