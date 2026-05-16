let listahospitalCadastradas = [];

  function cadastrar() {
    let nomeVar = nome_completo.value;
    let senhaVar = senha_imp.value;
    let confirmacaoSenhaVar = confirmar_senha.value;
    let emailVar = email.value;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";

      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;

      //Verificando se o nome é maior ou igual a um caractere
    } else if (nomeVar.length <= 1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Nome com um ou menos caracteres)";
      finalizarAguardar();
      return false;

      //Verificando se há algum @ no email
    } else if (emailVar.indexOf('@') == -1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Não contém arroba)";
      finalizarAguardar();
      return false;

      //Verificando se há algum . no email
    } else if (emailVar.indexOf('.') == -1) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Não contém .)";
      finalizarAguardar();
      return false;

      //Verificando se a senha é maior ou igual a 6 caracteres 
    } else if (senhaVar.length <= 6) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Senha com 6 ou menos digitos)";
      finalizarAguardar();
      return false;

      //Verificando se a senha e a confirmacão são iguais
    } else if (senhaVar != confirmacaoSenhaVar) {
      cardErro.style.display = "block";
      cardErro.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
      mensagem_erro.innerHTML =
        "(Não é igual a senha)";
      finalizarAguardar();
      return false;

    } else {
      setTimeout(sumirMensagem, 5000);
    }

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";
          cardErro.style.background = "linear-gradient(135deg, #26dc35, #538f09)";
          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  //função para remover os modais
  function sumirMensagem() {
    cardErro.style.display = "none";
  }

  function finalizarAguardar() {
}