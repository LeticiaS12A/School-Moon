var database = require("../database/config")

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL PARA CADASTRAR");
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario as idUsuario, nome, email FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar
};