import mongoose from "mongoose";

const UserSchema = mongoose.Schema({ //schema define o tipo de cada elemento. model é a representação do schema no banco
    name: { type: String, required: true }, //p colocar mais de um requisito usar chaves
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: {type: String, enum: ["Administrator", "User"], default: "User"},
    phones: [String],
}, {
    timestamp: true, //Created at, Modified at
});

const UserModel = mongoose.model("user", UserSchema); //criando o modelo

// export const users = [
//     {
//         id: crypto.randomUUID(),
//         name: "Diana Rose",
//         email: "diana@hotmail.com",
//     },
// ];

//export { users }; //import {users} from 'usermodel' - tem q colocar exatamente igual. ESmodel

//ou
export default UserModel; //import users from 'usermodel' - users pode ser outro nome