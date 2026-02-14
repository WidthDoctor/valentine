// Переводы
const translations = {
  en: {
    title: "Happy Valentine's<br>Day! 💕",
    subtitle: "Click the card ✨",
    header: "You're absolutely beautiful! 💌",
    message:
      "You shine brighter than any star,<br>your kindness knows no bounds,<br>and your beauty is truly unmatchable! 💖<br><br>Thank you for being such an amazing girl! ✨",
  },
  ru: {
    title: "С Днём<br>Святого Валентина! 💕",
    subtitle: "Нажми на открытку ✨",
    header: "Ты просто королева! 💌",
    message:
      "Ты светишь ярче звёзд,<br>твоя доброта безгранична,<br>и твоя красота неоспорима! 💖<br><br>Спасибо, что ты такая чудесная! ✨",
  },
};

let currentLanguage = "en";

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  const canvas = document.getElementById("floatingHearts");
  const langButtons = document.querySelectorAll(".lang-btn");

  // Обработчик клика на открытку для переворота
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    if (card.classList.contains("flipped")) {
      celebrateHearts();
    }
  });

  // Обработчик клика на кнопки языка
  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = btn.dataset.lang;
      changeLanguage(lang);

      // Обновляем активную кнопку
      langButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Инициализация парящих сердечек
  initFloatingHearts(canvas);
});

// Функция смены языка
function changeLanguage(lang) {
  currentLanguage = lang;
  const trans = translations[lang];

  // Обновляем заголовок
  const titleEl = document.querySelector(".main-title");
  titleEl.innerHTML = trans.title;

  // Обновляем подзаголовок
  const subtitleEl = document.querySelector(".subtitle");
  subtitleEl.textContent = trans.subtitle;

  // Обновляем заголовок на обороте
  const headerEl = document.querySelector(".card-back h2");
  headerEl.textContent = trans.header;

  // Обновляем сообщение
  const messageEl = document.querySelector(".message-text");
  messageEl.innerHTML = trans.message;
}

// Canvas-рисование парящих сердечек
function initFloatingHearts(canvas) {
  const ctx = canvas.getContext("2d");
  let hearts = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Создание парящих сердец
  function createHeart() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 2 - 1,
      size: Math.random() * 15 + 10,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    };
  }

  // Рисование сердца
  function drawHeart(x, y, size, opacity, rotation) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.fillStyle = "#ff1744";
    ctx.beginPath();

    const s = size;
    ctx.moveTo(0, -s * 0.6);
    ctx.bezierCurveTo(-s * 0.5, -s, -s * 0.9, -s * 0.6, 0, s * 0.3);
    ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.5, -s, 0, -s * 0.6);
    ctx.fill();

    ctx.restore();
  }

  // Основной loop анимации
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Обновление существующих сердец
    for (let i = hearts.length - 1; i >= 0; i--) {
      const heart = hearts[i];

      heart.x += heart.vx;
      heart.y += heart.vy;
      heart.rotation += heart.rotationSpeed;

      drawHeart(heart.x, heart.y, heart.size, heart.opacity, heart.rotation);

      // Удаление если вышло за границы
      if (heart.y < -50) {
        hearts.splice(i, 1);
      }
    }

    // Добавление новых сердец иногда
    if (Math.random() > 0.95 && hearts.length < 15) {
      hearts.push(createHeart());
    }

    requestAnimationFrame(animate);
  }

  // Добавляем начальные сердца
  for (let i = 0; i < 5; i++) {
    hearts.push(createHeart());
  }

  animate();

  // Обработка resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Функция праздничных эффектов
function celebrateHearts() {
  const emojis = ["💕", "💖", "💗", "💘", "💝", "✨"];
  const canvas = document.getElementById("floatingHearts");

  // Запуск конфетти
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createConfettiParticle();
    }, i * 50);
  }
}

// Создание конфетти
function createConfettiParticle() {
  const emojis = ["💕", "💖", "💗", "💘", "💝", "✨", "🎉"];
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = "0px";
  particle.style.fontSize = Math.random() * 20 + 20 + "px";
  particle.style.zIndex = "100";
  particle.style.pointerEvents = "none";
  particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.opacity = "1";
  particle.style.transition = "all 3s ease-out";

  document.body.appendChild(particle);

  // Анимация падения
  setTimeout(() => {
    particle.style.top = window.innerHeight + "px";
    particle.style.opacity = "0";
    particle.style.transform = `rotate(${Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 200}px)`;
  }, 10);

  // Удаление элемента
  setTimeout(() => {
    particle.remove();
  }, 3000);
}

// Создание звезд в фоне
function createStars() {
  const starsContainer = document.querySelector(".stars");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.style.position = "absolute";
    star.style.width = Math.random() * 3 + 1 + "px";
    star.style.height = star.style.width;
    star.style.background = "white";
    star.style.borderRadius = "50%";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.opacity = Math.random() * 0.7 + 0.3;
    star.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
    starsContainer.appendChild(star);
  }
}

// Инициализация звезд при загрузке
window.addEventListener("load", createStars);
