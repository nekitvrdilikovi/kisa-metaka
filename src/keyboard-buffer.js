export default class KeyBoardBuffer {
  constructor() {
    this.clear();
  }
  store(key) {
    this.buffer[this.head] = key;
    this.head = (this.head + 1) % this.buffer.length;
  }
  pressed() {
    return this.buffer.reduce(
      (accumulator, current) => accumulator.concat(current),
      ""
    );
  }
  clear() {
    this.buffer = [undefined, undefined];
    this.head = 0;
  }
  triggered(pattern) {
    const pressed = this.pressed();
    const reversedPattern = pattern
      .split("")
      .reverse()
      .join("");

    return pressed == pattern || pattern == reversedPattern;
  }
}
