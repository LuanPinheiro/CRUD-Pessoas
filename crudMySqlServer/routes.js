const express = require("express");
const database = require("./database");
const operacoes = require("./operacoesBD");
const pessoas = [];
const server = express();

database.conectar();
server.use(express.json()); // faz com que o express entenda JSON

// Rota de criação de tabela
server.get("/create", async(req, res) => {
    await operacoes.criarTabela();
    return res.json("Criada Tabela");})

// Rota de listagem dos dados
server.get("/pessoas", async(req, res) => {
    return res.json(await operacoes.selecionarTabela());
})

// Criando um novo objeto no array
server.post("/pessoas", checkPessoaValida, async(req, res) => {
    await operacoes.inserirTabela(req.body);
    return res.status(201).json(req.body); // Retorna o array com um novo elemento
})

// Rota de listagem de 1 elemento do array
server.get("/pessoas/:index", async(req, res) =>{
    const pessoaNoIndex = await operacoes.selecionarTabela();
    return res.json(pessoaNoIndex[req.params.index]); // Listando com base no parâmetro indicado na url
})

// Editar 1 elemento do array
server.put('/pessoas/:index', checkPessoaValida, async(req, res) => {
    const pessoaNoIndex = await operacoes.selecionarTabela();
    await operacoes.editarElemento(pessoaNoIndex[req.params.index], req.body);
    return res.json("Pessoa Alterada"); // retorna novamente o array atualizado após o update
});

// Exclui um elemento do array
server.delete('/pessoas/:index', async(req, res) => {
    const pessoaNoIndex = await operacoes.selecionarTabela();
    await operacoes.removerElemento(pessoaNoIndex[req.params.index]);
    return res.send(`<h1>PESSOA NO INDICE ${req.params.index} APAGADA</h1>`);
});

// MIDDLEWARES
// Checa se as informações enviadas têm as chaves corretas
function checkPessoaValida(req, res, next) { 
    if (!req.body.nome || !req.body.idade || !req.body.cpf || (req.body.estaTrabalhando != false && req.body.estaTrabalhando != true)) {
        return res.status(400).json({ error: 'Dados Incompletos' });
    }
    return next(); // Continua na rota em que essa função foi chamada caso não tenha encontrado erro
}

server.listen("3000", () => console.log("Server listening in port 3000"));