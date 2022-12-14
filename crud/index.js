const express = require("express");
const pessoas = require("./pessoas.json"); // Criando um array com todas as pessoas do CRUD, a partir de um JSON que contém um array com 1 elemento
const server = express();
server.use(express.json()); // faz com que o express entenda JSON

// Rota de listagem do array completo
server.get("/pessoas", (req, res) => res.json(pessoas));

// Criando um novo objeto no array
server.post("/pessoas", checkPessoaValida, (req, res) => {
    const novaPessoa = req.body; // Buscando o novo elemento informado dentro do body da requisição
    pessoas.push(novaPessoa); // Adicionando um novo elemento no fim do array
    return res.status(201).json(pessoas); // Retorna o array com um novo elemento
})

// Rota de listagem de 1 elemento do array
server.get("/pessoas/:index", checkPessoaInArray, (req, res) =>{
    return res.json(pessoas[req.params.index]); // Listando com base no parâmetro indicado na url
})

// Editar 1 elemento do array
server.put('/pessoas/:index', checkPessoaValida, checkPessoaInArray, (req, res) => {
    const mudarPessoa = req.body; // Buscando as informações que serão alteradas dentro do body da requisição
    pessoas[req.params.index] = mudarPessoa; // sobrepõe o elemento no index obtido por parâmetro da url
    return res.json(pessoas); // retorna novamente o array atualizado após o update
});

// Exclui um elemento do array
server.delete('/pessoas/:index', checkPessoaInArray, (req, res) => {
    const indexPessoa = req.params.index; // Index que será alterado, com base no parâmetro da url
    pessoas.splice(indexPessoa, 1); // percorre o vetor até o index selecionado e deleta uma posição no array
    return res.send(`<h1>PESSOA NO INDICE ${req.params.index} APAGADA</h1>`);
});

// MIDDLEWARES
// Checa se as informações enviadas têm as chaves corretas
function checkPessoaValida(req, res, next) { 
    if (!req.body.nome || !req.body.idade || !req.body.cpf || !req.body.estaTrabalhando) {
        return res.status(400).json({ error: 'Dados Incompletos' });
    }
    return next(); // Continua na rota em que essa função foi chamada caso não tenha encontrado erro
}
// Checa se há algum dado no index indicado
function checkPessoaInArray(req, res, next, pessoas) { 
    if(isNaN(req.params.index) === true){ // Checando se o indice não é um numero, se não for retorna erro
        return res.status(404).json({ error: 'Indice buscado nao eh um numero'});
    }
    const pessoa = pessoas[req.params.index]; // A pessoa a ser checada será indicada pelo index enviado por parametro na respectiva ação
    if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa nao encontrada no array' });
    }// checa se a pessoa existe no array, caso negativo informa que o index não existe no array

    return next(); // Continua na rota em que essa função foi chamada caso não tenha encontrado erro
}

server.listen("3000", () => console.log("Server listening in port 3000"));