import { MongoClient } from 'mongodb';
export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao Cluster de BD...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso.');

        return mongoClient;
    } catch(erro) {
        console.error('Falha na conexão com o BD', erro);
        process.exit();
    }
}