const express = require("express");
const jsonFile = require("./pessoas.json")
const server = express();
server.use(express.json()); // faz com que o express entenda JSON

// Criando um array com todas as pessoas do CRUD, a partir de um JSON que contém um array com 1 elemento
const pessoas = JSON.parse(JSON.stringify(jsonFile))

// Rota de listagem do array completo
server.get("/pessoas", (req, res) => res.json(pessoas));

// Criando um novo objeto no array
server.post("/pessoas", (req, res) => {
    const novaPessoa = req.body; // Buscando o novo elemento informado dentro do body da requisição
    pessoas.push(novaPessoa); // Adicionando um novo elemento no fim do array
    return res.json(pessoas); // Retorna o array com um novo elemento
})

// Rota de listagem de 1 elemento do array
server.get("/pessoas/:index", (req, res) =>{
    return res.json(pessoas[req.params.index]); // Listando com base no parâmetro indicado na url
})

// Editar 1 elemento do array
server.put('/pessoas/:index', (req, res) => {
    const mudarPessoa = req.body; // Buscando as informações que serão alteradas dentro do body da requisição
    pessoas[req.params.index] = mudarPessoa; // sobrepõe o elemento no index obtido por parâmetro da url
    return res.json(pessoas); // retorna novamente o array atualizado após o update
});

// Exclui um elemento do array
server.delete('/pessoas/:index', (req, res) => {
    const indexPessoa = req.params.index; // Index que será alterado, com base no parâmetro da url
    pessoas.splice(indexPessoa, 1); // percorre o vetor até o index selecionado e deleta uma posição no array
    return res.send("<h1>PESSOA APAGADA</h1>");
}); //

server.listen("3000", () => console.log("Server Funcionando!"));