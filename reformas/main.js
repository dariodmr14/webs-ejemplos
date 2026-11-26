// Antes y después: el deslizador mueve el corte entre las dos fotos.
const comparador = document.querySelector('.compare');
const deslizador = comparador.querySelector('input');
deslizador.addEventListener('input', () => comparador.style.setProperty('--corte', deslizador.value));

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
