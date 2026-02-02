let velocidadePessoaAtiva = null;
let velocidadeBusAtiva = null;

function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');

  document.getElementById('nowClock').textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
// Calculadora do ônibus
const calcBtn = document.getElementById("calcBtn");
const minutesInput = document.getElementById("minutesInput");
const arrivalMsg = document.getElementById("arrivalMsg");

calcBtn.addEventListener("click", calcularHorario);

function calcularHorario() {
  const minutos = Number(minutesInput.value);

  if (!minutos) {
    arrivalMsg.textContent = "Digite um número válido de minutos ⏱️";
    return;
  }

  const agora = new Date();
  agora.setMinutes(agora.getMinutes() + minutos);

  const h = agora.getHours().toString().padStart(2, "0");
  const m = agora.getMinutes().toString().padStart(2, "0");

  arrivalMsg.textContent = `🚌 O ônibus chega às ${h}:${m}`;
}
// ========= CRONÔMETRO DE INTEGRAÇÃO =========
let integracaoIntervalo = null;
let integracaoSegundos = 90 * 60; // 1h30min

const startIntegracaoBtn = document.getElementById("startIntegracaoBtn");
const stopIntegracaoBtn = document.getElementById("stopIntegracaoBtn");
const integracaoTimer = document.getElementById("integracaoTimer");
const integracaoMsg = document.getElementById("integracaoMsg");
const alertSound = document.getElementById("alertSound");

