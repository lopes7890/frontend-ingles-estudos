let generatedTranslate = null;
let generatedWord = null;

function showLoading() {
    const botao1 = document.getElementById("botao1");
    const botao2 = document.getElementById("botao2");

    if (botao1) botao1.disabled = true;
    if (botao2) botao2.disabled = true;

    if (!document.querySelector(".loading")) {
        const div = document.createElement("div");
        div.classList.add("loading", "w3-center");

        for (let i = 0; i < 3; i++) {
            div.appendChild(document.createElement("span"));
        }

        document.body.appendChild(div);
    }
}

function hideLoading() {
    const botao1 = document.getElementById("botao1");
    const botao2 = document.getElementById("botao2");

    if (botao1) botao1.disabled = false;
    if (botao2) botao2.disabled = false;

    const loading = document.querySelector(".loading");
    if (loading) loading.remove();
}

const generate = async () => {
    const displayGenerate = document.getElementById("wordGenerate");
    const displayResponse = document.getElementById("response");
    const displayResponseUser = document.getElementById("responseUser");
    const url = "https://api-ingles-estudos.onrender.com/generate";

    try {
        if (displayGenerate) displayGenerate.innerText = "";
        if (displayResponse) displayResponse.innerText = "";
        if (displayResponseUser) displayResponseUser.value = "";

        showLoading();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Translate && data.Word) {
            generatedTranslate = data.Translate;
            generatedWord = data.Word;
                                                            // generatedeWord
            if (displayGenerate) displayGenerate.innerText = generatedTranslate;
            console.log("Dados recebidos:", data);
        } else {
            if (displayGenerate) displayGenerate.innerText = data.message || "Palavra não encontrada";
        }
    } catch (error) {
        console.error("Erro ao processar:", error);
        if (displayGenerate) displayGenerate.innerText = "Erro ao gerar palavra";
    } finally {
        hideLoading();
    }
};
