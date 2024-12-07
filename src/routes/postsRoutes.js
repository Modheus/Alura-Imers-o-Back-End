// Arquivo routes para lidar com as rotas do servidor

import express from "express";
// importando o multer para servir de middleware para lidar com tipos diferentes de arquivos
import multer from "multer";
// importando a biblioteca cors para lidar com Cross Origin Resource Sharing (Compartilhamento de recursos de origem cruzada)
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Define os endereços que serão aceitos e o Status que será reconhecido como sucesso.
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
};

// sinaliza o destino das imagens que serão enviadas para o servidor
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads", storage});

// cria uma arrow function para lidar com as rotas ao receber como parâmetro o servidor express
const routes = (app) => {
    // sinaliza para o servidor utilizar o tipo json de dados
    app.use(express.json());
    // Adiciona o middleware CORS ao servidor permitindo que outros endereços acessem recursos do servidor
    app.use(cors(corsOptions));
    // rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // rota para criar um novo post, diferenciada pelo método get
    app.post("/posts", postarNovoPost);
    // rota para inserir uma nova imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // rota para atualizar post
    app.put("/upload/:id", atualizarNovoPost);
}

// exporta a função para ser usada no arquivo server
export default routes;