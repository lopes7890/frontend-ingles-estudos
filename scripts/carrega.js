export function showLoading(){
    document.getElementById("botao1").disable = true
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
  
export function hideLoading(){
    document.getElementById("botao1").disable = true
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
      loadings[0].remove();
    }
}