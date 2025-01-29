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
        
        displayGenerate.innerText = "";
        displayResponse.innerText = "";
        displayResponseUser.value = "";

        showLoading();

        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

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
        hideLoading();
    }
};
