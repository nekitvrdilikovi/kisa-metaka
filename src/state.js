export default class State {
  constructor() {
    this.state = {
      activatedBullets: false,
      activatedMoney: false
    };
  }
  get() {
    return this.state;
  }
  clear() {
    this.state = {
      activatedBullets: false,
      activatedMoney: false
    };
  }
}
