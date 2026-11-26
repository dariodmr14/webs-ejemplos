// Antes y después: el deslizador mueve el corte entre las dos fotos.
const comparador = document.querySelector('.compare');
const deslizador = comparador.querySelector('input');
const mover = (valor) => {
  deslizador.value = valor;
  comparador.style.setProperty('--corte', valor);
};
let animacion = 0;
const parar = () => cancelAnimationFrame(animacion);
const ir = (destino, ms = 350) => {
  parar();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return mover(destino);
  const origen = Number(deslizador.value);
  const inicio = performance.now();
  const paso = (ahora) => {
    const t = Math.min(1, (ahora - inicio) / ms);
    mover(origen + (destino - origen) * (1 - (1 - t) ** 3));
    if (t < 1) animacion = requestAnimationFrame(paso);
  };
  animacion = requestAnimationFrame(paso);
};
deslizador.addEventListener('input', () => { parar(); mover(deslizador.value); });
deslizador.addEventListener('pointerdown', parar);

const botones = document.querySelector('.compare__keys');
botones.hidden = false;
botones.addEventListener('click', (e) => {
  if (e.target.dataset.corte) ir(Number(e.target.dataset.corte));
});

// La primera vez que se ve, la línea se mueve sola para que se entienda que se arrastra.
new IntersectionObserver(([entrada], observador) => {
  if (!entrada.isIntersecting) return;
  observador.disconnect();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  ir(75, 700);
  setTimeout(() => { if (Math.round(deslizador.value) === 75) ir(50, 700); }, 800);
}, { threshold: 0.6 }).observe(comparador);

// Formulario de ejemplo: valida, pero no envía nada.
const form = document.querySelector('form');
const mensaje = form.querySelector('.msg');
const reglas = {
  nombre: (v) => v.trim().length > 1,
  tel: (v) => v.replace(/\D/g, '').length >= 9,
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fallos = Object.entries(reglas).filter(([nombre, vale]) => {
    const campo = form.elements[nombre];
    const mal = !vale(campo.value);
    campo.setAttribute('aria-invalid', String(mal));
    return mal;
  });
  if (fallos.length) {
    mensaje.textContent = 'Nos falta tu nombre o un teléfono de nueve cifras para poder llamarte.';
    form.elements[fallos[0][0]].focus();
    return;
  }
  mensaje.textContent = 'Datos correctos. Es un formulario de ejemplo: no se ha enviado ni guardado nada.';
});
