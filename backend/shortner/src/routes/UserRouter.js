import {Router} from "express";
import UserController from "../controller/UserController.js";

const router = Router(); //com ele se tem tudo que tem no app nq diz respeito sobre as rotas
//dessa forma, podemos nos comunicar com a instancia app do index

//como colocamos o usercontroller como classe, temos que agora instanciar ela p poder acessar os metodos dela.
const userController = new UserController()

//se os mesmos dados do callback são os que passam para outra função, então pode ser passado apenas a assinatura da função

router.get("/users", userController.index);
router.get("/users/:id", userController.getOne);
router.post("/users", userController.store);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.remove); 

export default router;