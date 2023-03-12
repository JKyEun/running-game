const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const hero = {
  x: 100,
  y: 230,
  width: 50,
  height: 70,
  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Rock {
  constructor() {
    this.x = 800;
    this.y = 250;
    this.width = 20;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const scoreBoard = document.querySelector('.score');
const gameOverWindow = document.querySelector('.game_over');
const restartBtn = gameOverWindow.querySelector('div:nth-child(3)');
let timer = 0;
let score = 0;
let obstacleArr = [];
let isJumping = false;
let animation;

function runEachFrame() {
  animation = requestAnimationFrame(runEachFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hero.draw();
  const randomNum = 150 + Math.floor(Math.random() * 50);
  if (timer % randomNum === 0) {
    timer = 0;
    const rock = new Rock();
    obstacleArr.push(rock);
  }

  obstacleArr.forEach((a, i, arr) => {
    if (a.y < 0) {
      arr.splice(i, 1);
    }
    a.x -= 2;
    checkConflict(hero, a);
    a.draw();
  });

  if (isJumping) {
    hero.y -= 3;
  } else {
    hero.y += 3;
  }

  if (hero.y < 110) {
    isJumping = false;
  }

  if (hero.y > 230) {
    hero.y = 230;
  }

  timer++;
  score++;

  scoreBoard.innerText = `SCORE ${score}`;
}

function checkConflict(hero, obstacle) {
  const x = obstacle.x - (hero.x + hero.width);
  const y = obstacle.y - (hero.y + hero.height);
  const isPassed = obstacle.x + obstacle.width - hero.x;
  if (x < 0 && y < 0 && isPassed > 0) {
    cancelAnimationFrame(animation);
    gameOver();
  }
}

function gameOver() {
  gameOverWindow.classList.remove('hidden');
  gameOverWindow.querySelector('div:nth-child(2)').innerText = `SCORE ${score}`;
}

runEachFrame();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && isJumping === false) {
    isJumping = true;
  }
});

restartBtn.addEventListener('click', () => {
  location.reload();
});
