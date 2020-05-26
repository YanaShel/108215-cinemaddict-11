export default class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }

  notify(changes) {
    this.subscribers.forEach((subscriber) => subscriber(changes));
  }
}
