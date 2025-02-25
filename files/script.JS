const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let waveColor1 = '#FFD5E5'; // Первый цвет волны
let waveColor2 = '#FFD5E5'; // Второй цвет волны
let waveFrequency = 0.004; // Частота волны
let wavePhase = 0; // Фаза волны (для анимации)
let waveSpeed = 0.007; // Скорость движения волны
let direction = 0.2; // Направление движения (1 - вправо, -1 - влево)


function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight; // Волна занимает всю высоту экрана
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

function drawWave() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Рисуем первую часть волны (градиент)
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight / 2);

  for (let x = 0; x <= canvasWidth; x++) {
    let amplitude = Math.abs(canvasWidth / 2 - x) / (canvasWidth / 2) * 50; // Максимальная амплитуда — 50
    let y = (canvasHeight / 2) + Math.sin(x * waveFrequency + wavePhase) * amplitude;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(canvasWidth, canvasHeight); // Линия вниз до нижнего края
  ctx.lineTo(0, canvasHeight);          // Линия влево по нижнему краю
  ctx.closePath();

  let gradient = ctx.createLinearGradient(0, canvasHeight / 2, 0, canvasHeight);
  gradient.addColorStop(0, waveColor1);
  gradient.addColorStop(1, waveColor2);

  ctx.fillStyle = gradient;
  ctx.fill();

  // Рисуем черную полосу
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight / 2);

  for (let x = 0; x <= canvasWidth; x++) {
    let amplitude = Math.abs(canvasWidth / 2 - x) / (canvasWidth / 2) * 50;
    let y =
      (canvasHeight / 2) +
      Math.sin(x * waveFrequency + wavePhase) * amplitude;

    let stripeWidth = Math.max(1, Math.abs(Math.sin(wavePhase)) * 5); // Ширина полосы от 1 до 5 пикселей
    ctx.lineTo(x, y + stripeWidth); // Смещаем линию вниз на ширину полосы
  }

  ctx.lineTo(canvasWidth, canvasHeight); 
  ctx.lineTo(0, canvasHeight); 
  ctx.closePath();

  ctx.fillStyle = '#EB5A94';
  ctx.fill();

  // Изменяем фазу для анимации (только влево)
  wavePhase -= waveSpeed; // Движение только влево

  if (wavePhase < -Math.PI * 2) {
    wavePhase += Math.PI * 2; 
  }
}

// Настройки звёзд
const stars = [];
const starCount = 100; // Количество звёзд

function createStars() {
for (let i = 0; i < starCount; i++) {
stars.push({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 3 + 1, // Размер звезды от 1 до 4
  speed: Math.random() * (2 - 1) + 1 // Скорость падения от 1 до 2
});
}
}
function drawStars() {
ctx.fillStyle = '#EB5A94'; // Розовый цвет звёзд
stars.forEach(star => {
ctx.beginPath();
ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
ctx.fill();
star.y += star.speed;

// Если звезда вышла за пределы экрана, переместим её обратно в верхнюю часть
if (star.y > canvas.height) {
  star.y = -star.size;
  star.x = Math.random() * canvas.width;
}
});
}


function animate() {
  requestAnimationFrame(animate);
  drawWave();
  drawStars(); // Рисуем звёзды
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Инициализация размеров canvas
createStars();
animate(); // Запуск анимации


const canvasMirror = document.getElementById('waveCanvasMirror');
const ctxMirror = canvasMirror.getContext('2d');

function resizeMirrorCanvas() {
canvasMirror.width = window.innerWidth;
canvasMirror.height = window.innerHeight;
}

function drawMirrorWave() {
ctxMirror.clearRect(0, 0, canvasMirror.width, canvasMirror.height);

// Отзеркаливаем весь канвас
ctxMirror.save();
ctxMirror.translate(0, canvasMirror.height);
ctxMirror.scale(1, -1); // Отражаем по вертикали

// Рисуем ту же волну
ctxMirror.beginPath();
ctxMirror.moveTo(0, canvasMirror.height / 2);

for (let x = 0; x <= canvasMirror.width; x++) {
    let amplitude = Math.abs(canvasMirror.width / 2 - x) / (canvasMirror.width / 2) * 50;
    let y = (canvasMirror.height / 2) + Math.sin(x * waveFrequency + wavePhase) * amplitude;
    ctxMirror.lineTo(x, y);
}

ctxMirror.lineTo(canvasMirror.width, canvasMirror.height);
ctxMirror.lineTo(0, canvasMirror.height);
ctxMirror.closePath();

let gradient = ctxMirror.createLinearGradient(0, canvasMirror.height / 2, 0, canvasMirror.height);
gradient.addColorStop(0, waveColor1);
gradient.addColorStop(1, waveColor2);

ctxMirror.fillStyle = gradient;
ctxMirror.fill();

// Рисуем черную полосу
ctxMirror.beginPath();
ctxMirror.moveTo(0, canvasMirror.height / 2);

for (let x = 0; x <= canvasMirror.width; x++) {
    let amplitude = Math.abs(canvasMirror.width / 2 - x) / (canvasMirror.width / 2) * 50;
    let y = (canvasMirror.height / 2) + Math.sin(x * waveFrequency + wavePhase) * amplitude;
    let stripeWidth = Math.max(1, Math.abs(Math.sin(wavePhase)) * 5);
    ctxMirror.lineTo(x, y + stripeWidth);
}

ctxMirror.lineTo(canvasMirror.width, canvasMirror.height);
ctxMirror.lineTo(0, canvasMirror.height);
ctxMirror.closePath();

ctxMirror.fillStyle = '#EB5A94';
ctxMirror.fill();

ctxMirror.restore(); // Возвращаем обычную систему координат
}

function animateMirror() {
requestAnimationFrame(animateMirror);
drawMirrorWave();
}

window.addEventListener('resize', resizeMirrorCanvas);
resizeMirrorCanvas();
animateMirror();

function scrollDown() {
const nextSection = document.getElementById("page2");
if (nextSection) {
nextSection.scrollIntoView({ behavior: "smooth" });
}
}

let isScrolling = false;

window.addEventListener("wheel", (event) => {
  if (isScrolling) return;
  isScrolling = true;

  const direction = event.deltaY > 0 ? 1 : -1;
  const currentScroll = window.scrollY;
  const pageHeight = window.innerHeight;
  let nextScroll = currentScroll + direction * pageHeight;

  nextScroll = Math.max(0, Math.min(nextScroll, document.body.scrollHeight - pageHeight));

  window.scrollTo({
    top: nextScroll,
    behavior: "smooth",
  });

  setTimeout(() => (isScrolling = false), 800);
});

let isImageVisible = true; // Переменная для отслеживания видимости изображения

function handleScroll() {
    const page1 = document.getElementById('page1');
    const page1Bottom = page1.offsetTop + page1.offsetHeight;

    if (window.scrollY > page1Bottom && isImageVisible) {
        // Если прокручиваем вниз за пределы первого экрана
        document.querySelector('.top-image').style.display = 'none';
        isImageVisible = false;
    } else if (window.scrollY <= page1Bottom && !isImageVisible) {
        // Если возвращаемся на первый экран
        document.querySelector('.top-image').style.display = 'block';
        isImageVisible = true;
    }
}

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', handleScroll);

function scrollDown() {
  const nextSection = document.getElementById("page2");
  if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
  }
}
