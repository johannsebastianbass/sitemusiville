// Musiville — interações mínimas
(() => {
  // Menu no celular
  const botaoMenu = document.querySelector('.menu-botao');
  const menu = document.getElementById('menu');
  if (botaoMenu && menu) {
    const fechar = () => {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.querySelector('use').setAttribute('href', '#i-menu');
    };
    botaoMenu.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
      botaoMenu.querySelector('use').setAttribute('href', aberto ? '#i-fechar' : '#i-menu');
    });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) fechar(); });
    document.addEventListener('click', (e) => { if (menu.classList.contains('aberto') && !menu.contains(e.target) && !botaoMenu.contains(e.target)) fechar(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('aberto')) { fechar(); botaoMenu.focus(); } });
  }

  // Banda: pausar/tocar (WCAG 2.2.2) e respeitar "reduzir movimento"
  const palco = document.querySelector('.palco');
  const pausa = document.querySelector('.palco__pausa');
  if (palco && pausa) {
    const texto = pausa.querySelector('.palco__pausa-texto');
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)');
    const definir = (pausado) => {
      palco.classList.toggle('pausado', pausado);
      palco.classList.toggle('tocando', !pausado);
      texto.textContent = pausado ? 'Tocar animação' : 'Pausar animação';
    };
    definir(reduzir.matches);
    pausa.addEventListener('click', () => definir(!palco.classList.contains('pausado')));

    // economiza bateria quando o palco sai da tela
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entrada]) => {
        palco.classList.toggle('fora-da-tela', !entrada.isIntersecting);
      }).observe(palco);
    }
  }

  const ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();
