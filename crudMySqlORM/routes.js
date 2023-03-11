const express = require("express");
const operacoes = require("./operacoesBD");
let dadosBD = null;
const server = express();

server.use(express.json()); // faz com que o express entenda JSON

// Rota de criação de tabela
server.get("/create", async(req, res) => {
    await operacoes.criarTabela();
    if(!dadosBD){
        dadosBD = await operacoes.selecionarTabela();
        return res.send("<h1>Banco sincronizado<h1>");
    }
    else{
        return res.send("<h1>Banco já sincronizado anteriormente<h1>");
    }
})
    

// Rota de listagem dos dados
server.get("/pessoas", async(req, res) => {
    if(dadosBD){
        dadosBD = await operacoes.selecionarTabela();
        return res.status(200).send(dadosBD);
    }
    else{
        return res.send(`<h1>Por favor inicie o banco na rota /create</h1>`);
    }
})

// Criando um novo objeto no array
server.post("/pessoas", checkPessoaValida, async(req, res) => {
    dadosBD = await operacoes.selecionarTabela();
    if(dadosBD){
        dadosBD.push(await operacoes.inserirTabela(req.body));
        return res.status(201).send(`<h1>Adicionado novo registro</h1>`); // Retorna o array com um novo elemento
    }
    else{
        return res.send(`<h1>Por favor inicie o banco na rota /create</h1>`);
    }
})

// Rota de listagem de 1 elemento do array
server.get("/pessoas/:index", async(req, res) =>{
    dadosBD = await operacoes.selecionarTabela();
    if(dadosBD){
        if(dadosBD[req.params.index]){
            return res.json(dadosBD[req.params.index]); // Listando com base no parâmetro indicado na url
        }
        else{
            return res.send(`<h1>Pessoa não encontrada</h1>`);
        }
        
    }
    else{
        return res.send(`<h1>Por favor inicie o banco na rota /create</h1>`);
    }
})

// Editar 1 elemento do array
server.put('/pessoas/:index', checkPessoaValida, checkPessoaInArray, async(req, res) => {
    dadosBD = await operacoes.selecionarTabela();
    if(dadosBD){
        if(dadosBD[req.params.index]){
            dadosBD[req.params.index] = await operacoes.editarElemento(dadosBD[req.params.index], req.body);
            return res.send(`<h1>Pessoa alterada</h1>`);
        }
        else{
            return res.send(`<h1>Pessoa não encontrada</h1>`);
        }
    }
    else{
        return res.send(`<h1>Por favor inicie o banco na rota /create</h1>`);
    }
    
});

// Exclui um elemento do array
server.delete('/pessoas/:index', checkPessoaInArray, async(req, res) => {
    dadosBD = await operacoes.selecionarTabela();
    if(dadosBD){
        dadosBD[req.params.index] = await operacoes.removerElemento(dadosBD[req.params.index]);
        dadosBD.splice(req.params.index,1);
        return res.send(`<h1>Pessoa no índice ${req.params.index} apagada</h1>`);
    }
    else{
        return res.send(`<h1>Por favor inicie o banco na rota /create</h1>`);
    }
});

// MIDDLEWARES
// Checa se as informações enviadas têm as chaves corretas
function checkPessoaValida(req, res, next) { 
    if (!req.body.nome || !req.body.idade || !req.body.cpf || (req.body.estaTrabalhando != false && req.body.estaTrabalhando != true)) {
        return res.status(400).json({ error: 'Dados Incompletos' });
    }
    return next(); // Continua na rota em que essa função foi chamada caso não tenha encontrado erro
}

// Checa se há algum dado no index indicado
function checkPessoaInArray(req, res, next) { 
    if(isNaN(req.params.index) === true){ // Checando se o indice não é um numero, se não for retorna erro
        return res.status(404).json({ error: 'Índice buscado nao é um numero'});
    }
    const pessoa = dadosBD[req.params.index]; // A pessoa a ser checada será indicada pelo index enviado por parametro na respectiva ação
    if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa nao encontrada no array' });
    }// checa se a pessoa existe no array, caso negativo informa que o index não existe no array

    return next(); // Continua na rota em que essa função foi chamada caso não tenha encontrado erro
}


server.listen("3000", () => console.log("Server listening in port 3000"));