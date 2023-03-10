const Sequelize = require('sequelize'); // Usando os módulos do sequelize neste arquivo, S maiusculo por ser uma classe
const database = require('./database');

const Pessoas = database.define('pessoas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: Sequelize.STRING,
    idade: Sequelize.STRING,
    cpf: Sequelize.STRING,
    estaTrabalhando: Sequelize.BOOLEAN,
    imagemPessoa: Sequelize.STRING
}) // Definindo um modelo de tabela, com cada campo a ser preenchido

module.exports = Pessoas; // Exportando o modelo de uma tabela