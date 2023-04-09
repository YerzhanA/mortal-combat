/* window.onload = function () {
        soundMusic();
} */

/* Получаем все карты */
const cards = document.querySelectorAll('.memory-card');
let gameOver = document.getElementsByClassName('gameOver');
let box = document.getElementsByClassName('box');
let mainPage = document.getElementsByClassName('mainPage');
let gameOver1 = document.getElementsByClassName('gameOver1');
let finishGame = document.getElementsByClassName('finishGame');
let gameOverText = document.getElementsByClassName('gameOverText');
let score = document.getElementsByClassName('score')[0];

var audio = new Audio();

/* Проверка карты */
let hasFlippedCard = false;
/* Переменные для Первй карты и второй карты для кликов */
let firstCard, secondCard;
//Проверяем блокировку карты
let lockBoard = false;

//Счетчики
let counterTry = 9;
let counterFinish = 8;

/* Переворачивает карту */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first card
    hasFlippedCard = true;
    firstCard = this;
  }
  else {
    //second card
    secondCard = this;

    checkForMatch();
  }
}


function checkForMatch() {
  //do cards match?
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  }
  else {
    unFlipCards();
  }
}

//Верные карты
function disableCards() {
  //it's a match
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  //add music
  soundClickTrue();
  counterFinish = counterFinish - 1;
  console.log(counterFinish);

  if (counterFinish === 0) {
    finishGame[0].style.display = 'block';
    box[0].style.display = 'none';

    soundVoiceFinisher();
    audio.pause();
    soundFinisher();
  }
}

//Неверная карта
function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000)

  //add music
  soundClickFalse();
  counterTry = counterTry - 1;

  score.innerHTML = counterTry;
  //считаем количество попыток
  console.log(counterTry);
}

//Возвращаем в начальное положение
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  if (counterTry === 0) {
    gameOver[0].style.display = 'block';
    box[0].style.display = 'none';
    gameOverText[0].style.display = 'block';
    soundClickGameOver();
    audio.pause();
    soundClickGameOverVoice();
    soundGameOver();
  }
}

//Для Задержки
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//Разбрасываем карты
(function shuffle() {
  cards.forEach(element => {
    let randomPos = Math.floor(Math.random() * 16);
    element.style.order = randomPos;
  });
})();


/* Переворачиваем все карты кликом в цикле*/
cards.forEach(element => element.addEventListener('click', flipCard));

/////////////////////КЛИКИ ПО ФОНУ////////////////////////////////

function mainClick() {
  let mainPage = document.getElementsByClassName('mainPage');
  mainPage[0].style.display = 'block'; //смотрим, включен ли сейчас элемент
  gameOver[0].style.display = 'none';
  location.reload();
}

function firstClick() {
  box[0].style.display = 'flex';
  mainPage[0].style.display = 'none'; //смотрим, включен ли сейчас элемент
  gameOver1[0].style.display = 'none'; //смотрим, включен ли сейчас элемент

  sound();
  soundMusic();
}

///////////////////////////* MUSIC *//////////////////////////////////////////////////////

function sound() {
  var audio = new Audio();
  audio.src = "music/Начало игры/unknown-artist-z_uk-gonga.mp3"; // Указываем путь к звуку "клика"
  audio.volume = 1; //Громкость
  audio.play();// Автоматически запускаем

}
function soundMusic() {
  audio.src = "music/Начало игры/Alexey Korovin — MORTAL KOMBAT (Remix).mp3"; // Указываем путь к звуку "клика"
  audio.volume = 0.4; //Громкость
  audio.play(); // Автоматически запускаем
}

function soundMain() {
  sleep(1000);
  audio.src = "music/заставка/Mortal Kombat - George S. Clinton - Taste of Things to Come (Sub-Zero demonstration).mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}

function soundClickFalse() {
  var audio = new Audio();
  audio.src = "music/во время неправильных карт/toasty_tfCWsU6.mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}

function soundClickTrue() {
  var audio = new Audio();
  audio.src = "music/во время неправильных карт/mk3-09415.mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}

function soundClickGameOver() {
  var audio = new Audio();
  audio.src = "music/во время неправильных карт/mk3-09440.mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}

function soundClickGameOverVoice() {
  var audio = new Audio();
  audio.src = "music/Конец/mk3-09155.mp3"; // Указываем путь к звуку "клика"
  audio.volume = 0.3; //Громкость
  audio.play();// Автоматически запускаем
}

function soundGameOver() {
  var audio = new Audio();
  audio.src = "music/Конец/mortal-kombat-george-s.-clinton-demon-warriors-final-kombat-liu-kang-vs.-shang-tsung_(get-tune.net).mp3"; // Указываем путь к звуку "клика"
  audio.volume = 0.5; //Громкость
  audio.play();// Автоматически запускаем
}

//Winner
function soundVoiceFinisher() {
  var audio = new Audio();
  audio.src = "music/Победа/mk3-09015.mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}
function soundVoiceFinish() {
  var audio = new Audio();
  audio.src = "music/Победа/mk3-09145.mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}
function soundFinisher() {
  var audio = new Audio();
  audio.src = "music/Победа/the-immortals-theme-from-mortal-kombat-encounter-the-ultimate (1).mp3"; // Указываем путь к звуку "клика"
  audio.play();// Автоматически запускаем
}

/* ОБРАЗЕЦ ДЛЯ МЫШИ */
/* var mainClass = document.getElementsByClassName('mainClass');
mainClass.onmouseout = function (e) {
  document.getElementsByClassName('mainClass').style.display = 'none';
}

mainClass.onmouseover = function (e) {
  document.getElementsByClassName('mainClass').style.display = 'block';
}; */
  /* ОБРАЗЕЦ ДЛЯ МЫШИ */