function formatarTempo(seg) {
  const h = Math.floor(seg / 3600).toString().padStart(2, "0");
  const m = Math.floor((seg % 3600) / 60).toString().padStart(2, "0");
  const s = (seg % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function tocarAlerta(msg) {
  integracaoMsg.textContent = msg;
  alertSound.currentTime = 0;
  alertSound.play();
}

function atualizarIntegracao() {
  integracaoTimer.textContent = formatarTempo(integracaoSegundos);

  if (integracaoSegundos === 1800) tocarAlerta("🔔 Faltam 30 minutos!");
  if (integracaoSegundos === 900)  tocarAlerta("🔔 Faltam 15 minutos!");
  if (integracaoSegundos === 300)  tocarAlerta("🔔 Faltam 5 minutos!");

  if (integracaoSegundos <= 0) {
    clearInterval(integracaoIntervalo);
    tocarAlerta("🚨 Integração encerrada!");
    return;
  }

  integracaoSegundos--;
}

// ▶️ iniciar (igual ao ônibus)
startIntegracaoBtn.addEventListener("click", () => {
  clearInterval(integracaoIntervalo);
  integracaoSegundos = 90 * 60;
  integracaoMsg.textContent = "⏳ Integração em andamento...";
  atualizarIntegracao();
  integracaoIntervalo = setInterval(atualizarIntegracao, 1000);
});

// ⏸ resetar (igual ao parar do ônibus)
stopIntegracaoBtn.addEventListener("click", () => {
  clearInterval(integracaoIntervalo);
  integracaoSegundos = 90 * 60;
  integracaoTimer.textContent = "01:30:00";
  integracaoMsg.textContent = "⏸ Integração resetada.";
});

// ========== CRONÔMETRO ==========
let intervalo = null;
let segundosRestantes = 0;

const startCronoBtn = document.getElementById("startCronoBtn");
const stopCronoBtn = document.getElementById("stopCronoBtn");
const countdownMsg = document.getElementById("countdownMsg");

startCronoBtn.addEventListener("click", iniciarCronometro);
stopCronoBtn.addEventListener("click", pararCronometro);

function iniciarCronometro() {
  const minutos = Number(minutesInput.value);

  if (!minutos) {
    countdownMsg.textContent = "Digite os minutos primeiro ⏱️";
    return;
  }

  segundosRestantes = minutos * 60;
  atualizarCronometro();

  clearInterval(intervalo);
  intervalo = setInterval(atualizarCronometro, 1000);
}

function pararCronometro() {
  clearInterval(intervalo);
  countdownMsg.textContent = "⏸ Cronômetro parado.";
}

function atualizarCronometro() {
  const min = Math.floor(segundosRestantes / 60);
  const seg = segundosRestantes % 60;

  countdownMsg.textContent = `⏳ Faltam ${min.toString().padStart(2, "0")}:${seg
    .toString()
    .padStart(2, "0")}`;

  if (segundosRestantes <= 0) {
    clearInterval(intervalo);
    countdownMsg.textContent = "✅ O ônibus chegou!";
    return;
  }

  segundosRestantes--;
}
// ========= DESCRONÔMETRO =========
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('pastCalcBtn');
  const inputEl = document.getElementById('pastInput');
  const msg = document.getElementById('pastMsg');

  if (!btn) return;

  btn.addEventListener('click', () => {
    const input = inputEl.value.trim();
    const agora = new Date();

    if (input.includes(':')) {
      const [h, m] = input.split(':').map(Number);
      const t = new Date();
      t.setHours(h, m, 0, 0);

      if (t > agora) t.setDate(t.getDate() - 1);

      const diff = Math.floor((agora - t) / 60000);
      const hPassou = Math.floor(diff / 60);
      const mPassou = diff % 60;

      msg.textContent = `O ônibus passou há ${hPassou}h ${mPassou}min.`;
      msg.style.color = "#006400";

    } else if (!isNaN(input) && input !== "") {
  const totalMin = Number(input);
  const agora2 = new Date();

  const passouEm = new Date(agora2.getTime() - totalMin * 60000);
  const hh = passouEm.getHours().toString().padStart(2, "0");
  const mm = passouEm.getMinutes().toString().padStart(2, "0");

  const hPassou = Math.floor(totalMin / 60);
  const mPassou = totalMin % 60;

  msg.style.color = "#006400";

  if (hPassou > 0) {
    msg.textContent = `O ônibus passou há ${hPassou}h ${mPassou}min = ${hh}:${mm}`;
  } else {
    msg.textContent = `O ônibus passou há ${mPassou} minutos = ${hh}:${mm}`;
  }

    } else {
      msg.textContent = "Digite horário (HH:MM) ou minutos.";
      msg.style.color = "#b33";
    }
  });
});
// ========= CRONO-PREMIUM (ROBUSTO) =========
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("premiumCalcBtn");
  const inicioEl = document.getElementById("startTimeInput");
  const fimEl = document.getElementById("endTimeInput");
  const msg = document.getElementById("premiumMsg");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const inicio = inicioEl.value;
    const fim = fimEl.value;

    if (!fim) {
      msg.style.color = "#b33";
      msg.textContent = "Digite a hora final!";
      return;
    }

    const [h1, m1] = inicio
      ? inicio.split(":").map(Number)
      : [new Date().getHours(), new Date().getMinutes()];

    const [h2, m2] = fim.split(":").map(Number);

    const t1 = new Date(); t1.setHours(h1, m1, 0, 0);
    const t2 = new Date(); t2.setHours(h2, m2, 0, 0);

    if (t2 <= t1) t2.setDate(t2.getDate() + 1);

    const diff = Math.floor((t2 - t1) / 60000);
    const h = Math.floor(diff / 60);
    const m = diff % 60;

    msg.style.color = "#006400";
    msg.textContent = `Faltam ${h}h ${m}min (${diff} minutos).`;
  });
});
console.log("CRONO-PREMIUM CHEGOU AQUI ✅");
// ===== VELOCIDADE PARA PREVISÃO =====
function usarVelocidadeBus() {
  if (!velMediaBus || !velMediaPessoa) {
    alert("⚠️ Meça a velocidade do ônibus e a sua primeiro.");
    return;
  }

  velocidadeBusAtiva = velMediaBus;
  velocidadePessoaAtiva = velMediaPessoa;

  document.getElementById("previsaoBus").classList.remove("hidden");

  document.getElementById("prevAjustada").textContent =
    velocidadeBusAtiva.toFixed(1) + " km/h";

  document.getElementById("distEstimada").textContent =
    "Velocidade aplicada com sucesso ✅";
}

