// arquivo model para lidar com a conexão direta ao banco de dados

import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// utiliza a variável de ambiente para se conectar ao mongoDB
const conexao=await conectarAoBanco(process.env.STRING_CONEXAO);

// funcao que retorna todos os posts da coleção posts
export async function getTodosPosts() {
    const db = conexao.db("imersao-instaByte");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

// funcao que recebe um objeto post eninsere na coleção posts
export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instaByte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

// funcão de atualizar 1 post na coleção 
export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instaByte");
    const colecao = db.collection("posts");
    // cria um id de objeto a partir de uma hex string
    const objId = ObjectId.createFromHexString(id);
    // atualiza o registro do objeto com o id especificado
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:post});
}