// Carta arrastrable, al estilo Reigns.
const UMBRAL = 70; // px que hay que arrastrar para que cuente

export class CartaArrastrable {
  constructor(nodo, { alElegir, alMover }) {
    this.nodo = nodo;
    this.alElegir = alElegir;
    this.alMover = alMover;
    this.activo = false;
    this.bloqueado = false;
    this.inicioX = 0;
    this.dx = 0;

    nodo.addEventListener('pointerdown', (e) => this.empezar(e));
    nodo.addEventListener('pointermove', (e) => this.mover(e));
    nodo.addEventListener('pointerup', (e) => this.soltar(e));
    nodo.addEventListener('pointercancel', () => this.cancelar());
    nodo.addEventListener('lostpointercapture', () => this.cancelar());
  }

  bloquear(v) {
    this.bloqueado = v;
  }

  empezar(e) {
    if (this.bloqueado) return;
    this.activo = true;
    this.inicioX = e.clientX;
    this.dx = 0;
    this.nodo.setPointerCapture?.(e.pointerId);
    this.nodo.classList.add('arrastrando');
  }

  mover(e) {
    if (!this.activo) return;
    this.dx = e.clientX - this.inicioX;
    this.pintar(this.dx);
  }

  pintar(dx) {
    const giro = dx / 16;
    this.nodo.style.transform = `translateX(${dx}px) rotate(${giro}deg)`;
    const lado = dx > 18 ? 'der' : dx < -18 ? 'izq' : null;
    this.nodo.classList.toggle('hacia-izq', lado === 'izq');
    this.nodo.classList.toggle('hacia-der', lado === 'der');
    this.alMover?.(lado, Math.min(1, Math.abs(dx) / UMBRAL));
  }

  soltar(e) {
    if (!this.activo) return;
    this.activo = false;
    this.nodo.classList.remove('arrastrando');
    this.nodo.releasePointerCapture?.(e.pointerId);
    if (Math.abs(this.dx) >= UMBRAL) {
      this.confirmar(this.dx > 0 ? 'der' : 'izq');
    } else {
      this.volver();
    }
  }

  cancelar() {
    if (!this.activo) return;
    this.activo = false;
    this.nodo.classList.remove('arrastrando');
    this.volver();
  }

  volver() {
    this.dx = 0;
    this.nodo.style.transform = '';
    this.nodo.classList.remove('hacia-izq', 'hacia-der');
    this.alMover?.(null, 0);
  }

  // Sale volando para el lado elegido y avisa.
  confirmar(lado) {
    if (this.bloqueado) return;
    this.bloquear(true);
    const destino = lado === 'der' ? window.innerWidth : -window.innerWidth;
    this.nodo.style.transform = `translateX(${destino}px) rotate(${destino / 26}deg)`;
    this.nodo.style.opacity = '0';
    setTimeout(() => this.alElegir?.(lado), 220);
  }

  reponer() {
    this.nodo.style.transition = 'none';
    this.nodo.style.transform = '';
    this.nodo.style.opacity = '1';
    this.nodo.classList.remove('hacia-izq', 'hacia-der', 'entrando');
    void this.nodo.offsetWidth;
    this.nodo.style.transition = '';
    this.nodo.classList.add('entrando');
    this.alMover?.(null, 0);
    this.bloquear(false);
  }
}
