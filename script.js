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
