var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

function publicarCursosIniciais(idUsuario) {
    var instrucaoSql = `
        INSERT INTO interesse (fkUsuario, fkCurso, progresso, status) VALUES 
        (${idUsuario}, 1, 0, 'Em andamento'),
        (${idUsuario}, 2, 0, 'Em andamento'),
        (${idUsuario}, 3, 0, 'Em andamento'),
        (${idUsuario}, 4, 0, 'Em andamento');
    `;
    return database.executar(instrucaoSql);
}

function atualizarProgresso(idUsuario, idCurso, novoProgresso) {
    var status = novoProgresso == 100 ? 'Concluido' : 'Em andamento';
    var instrucaoSql = `
        UPDATE interesse SET progresso = ${novoProgresso}, status = '${status}'
        WHERE fkUsuario = ${idUsuario} AND fkCurso = ${idCurso};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    publicarCursosIniciais,
    atualizarProgresso
};