const getMarkup = config => `
  <canvas id="km-canvas" width="${document.body.clientWidth}" height="${document.body.clientHeight}" style="position:absolute; margin:0; padding:0;"></canvas>
  <img
    src="${config.images.bulletAbsoluteUrl}"
    id="km-bullet"
    width="28"
    height="32"
    style="visibility:hidden;"
  />
  <img
    src="${config.images.moneyAbsoluteUrl}"
    id="km-money"
    width="256"
    height="64"
    style="visibility:hidden;"
  />
  <audio id="km-konan" src="${config.sounds.konanAbsoluteUrl}"></audio>
  <audio id="km-daj-pare" src="${config.sounds.dajPareAbsoluteUrl}"></audio>`;

export const attachKmToDom = config => {
  const div = document.createElement("div");
  div.id = "km";
  div.innerHTML = getMarkup(config);
  document.body.appendChild(div);
};
