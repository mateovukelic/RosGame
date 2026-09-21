export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

export function crear(tag, props = {}, hijos = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'clase') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'texto') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v != null) el.setAttribute(k, v);
  }
  for (const hijo of [].concat(hijos)) {
    if (hijo) el.append(hijo);
  }
  return el;
}

export function mostrarPantalla(id) {
  $$('.pantalla').forEach((p) => p.classList.toggle('activa', p.id === id));
  window.scrollTo({ top: 0 });
}
