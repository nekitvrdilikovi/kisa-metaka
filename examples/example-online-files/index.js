import { initialize } from "kisa-metaka";

(function() {
  const config = {
    images: {
      bulletAbsoluteUrl:
        "https://rawcdn.githack.com/nekitvrdilikovi/kisa-metaka/6d2c7be6a2081d38306c0996f6dbea4c20c16fb5/example/dist/bullet.png",
      moneyAbsoluteUrl:
        "https://rawcdn.githack.com/nekitvrdilikovi/kisa-metaka/6d2c7be6a2081d38306c0996f6dbea4c20c16fb5/example/dist/money.png"
    },
    sounds: {
      konanAbsoluteUrl:
        "https://rawcdn.githack.com/nekitvrdilikovi/kisa-metaka/6d2c7be6a2081d38306c0996f6dbea4c20c16fb5/example/dist/konan.mp3",
      dajPareAbsoluteUrl:
        "https://rawcdn.githack.com/nekitvrdilikovi/kisa-metaka/6d2c7be6a2081d38306c0996f6dbea4c20c16fb5/example/dist/daj-pare.mp3"
    },
    rootElementId: "km"
  };
  initialize(config);
})();
