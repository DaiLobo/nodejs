import {Router} from "express";
import UserController from "../controller/UserController.js";

const router = Router(); //com ele se tem tudo que tem no app nq diz respeito sobre as rotas
//dessa forma, podemos nos comunicar com a instancia app do index

//se os mesmos dados do callback são os que passam para outra função, então pode ser passado apenas a assinatura da função

router.get("/user", UserController.index);
router.get("/user/:id", UserController.getOne);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove); 

export default router;