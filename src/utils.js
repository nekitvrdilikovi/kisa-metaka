export const getRandomNumberUpto = max => Math.floor(Math.random() * max);

export const isPlaying = $audioElement =>
  $audioElement.duration > 0 && !$audioElement.paused;
export const stopPlaying = $audioElement => {
  $audioElement.pause();
  $audioElement.currentTime = 0;
};
export const startPlaying = $audioElement => {
  $audioElement.loop = true;
  $audioElement.play();
};
