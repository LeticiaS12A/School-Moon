var database = require("../database/config");

function buscarUltimasMedidas(idUsuario, limite_linhas) {

    var instrucaoSql = `
        SELECT 
            c.nome as nome_curso, 
            i.progresso, 
            i.status,
            DATE_FORMAT(i.dtInicio, '%d/%m/%Y') as dt_inicio,
            DATE_FORMAT(i.dtInicio, '%H:%i:%s') as momento_grafico
        FROM interesse i
        JOIN cursos c ON i.fkCurso = c.idCurso
        WHERE i.fkUsuario = ${idUsuario} AND i.progresso > 0
        ORDER BY i.dtInicio DESC LIMIT ${limite_linhas};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) {

    var instrucaoSql = `
        SELECT 
            c.nome as nome_curso, 
            i.progresso, 
            i.status,
            DATE_FORMAT(i.dtInicio, '%H:%i:%s') as momento_grafico
        FROM interesse i
        JOIN cursos c ON i.fkCurso = c.idCurso
        WHERE i.fkUsuario = ${idUsuario} AND i.progresso > 0
        ORDER BY i.dtInicio DESC LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}