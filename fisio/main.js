// Selector de zona del cuerpo. Sin JavaScript se ven todos los paneles.
const lista = document.querySelector('[role="tablist"]');
const tabs = [...lista.querySelectorAll('[role="tab"]')];
const panel = (tab) => document.getElementById(tab.getAttribute('aria-controls'));

function elegir(activa) {
  tabs.forEach((tab) => {
    const si = tab === activa;
    tab.setAttribute('aria-selected', String(si));
    tab.tabIndex = si ? 0 : -1;
    panel(tab).hidden = !si;
  });
}

tabs.forEach((tab) => {
  panel(tab).setAttribute('role', 'tabpanel');
  panel(tab).setAttribute('aria-labelledby', tab.id);
  tab.addEventListener('click', () => {
    document.documentElement.classList.add('js');
    elegir(tab);
  });
});
lista.addEventListener('keydown', (e) => {
  const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (!paso) return;
  const i = tabs.indexOf(document.activeElement);
  const siguiente = tabs[(i + paso + tabs.length) % tabs.length];
  siguiente.focus();
  siguiente.click();
});
lista.hidden = false;
elegir(tabs[0]);

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
