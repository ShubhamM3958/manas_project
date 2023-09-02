const { log } = require("console");

function main() {
  const l = 3, w = 3;
  const p = [3, 3, 3, 3, 3, 3, 3, 3, 3];

  let arr = [];
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < w; j++) {
      if (!arr[i]) arr[i] = [];
      arr[i][j] = p[l + w];
    }
  }

  log(arr);
}

// const l = 3, w = 3;
// const p = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// function draw(x, y) {
//   for()
// }

main();
draw(0, 0);
log(p);