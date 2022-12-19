(async() => {
    const database = require('./database');
    const Pessoas = require('./pessoas');
    await database.sync(); // Cria as tabelas no banco de dados caso elas ainda não existam


    const novaPessoa = await Pessoas.create({ // Por ser uma operação async é necessário await
        nome: 'João',
        idade: 15,
        cpf: '11111111111',
        estaTrabalhando: false
    }) // operação INSERT
    console.log(novaPessoa);

    const novaPessoa2 = await Pessoas.create({ // Por ser uma operação async é necessário await
        nome: 'Márcia',
        idade: 25,
        cpf: '22222222222',
        estaTrabalhando: true
    }) // operação INSERT
    console.log(novaPessoa2);


    const primaryKeyFind = await Pessoas.findByPk(1); // operação READ
    console.log(primaryKeyFind); // Mostra no console elementos da tabela com base na primary key passada como parâmetro
    
    
    primaryKeyFind.idade = 17; // operação UPDATE
    await primaryKeyFind.save(); // Salva a alteração feita

    
    await primaryKeyFind.destroy(); // operação DELETE
    
    
    const todasPessoas = await Pessoas.findAll(); // operação READ
    console.log(todasPessoas); // Mostra no console todos os dados da tabela
})()