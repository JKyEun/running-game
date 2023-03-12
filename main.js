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
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
let obstacleArr = [];

function runEachFrame() {
  requestAnimationFrame(runEachFrame);
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
    a.x--;
    a.draw();
  })
  timer++;
}

runEachFrame();
