// Las tarjetas de la cabecera siguen suavemente al ratón (solo con ratón y si no se pide menos movimiento).
const abanico = document.querySelector('.fan');
if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  let pendiente = false;
  addEventListener('pointermove', (e) => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      abanico.style.setProperty('--mx', ((e.clientX / innerWidth - 0.5) * 2).toFixed(3));
      abanico.style.setProperty('--my', ((e.clientY / innerHeight - 0.5) * 2).toFixed(3));
      pendiente = false;
    });
  }, { passive: true });
}
