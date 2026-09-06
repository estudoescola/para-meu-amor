const backgroundHearts = document.getElementById('backgroundHearts');
const reveals = document.querySelectorAll('.reveal');
const questions = [
  { question: 'Onde Pedro conheceu Giovanna?', answers: ['Na escola', 'Na internet', 'Durante o ensaio da igreja para a Festa Junina ❤️', 'Em uma viagem'], correct: 2 },
  { question: 'Para qual evento estava acontecendo o ensaio?', answers: ['Carnaval', 'Natal', 'Festa Junina 🌽❤️', 'Ano-Novo'], correct: 2 },
  { question: 'Qual é o nome da pessoa que criou este site?', answers: ['Lucas', 'Pedro ❤️', 'Gabriel', 'João'], correct: 1 },
  { question: 'Quantos anos Pedro tem?', answers: ['15', '16', '17 ❤️', '18'], correct: 2 },
  { question: 'Em qual dia Pedro e Giovanna começaram a ficar juntos?', answers: ['18/07 ❤️', '29/08', '12/06', '01/01'], correct: 0 },
  { question: 'Em qual dia Pedro e Giovanna começaram a namorar?', answers: ['18/07', '29/08 ❤️', '25/12', '14/02'], correct: 1 },
  { question: 'Para quem este site foi criado?', answers: ['Para uma professora', 'Para uma amiga', 'Para Giovanna ❤️', 'Para todo mundo'], correct: 2 },
  { question: 'Por que Pedro criou este site?', answers: ['Para vender na internet', 'Para fazer um trabalho', 'Para criar um presente especial para Giovanna ❤️', 'Para uma competição'], correct: 2 },
  { question: 'Qual destes símbolos representa melhor o tema do site?', answers: ['⚽', '❤️', '🚗', '🎮'], correct: 1 },
  { question: 'Qual é a mensagem mais importante deste site?', answers: ['Boa sorte!', 'Até amanhã!', 'Você é muito especial para mim ❤️', 'Fim'], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('nextButton');
const progress = document.getElementById('progress');
const questionNumber = document.getElementById('questionNumber');
const scoreElement = document.getElementById('score');
const quizResult = document.getElementById('quizResult');

function createBackgroundHeart() {
  const heart = document.createElement('div');
  heart.className = 'background-heart';
  heart.textContent = '❤️';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${Math.random() * 25 + 15}px`;
  const duration = Math.random() * 8 + 7;
  heart.style.animationDuration = `${duration}s`;
  backgroundHearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function revealElements() {
  reveals.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 100) element.classList.add('active');
  });
}

function loadQuestion() {
  answered = false;
  nextButton.style.display = 'none';
  const current = questions[currentQuestion];
  questionNumber.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  questionElement.textContent = current.question;
  answersElement.innerHTML = '';
  progress.style.width = `${(currentQuestion / questions.length) * 100}%`;
  current.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.type = 'button';
    button.textContent = answer;
    button.addEventListener('click', () => selectAnswer(index, button));
    answersElement.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  if (answered) return;
  answered = true;
  const correct = questions[currentQuestion].correct;
  document.querySelectorAll('.answer-button').forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === correct) button.classList.add('correct');
  });
  if (index === correct) {
    score += 1;
    selectedButton.classList.add('correct');
    for (let i = 0; i < 5; i += 1) setTimeout(createSmallHeart, i * 80);
  } else selectedButton.classList.add('wrong');
  scoreElement.textContent = `❤️ Pontos: ${score}`;
  nextButton.style.display = 'inline-block';
}

function showResult() {
  questionElement.style.display = 'none';
  answersElement.style.display = 'none';
  nextButton.style.display = 'none';
  questionNumber.style.display = 'none';
  progress.style.width = '100%';
  quizResult.classList.remove('hidden');
  quizResult.innerHTML = `<h2>❤️ Parabéns por chegar até aqui, Giovanna! ❤️</h2><p>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!</p><p>Talvez você tenha acertado todas. Talvez tenha errado algumas.</p><p>Mas existe uma coisa que não precisa de quiz para descobrir:</p><h2>❤️ Você é muito especial para mim ❤️</h2>`;
  for (let i = 0; i < 40; i += 1) setTimeout(createSmallHeart, i * 80);
}

function createSmallHeart() {
  const heart = document.createElement('div');
  heart.className = 'explosion-heart';
  heart.textContent = '❤️';
  heart.style.left = `${window.innerWidth / 2}px`;
  heart.style.top = `${window.innerHeight / 2}px`;
  heart.style.setProperty('--x', `${(Math.random() - .5) * 600}px`);
  heart.style.setProperty('--y', `${(Math.random() - .5) * 600}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

function createExplosion(x, y) {
  const heart = document.createElement('div');
  heart.className = 'explosion-heart';
  heart.textContent = '❤️';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--x', `${(Math.random() - .5) * 900}px`);
  heart.style.setProperty('--y', `${(Math.random() - .5) * 700}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

function createLoveMessage() {
  const messages = ['❤️ I LOVE YOU ❤️', '💖 I LOVE YOU 💖', '💕 I LOVE YOU 💕', '❤️ TE AMO ❤️', '💘 I LOVE YOU 💘'];
  const message = document.createElement('div');
  message.className = 'love-message';
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
  message.style.left = `${Math.random() * Math.max(20, window.innerWidth - 250)}px`;
  message.style.top = `${Math.random() * Math.max(100, window.innerHeight - 200) + 100}px`;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 4000);
}

function launchLoveArrows() {
  const arrowButton = document.getElementById('arrowButton');
  const targetHeart = document.getElementById('targetHeart');
  arrowButton.disabled = true;
  arrowButton.textContent = '💘 Amor lançado! 💘';
  const target = targetHeart.getBoundingClientRect();
  const targetX = target.left + target.width / 2;
  const targetY = target.top + target.height / 2;
  for (let i = 0; i < 15; i += 1) {
    setTimeout(() => {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '🏹';
      arrow.style.left = Math.random() > .5 ? '-100px' : `${window.innerWidth + 100}px`;
      arrow.style.top = `${Math.random() * window.innerHeight}px`;
      document.body.appendChild(arrow);
      requestAnimationFrame(() => { arrow.style.left = `${targetX}px`; arrow.style.top = `${targetY}px`; });
      setTimeout(() => arrow.remove(), 1400);
    }, i * 120);
  }
  setTimeout(() => {
    targetHeart.classList.add('heart-hit');
    for (let i = 0; i < 50; i += 1) setTimeout(() => createExplosion(targetX, targetY), i * 40);
    for (let i = 0; i < 30; i += 1) setTimeout(createLoveMessage, i * 150);
  }, 2300);
  setTimeout(() => {
    targetHeart.classList.remove('heart-hit');
    arrowButton.disabled = false;
    arrowButton.textContent = '🏹 Lançar mais amor ❤️';
  }, 7000);
}

document.getElementById('nextButton').addEventListener('click', () => {
  currentQuestion += 1;
  if (currentQuestion < questions.length) loadQuestion();
  else showResult();
});
document.getElementById('arrowButton').addEventListener('click', launchLoveArrows);
window.addEventListener('scroll', revealElements);
setInterval(createBackgroundHeart, 700);
for (let i = 0; i < 8; i += 1) setTimeout(createBackgroundHeart, i * 200);
loadQuestion();
revealElements();

// A abertura só libera a jornada quando o coração é tocado.
const opening = document.getElementById('opening');
document.getElementById('openingHeart').addEventListener('click', () => {
  opening.classList.add('is-hidden');
  document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
});

// O mapa revela os próximos capítulos conforme a pessoa avança.
const mapStops = [...document.querySelectorAll('.map-stop')];
const mapSections = ['inicio', 'capsula', 'historia', 'mensagens', 'quiz', 'final'];
const unlockMap = (id) => {
  const index = mapSections.indexOf(id);
  mapStops.slice(0, index + 2).forEach((stop) => {
    stop.classList.remove('locked');
    stop.classList.add('unlocked');
  });
  mapStops.forEach((stop) => stop.classList.toggle('active', stop.dataset.map === id));
};
mapStops.forEach((stop) => stop.addEventListener('click', (event) => {
  if (stop.classList.contains('locked')) event.preventDefault();
}));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) unlockMap(entry.target.id); });
}, { threshold: .35 });
mapSections.forEach((id) => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });

// Cápsula do tempo.
document.querySelectorAll('.capsule-card').forEach((card) => card.addEventListener('click', () => {
  document.getElementById('capsuleMessage').textContent = card.dataset.capsule;
  card.classList.add('opened');
  unlockMap('capsula');
}));

// Mensagens escondidas nos corações.
document.querySelectorAll('.secret-hearts button').forEach((heart) => heart.addEventListener('click', () => {
  document.getElementById('secretMessage').textContent = heart.dataset.message;
  heart.classList.add('found');
  unlockMap('mensagens');
}));

// Mini-jogo de coleta, com novos corações aparecendo em intervalos curtos.
let collectedLove = 0;
const collectionArea = document.getElementById('collectionArea');
const loveScore = document.getElementById('loveScore');
function spawnCollectible() {
  if (document.querySelectorAll('.collectible').length >= 5) return;
  const heart = document.createElement('button');
  heart.className = 'collectible';
  heart.type = 'button';
  heart.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 90 + 2}%`;
  heart.style.top = `${Math.random() * 80 + 3}%`;
  heart.addEventListener('click', () => {
    if (heart.classList.contains('collected')) return;
    heart.classList.add('collected');
    collectedLove += 1;
    loveScore.textContent = collectedLove;
    if (collectedLove >= 12) document.getElementById('surpriseMessage').classList.remove('hidden');
    setTimeout(() => heart.remove(), 350);
  });
  collectionArea.appendChild(heart);
  setTimeout(() => heart.remove(), 4500);
}
setInterval(spawnCollectible, 900);
for (let i = 0; i < 4; i += 1) setTimeout(spawnCollectible, i * 250);

// Cada estrela revela uma frase diferente.
const skyMessages = ['Você é muito especial. ❤️', 'Obrigado pelos momentos juntos. 💌', 'Que venham novas lembranças. 🌟', 'Seu sorriso deixa tudo mais bonito. 💖', 'Esta estrela é só para você. ✨'];
const messageSky = document.getElementById('messageSky');
skyMessages.forEach((message, index) => {
  const star = document.createElement('button');
  star.className = 'sky-star';
  star.type = 'button';
  star.textContent = '⭐';
  star.style.left = `${12 + index * 18}%`;
  star.style.top = `${20 + (index % 3) * 25}%`;
  star.addEventListener('click', () => { document.getElementById('skyMessage').textContent = message; });
  messageSky.appendChild(star);
});

// Roda das mensagens.
const wheelMessages = ['💌 Uma mensagem: você ilumina meus dias.', '❤️ Uma lembrança: 18/07 mora no coração.', '😂 Algo engraçado: até o código se apaixonou.', '🌟 Uma surpresa: ainda há muito para viver.', '🎁 Um segredo: você é meu presente favorito.'];
let wheelRotation = 0;
document.getElementById('spinButton').addEventListener('click', () => {
  wheelRotation += 720 + Math.floor(Math.random() * 5) * 72;
  document.getElementById('wheel').style.transform = `rotate(${wheelRotation}deg)`;
  setTimeout(() => { document.getElementById('wheelMessage').textContent = wheelMessages[Math.floor(Math.random() * wheelMessages.length)]; }, 3000);
});

// A data 18/07 é a chave para o capítulo secreto.
document.getElementById('secretCodeButton').addEventListener('click', () => {
  const code = document.getElementById('secretCode').value.replace(/\D/g, '');
  const message = document.getElementById('codeMessage');
  if (code === '1807') {
    message.textContent = '🔓 Área desbloqueada! O melhor capítulo ainda é aquele que vamos escrever juntos. ❤️';
    for (let i = 0; i < 18; i += 1) setTimeout(createSmallHeart, i * 70);
  } else message.textContent = 'Ainda não... procure a data especial na nossa história. 💭';
});
