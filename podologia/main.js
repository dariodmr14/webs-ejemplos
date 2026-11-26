// Maqueta de reservas: genera días y horas de ejemplo. No envía nada.
const form = document.querySelector('.booking__form');
const cajaDias = form.querySelector('[data-days]');
const cajaHoras = form.querySelector('[data-slots]');
const aviso = form.querySelector('.booking__msg');
const movil = form.elements.movil;

const corto = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
const largo = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

function opcion(nombre, valor, texto, detalle, marcada) {
  const label = document.createElement('label');
  const input = Object.assign(document.createElement('input'), { type: 'radio', name: nombre, value: valor, checked: marcada });
  const span = document.createElement('span');
  span.textContent = texto;
  if (detalle) span.append(Object.assign(document.createElement('small'), { textContent: detalle }));
  label.append(input, span);
  return label;
}

function proximosLaborables(cuantos) {
  const dias = [];
  const fecha = new Date();
  while (dias.length < cuantos) {
    fecha.setDate(fecha.getDate() + 1);
    if (fecha.getDay() !== 0 && fecha.getDay() !== 6) dias.push(new Date(fecha));
  }
  return dias;
}

function pintarHoras(fecha) {
  const horas = fecha.getDay() === 5
    ? ['9:00', '10:30', '12:00', '13:30']
    : ['9:30', '10:00', '11:30', '13:00', '16:00', '17:00', '17:30', '18:30'];
  // Cada día enseña huecos distintos para que parezca una agenda de verdad.
  const libres = horas.filter((_, i) => (i + fecha.getDate()) % 3 !== 0);
  cajaHoras.replaceChildren(...libres.map((h, i) => opcion('hora', h, h, '', i === 0)));
}

const dias = proximosLaborables(5);
cajaDias.replaceChildren(...dias.map((d, i) =>
  opcion('dia', String(i), String(d.getDate()), corto.format(d).replace('.', ''), i === 0)));
dias.forEach((d, i) => cajaDias.querySelectorAll('input')[i].setAttribute('aria-label', largo.format(d)));
pintarHoras(dias[0]);
cajaDias.addEventListener('change', (e) => pintarHoras(dias[Number(e.target.value)]));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valido = movil.value.replace(/\D/g, '').length >= 9;
  movil.setAttribute('aria-invalid', String(!valido));
  aviso.classList.add('is-answer');
  if (!valido) {
    aviso.textContent = 'Falta tu móvil: nueve cifras, para poder confirmarte la hora.';
    movil.focus();
    return;
  }
  const datos = new FormData(form);
  const fecha = largo.format(dias[Number(datos.get('dia'))]);
  aviso.textContent = `${datos.get('tratamiento')}, ${fecha} a las ${datos.get('hora')}. Esto es una maqueta: no se ha reservado ni enviado nada.`;
});
