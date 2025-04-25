let cartasUsadas = [];
let cartaAtual = null;
let jogadores = Array.from({ length: 20 }, (_, i) => ({
  nome: localStorage.getItem('jogador' + i) || 'Jogador ' + (i + 1),
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
    div.innerHTML = \`\${j.nome}: <button onclick="adicionarPonto(\${i})">\${j.pontos}</button>\`;
    placar.appendChild(div);
  });
}

function adicionarPonto(index) {
  jogadores[index].pontos += 1;
  localStorage.setItem('ponto' + index, jogadores[index].pontos);
  atualizarPlacar();
}

window.onload = () => {
  atualizarPlacar();
  mostrarProximaCarta();
};
