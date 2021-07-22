import 'regenerator-runtime'; /* for async await transpile */
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import swRegister from './scripts/utils/sw-register';
import App from './scripts/view/app';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  content: document.querySelector('#mainContent'),
  hero: document.querySelector('.hero'),
  main: document.querySelector('main'),
  drawer: document.querySelector('#navbarDrawer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});