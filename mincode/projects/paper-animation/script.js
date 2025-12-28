const button = document.getElementById('reset');

button.addEventListener('click', () => {
  document.querySelector('.box').style.animation = 'none';
  document.querySelector('.paper').style.animation = 'none';

  setTimeout(() => {
    document.querySelector('.box').style.animation = 'open-paper-sprite 0.5s steps(6) forwards';
    document.querySelector('.paper').style.animation = 'open-paper-overlay 0.5s steps(6) forwards';
  }, 1);
});