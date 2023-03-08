const Sequelize = require('sequelize'); // Usando os módulos do sequelize neste arquivo, S maiusculo por ser uma classe
const database = require('./database');

const Pessoas = database.define('pessoas', {
    id: {
        type: Sequelize.INTEGER, // Tipo do campo usa o modulo requerido, é a única obrigatória a se preencher
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    idade: Sequelize.INTEGER,
    cpf: Sequelize.STRING(11),
    estaTrabalhando: Sequelize.BOOLEAN,
    imagemPessoa: Sequelize.STRING
}) // Definindo um modelo de tabela, com cada campo a ser preenchido

module.exports = Pessoas; // Exportando o modelo de uma tabela