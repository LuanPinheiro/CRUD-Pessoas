const database = require("./database");
const dadosTabela = require("./pessoas");

async function selecionarTabela(){ // Operação READ dos dados de uma tabela
    const todasPessoas = await dadosTabela.findAll();
    return todasPessoas; // Retorna para ser inserido no array
}

async function criarTabela(){
    await database.sync();
}

async function inserirTabela(dados){ // Operação INSERT
    const novaPessoa = await dadosTabela.create({
        nome: `${dados.nome}`,
        idade: `${dados.idade}`,
        cpf: `${dados.cpf}`,
        estaTrabalhando: `${dados.estaTrabalhando}`
    })
    return novaPessoa; // Retorna para ser inserido no array
}

async function editarElemento(elemento, dados){ // Operação UPDATE
    const elementoAlterado = await dadosTabela.findByPk(elemento.id);
    if(elementoAlterado){
        elementoAlterado.nome = dados.nome;
        elementoAlterado.idade = dados.idade;
        elementoAlterado.cpf = dados.cpf;
        elementoAlterado.estaTrabalhando = dados.estaTrabalhando;
        await elementoAlterado.save(); // Salva a alteração feita no banco de dados
    }
    else{
        console.log("Não Encontrado")
    }
    return elementoAlterado; // Retorna para o array
}

async function removerElemento(elemento){
    if(elemento){
        const elementoDeletado = await dadosTabela.findByPk(elemento.id);
        await elementoDeletado.destroy();
        return null;
    }
    else{
        console.log("Nao Encontrado");
        return elemento;
    }
}

module.exports = {selecionarTabela, inserirTabela, criarTabela, editarElemento, removerElemento};
/*async function  ()=>{
    const database = require('./database');
    const Pessoas = require('./pessoas');
    await database.sync(); // Cria as tabelas no banco de dados caso elas ainda não existam

    const novaPessoa = await Pessoas.create({ // Por ser uma operação async é necessário await
        nome: 'Márcia',
        idade: 25,
        cpf: '22222222222',
        estaTrabalhando: true
    }) // operação INSERT
    console.log(novaPessoa);


    const primaryKeyFind = await Pessoas.findByPk(1); // operação READ
    console.log(primaryKeyFind); // Mostra no console elementos da tabela com base na primary key passada como parâmetro
    
    if(primaryKeyFind){ // Faz a alteração apenas se encontrar algo
        primaryKeyFind.idade = 17; // operação UPDATE
        await primaryKeyFind.save(); // Salva a alteração feita
    }
    else{
        console.log("Nao Encontrado");
    }
    

    if(primaryKeyFind){ // Faz a alteração apenas se encontrar algo
        await primaryKeyFind.destroy(); // operação DELETE
    }
    else{
        console.log("Nao Encontrado");
    }
    
    const todasPessoas = await Pessoas.findAll(); // operação READ
    console.log(todasPessoas); // Mostra no console todos os dados da tabela
};*/