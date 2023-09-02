


function create_cube(x, y) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  // First sub-path
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.moveTo(x, y);
  ctx.lineTo(x + depth, y + depth);
  ctx.stroke();
  ctx.lineTo(x + depth + size, y + depth);
  ctx.stroke();
  ctx.lineTo(x + size, y);
  ctx.stroke();
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();


  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.lineTo(x + depth, y + depth + size);
  ctx.stroke();
  ctx.lineTo(x + depth, y + depth);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.moveTo(x + depth, y + depth);
  ctx.lineTo(x + depth + size, y + depth);
  ctx.stroke();
  ctx.lineTo(x + depth + size, y + depth + size);
  ctx.stroke();
  ctx.lineTo(x + depth, y + depth + size);
  ctx.stroke();
  ctx.fill();
}


function getCubeData() {
  let x = 0, y = 0;
  let x1 = 0; y1 = 0;
  let cubeData = [];
  let minY = 0;
  for (let i = 0; i < p.length; i++) {
    let count = p[i];
    let ax = x + (x1 * size);
    let ay = y + (y1 * size);
    cubeData[i] = { x: ax, y: ay, count };
    const curMaxY = ((count - 1) * size) - ay;
    if (minY < curMaxY)
      minY = curMaxY;
    x1++;
    if (x1 >= l) {
      x1 = 0;
      x += depth;
      y -= depth;
      y1++;
    }
  }


  const cubeData2 = [];
  let maximumX = 0, maximumY = 0;
  for (let j = 0; j < p.length / l; j++) {
    for (let i = l - 1; i >= 0; i--) {
      cubeIndex = i + l * j;
      if (cubeIndex > p.length) break;
      const ax = cubeData[cubeIndex].x;
      const ay = cubeData[cubeIndex].y;
      count = p[cubeIndex];

      for (let j = 0; j < count; j++) {
        let x = ax, y = minY + ay - (j * size);
        cubeData2.push({ x, y });
        maximumX = Math.max(maximumX, x);
        maximumY = Math.max(maximumY, y);
      }
    }
  }
  return {
    cubeData2, maximumX: maximumX + size + depth, maximumY: maximumY + size + depth
  };
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomData() {
  let l = randomNumber(3, 5);
  let n2 = l * randomNumber(3, 5);
  const p = [];
  for (let i = 0; i < n2; i++) {
    p.push(randomNumber(0, 3));
  }
  return { l, p };
}
function add(accumulator, a) {
  return accumulator + a;
}

// const l = 4;
// const p = [3, 3, 3, 1, 3, 6, 3, 3, 1];
const { l, p } = randomData();
var size = 100;
var depth = size / 2;
const { cubeData2, maximumX, maximumY } = getCubeData();

const canvas = document.getElementById("myCanvas");
canvas.width = maximumX;
canvas.height = maximumY;
const ctx = canvas.getContext("2d");
console.log(maximumX, maximumY);
for (let i = 0; i < cubeData2.length; i++) {
  create_cube(cubeData2[i].x, cubeData2[i].y);
}
const option_element = document.getElementById("options");
const p_sum = p.reduce(add, 0);
const answer = document.createElement('h1');
answer.textContent = p_sum;
option_element.appendChild(answer);


