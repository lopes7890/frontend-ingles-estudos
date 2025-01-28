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
        // Limpa os campos para evitar mostrar dados antigos
        displayGenerate.innerText = "Carregando...";
        displayResponse.innerText = "";
        displayResponseUser.value = "";

        showLoading();

        // Faz a requisição à API
        const response = await fetch(url);

        // Verifica se a resposta é válida (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte os dados retornados para JSON
        const data = await response.json();

        // Exibe os dados recebidos ou uma mensagem
        if (data.Translate && data.Word) {
            generatedTranslate = data.Translate;
            generatedWord = data.Word;

            displayGenerate.innerText = generatedTranslate;
            console.log("Dados recebidos:", data);
        } else if (data.message) {
            displayGenerate.innerText = "Tente novamente";
        } else {
            displayGenerate.innerText = "Palavra não encontrada";
        }
    } catch (error) {
        console.error("Erro ao processar:", error);
        displayGenerate.innerText = "Erro ao gerar palavra";
    } finally {
        // Sempre esconde o indicador de carregamento
        hideLoading();
    }
};
