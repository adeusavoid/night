let cartasUsadas = [];
let cartaAtual = null;
let jogadores = Array.from({ length: 20 }, (_, i) => ({
  nome: localStorage.getItem('jogador' + i) || '',
  pontos: parseInt(localStorage.getItem('ponto' + i)) || 0
}));

function flipCard() {
  document.querySelector(".card-inner").classList.toggle("flipped");
}

function mostrarProximaCarta() {
  if (cartasUsadas.length === dados.length) {
    alert("Você viu todas as cartas! Reiniciando...");
    cartasUsadas = [];
  }

  let novaCarta;
  do {
    novaCarta = Math.floor(Math.random() * dados.length);
  } while (cartasUsadas.includes(novaCarta));

  cartaAtual = dados[novaCarta];
  cartasUsadas.push(novaCarta);

  document.getElementById("frente").innerText = cartaAtual.pergunta;
  document.getElementById("verso").innerText = cartaAtual.resposta;
  document.querySelector(".card-inner").classList.remove("flipped");
}

function atualizarPlacar() {
  const placar = document.getElementById("placar");
  placar.innerHTML = "";
  jogadores.forEach((j, i) => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.value = j.nome;
    input.placeholder = "Nome jogador " + (i + 1);
    input.onchange = () => {
      jogadores[i].nome = input.value;
      localStorage.setItem('jogador' + i, input.value);
    };

    const button = document.createElement("button");
    button.innerText = j.pontos;
    button.onclick = () => {
      jogadores[i].pontos += 1;
      localStorage.setItem('ponto' + i, jogadores[i].pontos);
      atualizarPlacar();
    };

    div.appendChild(input);
    div.appendChild(button);
    placar.appendChild(div);
  });
}

window.onload = () => {
  atualizarPlacar();
  mostrarProximaCarta();
};
