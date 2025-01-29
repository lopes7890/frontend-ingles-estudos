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


const verify = async () => {

    if (!generatedWord) {
        alert("Nenhuma palavra foi gerada ainda!");
        return;
    }

    const display = document.getElementById("response");
    const user = document.getElementById("responseUser").value

    if (!user) {
        display.innerText = "o campo precisa ser preenchido!"
    }

    showLoading()
    const url = "https://api-ingles-estudos.onrender.com/verify";
    try {
                                // generatedTranslate
        const payload = { word: generatedWord, responseUser: user};
        // Faz a requisição e aguarda a resposta
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Exibe os dados no console e na tela
        console.log("Dados recebidos:", data);
        hideLoading()
        display.innerText = data.message 
    } catch (error) {
        console.error("Erro:", error);
        hideLoading()
        display.innerText = "Erro ao verificar palavra";
    }
}
