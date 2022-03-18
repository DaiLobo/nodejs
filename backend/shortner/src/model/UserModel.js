import crypto from "crypto";

export const users = [
    {
        id: crypto.randomUUID(),
        name: "Diana Rose",
        email: "diana@hotmail.com",
    },
];

//export { users }; //import {users} from 'usermodel' - tem q colocar exatamente igual. ESmodel

//ou
//export default users; //import users from 'usermodel' - users pode ser outro nome