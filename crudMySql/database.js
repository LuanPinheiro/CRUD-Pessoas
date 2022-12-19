const Sequelize = require('sequelize'); // Usando os módulos do sequelize neste arquivo
const sequelize = new Sequelize('crud', 'root', '', {
    dialect: 'mysql', // O banco de dados que será usado
    host: 'localhost' // Em qual servidor está o banco, pode indicar o port também
}) // nome, usuário, senha e options

module.exports = sequelize;