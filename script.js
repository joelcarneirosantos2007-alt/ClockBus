// Velocidades médias (km/h)
let velMediaBus = 18;
let velMediaPessoa = 4.5;

function usarVelocidadeBus() {

  let distanciaKm = 5; // exemplo: 5 km

  let tempoHoras = distanciaKm / velMediaBus;
  let tempoMin = Math.round(tempoHoras * 60);

  document.getElementById("resultado").innerText =
    "⏳ O ônibus chega em aproximadamente " + tempoMin + " minutos!";
}
