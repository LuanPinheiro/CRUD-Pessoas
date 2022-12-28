const database = require("./database");

async function selecionarTabela(){ // Operação READ dos dados de uma tabela
    const connection = await database.conectar();
    const [rows] = await connection.query("select * from pessoas;"); // Pegando apenas os dados da tabela
    return rows;
}
async function criarTabela(){
    const connection = await database.conectar();
    const sql = `create table if not exists pessoas(
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(30) NOT NULL,
        idade int,
        cpf varchar(11),
        estaTrabalhando bool,
        primary key (id)
    )default charset utf8mb4;`
    await connection.query(sql);
    console.log("Tabela criada");
}

async function inserirTabela(dados){ // Operação INSERT
    const connection = await database.conectar();
    const sql = `INSERT INTO pessoas(id, nome, idade, cpf, estaTrabalhando) 
                VALUES (default, ?, ?, ?, ?);`;
    const values = [dados.nome, dados.idade, dados.cpf, dados.estaTrabalhando];
    await connection.query(sql, values);
}

async function editarElemento(elemento, dados){ // Operação UPDATE
    const connection = await database.conectar();
    const sql = `update pessoas
                set nome = '${dados.nome}',
                idade = ${dados.idade},
                cpf = '${dados.cpf}',
                estaTrabalhando = ${dados.estaTrabalhando}
                where id = ${elemento.id};`;
    await connection.query(sql);
    console.log("Elemento Editado");
}

async function removerElemento(elemento){
    const connection = await database.conectar();
    const sql = `delete from pessoas
    where id = ${elemento.id};`;
    await connection.query(sql);
    console.log("Removido Elemento");
}

module.exports = {selecionarTabela, inserirTabela, criarTabela, editarElemento, removerElemento};