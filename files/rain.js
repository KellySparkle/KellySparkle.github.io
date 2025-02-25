document.addEventListener('DOMContentLoaded', function() {
  const blocks = document.querySelectorAll('.block');

  blocks.forEach(block => {
    const header = block.querySelector('.header');
    const content = block.querySelector('.content');

    header.addEventListener('mouseover', () => {
      content.style.maxHeight = '500px'; // Установите максимальную высоту, которая вам нужна
    });

    header.addEventListener('mouseout', () => {
      content.style.maxHeight = '0';
    });
  });
});
