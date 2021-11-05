// dice
let dice = document.getElementById("dice");
// score
let score = document.getElementById("score");
let currScore = 0;
let carPosition = { x: 1, y: 1, xpos: 137, ypos: 108 };
// car
let car = document.getElementById("car");
let toggleCar = document.getElementById("choose-car");

const roll = (n) => Math.floor(Math.random() * n) + 1;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const rollDice = async () => {
  for (let i = 0; i < 5; i++) {
    await sleep(1000);
    dice.src = `./assets/dice/dice-${roll(6)}.png`;
  }
  const droll = roll(6);
  dice.src = `./assets/dice/dice-${droll}.png`;
  currScore += droll * 100;
  score.innerHTML = currScore;

  for (let i = 0; i < droll; i++) {
    await sleep(500);
    let cp = carPosition;

    // bonus case
    if (cp.x - 1 === 3 && cp.y === 5) {
      currScore += 100;
    }

    // corner case
    if (cp.x + 1 === 7 && cp.y === 1) {
      cp.x += 1;
      car.style.left = `${cp.xpos * cp.x}px`;
      i--;
      continue;
    }

    if (cp.x === 7 && cp.y + 1 === 5) {
      cp.y += 1;
      car.style.top = `${cp.ypos * cp.y}px`;
      i--;
      continue;
    }

    if (cp.x - 1 === 1 && cp.y === 5) {
      cp.x -= 1;
      car.style.left = `${cp.xpos * cp.x}px`;
      i--;
      continue;
    }

    // genral case
    if (cp.x + 1 < 8 && cp.y === 1) {
      cp.x += 1;
      car.style.left = `${cp.xpos * cp.x}px`;
    } else if (cp.x - 1 > 0 && cp.y === 5) {
      cp.x -= 1;
      car.style.left = `${cp.xpos * cp.x}px`;
    } else if (cp.x === 7 && cp.y + 1 < 6) {
      cp.y += 1;
      car.style.top = `${cp.ypos * cp.y}px`;
    } else if (cp.x === 1 && cp.y - 1 > 0) {
      cp.y -= 1;
      car.style.top = `${cp.ypos * cp.y}px`;
    } else {
      console.log("There is some error!");
    }
    console.log(carPosition);
  }
};

dice.addEventListener("click", rollDice);

toggleCar.addEventListener("click", () => {
  const tcar = roll(3);
  toggleCar.style.backgroundImage = `url(../assets/car${tcar}.png)`;
  car.src = `./assets/car${tcar}.png`;
});
