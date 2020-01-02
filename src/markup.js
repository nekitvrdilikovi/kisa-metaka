const getMarkup = config => `
  <canvas id="km-canvas" width="${window.outerWidth}" height="${window.outerHeight}"></canvas>
  <img
    style="visibility:hidden"
    src="${config.images.bulletAbsoluteUrl}"
    id="km-bullet"
    width="28"
    height="32"
  />
  <img
    style="visibility:hidden"
    src="${config.images.moneyAbsoluteUrl}"
    id="km-money"
    width="256"
    height="64"
  />
  <audio id="km-konan" src="${config.sounds.konanAbsoluteUrl}"></audio>
  <audio id="km-daj-pare" src="${config.sounds.dajPareAbsoluteUrl}"></audio>`;

export const attachKmToDom = config => {
  const div = document.createElement("div");
  div.id = "km";
  div.innerHTML = getMarkup(config);
  document.body.appendChild(div);
};
