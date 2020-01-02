import {
  getRandomNumberUpto,
  isPlaying,
  stopPlaying,
  startPlaying
} from "./utils";
import KeyboardBuffer from "./keyboard-buffer";
import State from "./state";
import { attachKmToDom } from "./markup";

const canvasId = "km-canvas";

const buffer = new KeyboardBuffer();
const state = new State();

const bulletsTrigger = "km";
const moneyTrigger = "dp";
const drawnBullets = [];
const drawnMoney = [];

const bulletRefreshInterval = 10;
const moneyRefreshInterval = 250;
const bulletFallingSpeed = 2.5;
const moneyFallingSpeed = 1;

let $bulletImageElement = undefined;
let $moneyImageElement = undefined;
let $konanAudioElement = undefined;
let $dajPareAudioElement = undefined;
let $canvas = undefined;
let $ctx = undefined;

const getRandomBulletPosition = () => {
  return {
    x: getRandomNumberUpto($canvas.width),
    y: -10
  };
};
const getRandomMoneyPosition = () => {
  return {
    x: getRandomNumberUpto($canvas.width),
    y: getRandomNumberUpto($canvas.height)
  };
};
const clearCanvas = () => {
  $ctx.clearRect(0, 0, $canvas.width, $canvas.height);
};

const drawBullet = () => {
  if (!state.get().activatedBullets) return;

  clearCanvas();
  const bullet = getRandomBulletPosition();

  drawnBullets.push(bullet);
  drawnBullets.forEach(drawnBullet => {
    drawnBullet.y += bulletFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($bulletImageElement, drawnBullet.x, drawnBullet.y);
  });
};
const drawMoney = () => {
  if (!state.get().activatedMoney) return;

  clearCanvas();
  const money = getRandomMoneyPosition();

  drawnMoney.push(money);
  drawnMoney.forEach(note => {
    note.y += moneyFallingSpeed;
    $ctx.beginPath();
    $ctx.drawImage($moneyImageElement, note.x, note.y);
  });
};

const updateStateOnKeyPress = key => {
  buffer.store(key);
  const oldActivatedBullets = state.get().activatedBullets;
  const oldActivatedMoney = state.get().activatedMoney;

  if (buffer.triggered(bulletsTrigger)) {
    state.get().activatedBullets = !oldActivatedBullets;
    if (state.get().activatedBullets) state.get().activatedMoney = false;

    buffer.clear();
  }

  if (buffer.triggered(moneyTrigger)) {
    state.get().activatedMoney = !oldActivatedMoney;
    if (state.get().activatedMoney) state.get().activatedBullets = false;

    buffer.clear();
  }
};
const onStateChange = () => {
  const activatedBullets = state.get().activatedBullets;
  const activatedMoney = state.get().activatedMoney;

  console.log(state.get());

  if (activatedBullets) {
    if (isPlaying($konanAudioElement)) return;
    if (isPlaying($dajPareAudioElement)) stopPlaying($dajPareAudioElement);

    startPlaying($konanAudioElement);
    return;
  }
  if (activatedMoney) {
    if (isPlaying($dajPareAudioElement)) return;
    if (isPlaying($konanAudioElement)) stopPlaying($konanAudioElement);
    startPlaying($dajPareAudioElement);
    return;
  }

  if (!activatedBullets) {
    clearCanvas();
    drawnBullets.length = 0;
    stopPlaying($konanAudioElement);
  }
  if (!activatedMoney) {
    clearCanvas();
    drawnMoney.length = 0;
    stopPlaying($dajPareAudioElement);
  }
};

export const initialize = config => {
  attachKmToDom(config);

  $bulletImageElement = document.getElementById("km-bullet");
  $moneyImageElement = document.getElementById("km-money");
  $konanAudioElement = document.getElementById("km-konan");
  $dajPareAudioElement = document.getElementById("km-daj-pare");
  $canvas = document.getElementById(canvasId);
  $ctx = $canvas.getContext("2d");

  document.onkeypress = event => {
    updateStateOnKeyPress(event.key);
    onStateChange();
  };
  setInterval(drawBullet, bulletRefreshInterval);
  setInterval(drawMoney, moneyRefreshInterval);
};
