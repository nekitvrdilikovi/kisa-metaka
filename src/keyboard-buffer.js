export default class KeyBoardBuffer {
  constructor() {
    this.clear();
  }
  store(key) {
    if (this.length == 2) {
      this.head = this.head.next;
      this.length--;
    }
    const entry = { key };

    if (!this.head) {
      this.head = entry;
      this.length++;
      return;
    }
    this.head.next = entry;
    this.length++;
  }

  pressed() {
    const constructPattern = current => {
      if (!current) return "";
      return current.key + constructPattern(current.next);
    };

    if (!this.head) return "";
    return constructPattern(this.head);
  }

  clear() {
    this.head = undefined;
    this.length = 0;
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