// ========= PLANEJADOR INTELIGENTE =========
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnPlanejar");
  const res = document.getElementById("resultadoPlanejador");

  const velInput = document.getElementById("velocidade");
  const tempoInput = document.getElementById("tempo");
  const distInput = document.getElementById("distancia");
  const antInput = document.getElementById("antecedencia");
  const horaBus = document.getElementById("horaOnibus");

  // botões de perfil
  document.querySelectorAll(".botao-perfil").forEach((btnPerfil) => {
    btnPerfil.addEventListener("click", () => {
      velInput.value = btnPerfil.dataset.velocidade;
    });
  });

  btn.addEventListener("click", () => {
    const velocidade = velocidadePessoaAtiva
  ? velocidadePessoaAtiva
  : Number(velInput.value);
    const tempo = Number(tempoInput.value); // min
    const distancia = Number(distInput.value); // metros
    const antecedencia = Number(antInput.value || 0);
    const hora = horaBus.value;

    if (!hora) {
      res.textContent = "⛔ Informe o horário do ônibus.";
      return;
    }

    let tempoCaminhadaMin = 0;

    // calcula tempo
    if (tempo > 0) {
      tempoCaminhadaMin = tempo;
    } else if (distancia > 0 && velocidade > 0) {
      const km = distancia / 1000;
      tempoCaminhadaMin = (km / velocidade) * 60;
    } else {
      res.textContent = "⛔ Informe tempo ou distância.";
      return;
    }

    // calcula distância aproximada se não foi digitada
    let distanciaCalc = distancia;
    if (!distanciaCalc && velocidade > 0) {
      distanciaCalc = (velocidade * 1000 / 60) * tempoCaminhadaMin;
    }

    const totalMin = Math.ceil(tempoCaminhadaMin + antecedencia);

    // hora do ônibus em minutos
    const [h, m] = hora.split(":").map(Number);
    const onibusMin = h * 60 + m;

    // hora de saída
    let sairMin = onibusMin - totalMin;
    if (sairMin < 0) sairMin += 1440;

    const hSaida = Math.floor(sairMin / 60).toString().padStart(2, "0");
    const mSaida = (sairMin % 60).toString().padStart(2, "0");
  
    // chegada no destino (ônibus - antecedência)
    let chegadaDestinoMin = onibusMin - antecedencia;
    if (chegadaDestinoMin < 0) chegadaDestinoMin += 1440;

    const hChegada = Math.floor(chegadaDestinoMin / 60).toString().padStart(2, "0");
    const mChegada = (chegadaDestinoMin % 60).toString().padStart(2, "0");

       // relatório completo
    res.textContent =
      `Planejamento pronto:
- Você deve sair às ${hSaida}:${mSaida}.
- Distância aproximada 
  (da origem ao Destino): ${Math.round(distanciaCalc)} m.
- Velocidade usada: ${velocidade.toFixed(1)} km/h.
- Tempo estimado de deslocamento: ${Math.ceil(tempoCaminhadaMin)} min.
- Chegada prevista ao Destino: ${hChegada}:${mChegada}
- Chegada prevista do Ônibus: ${hora}
- Margem de antecedência aplicada: ${antecedencia} min.`;
// =====================================
// ⏰ ALERTAS AUTOMÁTICOS DE SAÍDA
// =====================================

const agora = new Date();
const agoraMin = agora.getHours() * 60 + agora.getMinutes();

const saidaMin = parseInt(hSaida) * 60 + parseInt(mSaida);

let minutosFaltando = saidaMin - agoraMin;

// se passar da meia-noite
if (minutosFaltando < 0) minutosFaltando += 1440;

// cancelar alertas antigos
if (window.alertasBusClock) {
  window.alertasBusClock.forEach(clearTimeout);
}

window.alertasBusClock = [];

// função pra agendar alerta
function agendarAlerta(minAntes, texto) {

  const tempoMs = (minutosFaltando - minAntes) * 60000;

  if (tempoMs > 0) {
    const id = setTimeout(() => {
      alertaReal(texto);
    }, tempoMs);

    window.alertasBusClock.push(id);
  }
}

// criar alertas
agendarAlerta(30, "🔔 Faltam 30 minutos para sair!");
agendarAlerta(15, "🔔 Faltam 15 minutos para sair!");
agendarAlerta(5, "🔔 Faltam 5 minutos para sair!");
agendarAlerta(0, "🚨 AGORA É PRA SAIR!");


    // ===== ALERTA INTELIGENTE =====
    const alertaEl = document.getElementById("alertaInteligente");
    if (alertaEl) {
      const agora = new Date();
      const agoraMin = agora.getHours() * 60 + agora.getMinutes();

      const saidaMin = parseInt(hSaida) * 60 + parseInt(mSaida);
      const diff = saidaMin - agoraMin;

      if (diff < 0) {
        alertaEl.textContent = "🔴 Você já deveria ter saído!";
        alertaEl.style.color = "#b30000";
      } else if (diff <= 2) {
        alertaEl.textContent = "🟡 Corre que dá!";
        alertaEl.style.color = "#d97706";
      } else if (diff <= 5) {
        alertaEl.textContent = "🟠 Atenção, se prepare!";
        alertaEl.style.color = "#c2410c";
      } else {
        alertaEl.textContent = "🟢 Pode ir tranquilo.";
        alertaEl.style.color = "#15803d";
      }

      alertaEl.style.fontWeight = "bold";
      alertaEl.style.marginTop = "10px";
    }
    let cronometroIntervalo;

document.getElementById("btnResetar").addEventListener("click", () => {
  // Para o cronômetro
  clearInterval(cronometroIntervalo);

  // Zera variáveis de tempo
  tempoRestante = 0;

  // Limpa textos da tela (ajuste os IDs conforme seu HTML)
  document.getElementById("tempoCronometro").innerText = "00:00:00";
  document.getElementById("resultado").innerHTML = "";

  // (Opcional) alerta visual
  alert("Tudo resetado. Bora de novo 🚀");
});
// ===============================
// 🚶 VELOCIDADE REAL (GPS)
// ===============================

let watchID = null;

let velAtual = 0;
let velMedia = 0;
let contador = 0;

// elementos do HTML
const btnIniciarGPS = document.getElementById("btnIniciarGPS");
const btnPararGPS = document.getElementById("btnPararGPS");

const velAtualSpan = document.getElementById("velAtualPessoa");
const velMediaSpan = document.getElementById("velMediaPessoa");

const btnUsarVelocidade = document.getElementById("btnUsarVelocidade");
const msgVelocidade = document.getElementById("msgVelocidade");


// 📍 iniciar medição
btnIniciarGPS.addEventListener("click", () => {

  if (!navigator.geolocation) {
    alert("Seu celular não suporta GPS 😢");
    return;
  }

  msgVelocidade.textContent = "📡 Medindo velocidade... ande um pouco.";

  contador = 0;
  velMedia = 0;

  watchID = navigator.geolocation.watchPosition(
    (pos) => {

      // velocidade vem em m/s
      let velocidadeMS = pos.coords.speed;

      if (velocidadeMS === null) velocidadeMS = 0;

      // converter para km/h
      velAtual = velocidadeMS * 3.6;

      // atualizar velocidade atual
      velAtualSpan.textContent = velAtual.toFixed(1);

      // calcular média simples
      contador++;
      velMedia = ((velMedia * (contador - 1)) + velAtual) / contador;

      velMediaSpan.textContent = velMedia.toFixed(1);
    },

    (erro) => {
      msgVelocidade.textContent = "⚠️ Erro ao acessar GPS.";
      console.log(erro);
    },

    {
      enableHighAccuracy: true,
      maximumAge: 1000
    }
  );
});


// ⛔ parar medição
btnPararGPS.addEventListener("click", () => {
  if (watchID) {
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
  }

  msgVelocidade.textContent = "⛔ Medição parada.";
});


// ✅ usar velocidade no Planejador
btnUsarVelocidade.addEventListener("click", () => {

  if (velMedia <= 0) {
    msgVelocidade.textContent = "⚠️ Meça andando primeiro!";
    return;
  }

  velocidadePessoaAtiva = velMedia;

  msgVelocidade.textContent =
    `✅ Velocidade aplicada no Planejador: ${velMedia.toFixed(1)} km/h`;
});
// =====================================
// 🔔 NOTIFICAÇÃO REAL + VIBRAÇÃO
// =====================================

// pedir permissão quando abrir
if ("Notification" in window) {
  Notification.requestPermission();
}

// função de alerta real
function alertaReal(mensagem) {

  // som
  const som = document.getElementById("somAlerta");
  if (som) {
    som.currentTime = 0;
    som.play();
  }

  // vibração (celular)
  if (navigator.vibrate) {
    navigator.vibrate([300, 200, 300]);
  }

  // notificação do sistema
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("🚌 BusClock Alerta", {
      body: mensagem
    });
  }

  console.log("ALERTA:", mensagem);
}
// =====================================
// 🚀 REGISTRO PWA (SERVICE WORKER)
// =====================================

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("✅ BusClock virou PWA!"))
    .catch((err) => console.log("Erro no SW:", err));
}
// ✅ Registrar Service Worker (PWA)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => {
      console.log("✅ Service Worker registrado com sucesso!");
    })
    .catch((erro) => {
      console.log("❌ Erro ao registrar:", erro);
    });
}

  });
});


