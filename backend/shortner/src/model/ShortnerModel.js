import mongoose from "mongoose";

const ShortnerSchema = mongoose.Schema({
    link: { type: String, required: true }, //p colocar mais de um requisito usar chaves
    hash: { type: String, required: true},
    hits: { type: Number, default: 0 },
    metadata: [mongoose.Schema.Types.Mixed], //poder aceitar qqr tipo de dado, objeto, string, number
    expired: { type: Boolean, default: false },
    expiredDate: Date, //new Date().toISOString()
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref : "user"},
}, {
    timestamp: true,
});

//com esse model já pode manipular as informações do mongoDB
const ShortnerModel = mongoose.model("shortner", ShortnerSchema); //criando modelo (uma collection)

export default ShortnerModel;