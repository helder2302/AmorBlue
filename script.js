const musica = document.getElementById("musica");
const inicio = document.getElementById("inicio");
const conteudo = document.getElementById("conteudo");
const slide = document.getElementById("slide");

const inicioNamoro = new Date(2025, 1, 23);
document.getElementById("dataInicio").innerText =
  "Desde 23 de fevereiro de 2025 ♡";

let fotos = [
  "fotos/1.jpg",
  "fotos/2.jpg",
  "fotos/3.jpg",
  "fotos/4.jpg",
  "fotos/5.jpg",
  "fotos/6.jpg",
  "fotos/7.jpg",
  "fotos/8.jpg",
  "fotos/9.jpg"
];

let index = 0;
let iniciado = false;

function iniciarTudo() {
  inicio.style.display = "none";
  conteudo.classList.remove("escondido");
  musica.play();

  atualizarTempo();
  setInterval(atualizarTempo, 1000);

  if (!iniciado) {
    iniciado = true;
    setInterval(trocarImagem, 3000);
    setInterval(ativarBrilho, 10000);
  }
}


function animar(elemento) {
  elemento.classList.remove("pulse");
  void elemento.offsetWidth;
  elemento.classList.add("pulse");
}

function atualizarTempo() {
  const agora = new Date();

  let anos = agora.getFullYear() - inicioNamoro.getFullYear();
  let meses = agora.getMonth() - inicioNamoro.getMonth();
  let dias = agora.getDate() - inicioNamoro.getDate();
  let horas = agora.getHours() - inicioNamoro.getHours();
  let minutos = agora.getMinutes() - inicioNamoro.getMinutes();
  let segundos = agora.getSeconds() - inicioNamoro.getSeconds();

  if (segundos < 0) { segundos += 60; minutos--; }
  if (minutos < 0) { minutos += 60; horas--; }
  if (horas < 0) { horas += 24; dias--; }
  if (dias < 0) {
    dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    meses--;
  }
  if (meses < 0) { meses += 12; anos--; }

  const ids = ["anos","meses","dias","horas","minutos","segundos"];
  const valores = [anos, meses, dias, horas, minutos, segundos];

  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    const novoValor = String(valores[i]).padStart(2, "0");
    if (el.innerText !== novoValor) {
      el.innerText = novoValor;
      animar(el);
    }
  });
}

function trocarImagem() {
  slide.classList.add("fade-out");
  setTimeout(() => {
    index = (index + 1) % fotos.length;
    slide.src = fotos[index];
    slide.classList.remove("fade-out");
  }, 800);
}
/* ===== CORAÇÕES SUBINDO SUAVEMENTE ===== */

const camadaCoracoes = document.createElement("div");
camadaCoracoes.classList.add("coracoes");
document.body.appendChild(camadaCoracoes);

function criarCoracao() {
  const coracao = document.createElement("div");
  coracao.classList.add("coracao");
  coracao.innerHTML = "❤";


  coracao.style.left = Math.random() * 100 + "vw";
  coracao.style.fontSize = (14 + Math.random() * 20) + "px";
  coracao.style.animationDuration = (6 + Math.random() * 4) + "s";

  camadaCoracoes.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 10000);
}

setInterval(criarCoracao, 900);
/* ===== BRILHO SUAVE AUTOMÁTICO ===== */

function ativarBrilho() {
  conteudo.classList.remove("brilho");
  void conteudo.offsetWidth; // força reinício da animação
  conteudo.classList.add("brilho");

  setTimeout(() => {
    conteudo.classList.remove("brilho");
  }, 3500);
}

/* ===== ESTRELINHAS RARAS ===== */

function criarEstrela() {
  const estrela = document.createElement("div");
  estrela.classList.add("estrela");
  estrela.innerHTML = "✦";

  estrela.style.left = Math.random() * 100 + "vw";
  estrela.style.top = Math.random() * 100 + "vh";
  estrela.style.fontSize = (6 + Math.random() * 8) + "px";

  document.body.appendChild(estrela);

  setTimeout(() => {
    estrela.remove();
  }, 4000);
}

// aparecem raramente
setInterval(() => {
  if (Math.random() < 0.4) { 
    criarEstrela();
  }
}, 4000);
