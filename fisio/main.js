// Marca el día de hoy y dice si está abierto (hora de Oviedo).
const horario = { 1: [570, 1230], 2: [570, 1230], 3: [570, 1230], 4: [570, 1230], 5: [570, 1230], 6: [600, 810] };
const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
const dia = ahora.getDay();
const minutos = ahora.getHours() * 60 + ahora.getMinutes();
document.querySelector(`tr[data-day="${dia}"]`)?.classList.add('today');

const tramo = horario[dia];
if (tramo && minutos >= tramo[0] && minutos < tramo[1]) {
  const cierre = `${Math.floor(tramo[1] / 60)}:${String(tramo[1] % 60).padStart(2, '0')}`;
  document.querySelector('[data-open]').textContent = `Abierto ahora, hasta las ${cierre}.`;
}
