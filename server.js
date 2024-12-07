// arquivo server para criar a instancia do express

// importando express, que vai ser usado para o servidor, de dentro da pasta node_modules
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// criando uma variável chamada app que "representa o servidor"
const app = express();

app.use(express.static("uploads"));

// chama a função que lida com as rotas, presente no arquivo postsRoutes
routes(app);

// Abre o servidor e se conecta à porta 3000 (local) e retorna um log no terminal
app.listen(3000, () => {
    console.log("servidor escutando...");
});
