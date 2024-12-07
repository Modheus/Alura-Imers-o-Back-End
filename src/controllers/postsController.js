// arquivo controller para intermediar as requisições e o acesso a base de dados

// importa a biblioteca fileSystem para renomear arquivos
import fs from "fs"
import { atualizarPost, criarPost, getTodosPosts } from "../models/postsModel.js";
import gerarDescricaoGemini from "../services/GeminiServices.js";
//import { url } from "inspector";

// retorna todos os posts em formato json
export async function listarPosts (req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

// função de criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}

// função de fazer upload de imagem
export async function uploadImagem(req, res) {
    // variável para armazenar o novo post
    const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt:""
    };
    
    try{
        // cria um novo post e armazena o objeto resultante em postCriado
        const postCriado = await criarPost(novoPost);
        // armazena o novo caminho e nome da imagem em uma template string
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // usa a biblioteca fileSystem para renomear a imagem para o seu id no BD
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }
    // tratamento de erros
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoGemini(imgBuffer);
        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisição"});
    }
}