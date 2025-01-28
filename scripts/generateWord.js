let generatedTranslate = null;
let generatedWord = null

function showLoading(){
    document.getElementById("botao1").disabled = true
    document.getElementById("botao2").disabled = true
    const div = document.createElement("div");
    div.classList.add("loading", "w3-center");
  
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
  
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
  
    document.body.appendChild(div);
  
  }
  
function hideLoading(){
    document.getElementById("botao1").disabled = false
    document.getElementById("botao2").disabled = false
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
      loadings[0].remove();
    }
}

const generate = async () => {
    const displayGenerate = document.getElementById("wordGenerate");
    const displayResponse = document.getElementById("response");
    const displayResponseUser = document.getElementById("responseUser");
    const url = "https://api-ingles-estudos.onrender.com/generate";

    try {
        // Limpa os campos
        displayGenerate.innerText = "";
        displayResponse.innerText = "";
        displayResponseUser.value = "";

        showLoading();

        // Faz a requisição e aguarda a resposta
        const response = await fetch(url);

        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Atualiza as variáveis globais
        generatedTranslate = data.Translate || null;
        generatedWord = data.Word || null;

        // Exibe os dados na tela
        if (data.message) {
            displayGenerate.innerText = "Tente novamente";
        } else {
            displayGenerate.innerText = generatedTranslate || "Palavra não encontrada";
        }

        console.log("Dados recebidos:", data);
    } catch (error) {
        console.error("Erro:", error);
        displayGenerate.innerText = "Erro ao gerar palavra";
    } finally {
        // Sempre esconde o loading, mesmo em caso de erro
        hideLoading();
    }
};
