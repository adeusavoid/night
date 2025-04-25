let cartas = [];
let cartasRestantes = [];
let jogadores = [];

// Inicializa o jogo
window.onload = () => {
  cartas = [...dados]; // cópia das cartas
  cartasRestantes = [...cartas];
  carregarJogadores();
  mostrarProximaCarta();
};

function carregarJogadores() {
  const placar = document.getElementById("placar");
  placar.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const nome = localStorage.getItem("jogador_" + i) || "";
    const pontos = localStorage.getItem("pontos_" + i) || 0;

    const div = document.createElement("div");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Jogador " + (i + 1);
    input.value = nome;
    input.onchange = () => {
      localStorage.setItem("jogador_" + i, input.value);
    };

    const span = document.createElement("span");
    span.textContent = pontos;
    span.style.marginLeft = "10px";
    span.style.cursor = "pointer";
    span.onclick = () => {
      let novo = parseInt(span.textContent) + 1;
      span.textContent = novo;
      localStorage.setItem("pontos_" + i, novo);
    };

    div.appendChild(input);
    div.appendChild(span);
    placar.appendChild(div);
  }
}

function mostrarProximaCarta() {
  if (cartasRestantes.length === 0) {
    alert("Todas as cartas foram usadas!");
    cartasRestantes = [...cartas];
  }
  const index = Math.floor(Math.random() * cartasRestantes.length);
  const carta = cartasRestantes.splice(index, 1)[0];

  document.getElementById("frente").textContent = carta.situacao;
  document.getElementById("verso").textContent = carta.solucao;
  document.querySelector(".card-inner").classList.remove("flipped");
}

function flipCard() {
  document.querySelector(".card-inner").classList.toggle("flipped");
}
