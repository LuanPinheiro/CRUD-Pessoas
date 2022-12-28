async function conectar(){
    if(global.conectado && global.conectado !== "disconnected"){
        return global.conectado;
    }

    const mysql = require('mysql2/promise'); // Módulos MySQL
    const conectado = await mysql.createConnection({ // Criando a conexão com o database
    host: 'localhost', // Host do BD
    user: 'root',      // Usuário do BD
    password: '',      // Senha do BD
    database: 'crud' // Nome do BD
    });
    console.log("Conectado ao MySQL");
    global.conectado = conectado;
    return conectado;
}

module.exports = {conectar};
// Pegando as informações de um database já existente