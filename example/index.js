import { initialize } from "kisa-metaka";

(function() {
  const config = {
    images: {
      bulletAbsoluteUrl: window.location.href + "bullet.png",
      moneyAbsoluteUrl: window.location.href + "money.png"
    },
    sounds: {
      konanAbsoluteUrl: window.location.href + "konan.mp3",
      dajPareAbsoluteUrl: window.location.href + "daj-pare.mp3"
    },
    rootElementId: "km"
  };
  initialize(config);
})();
