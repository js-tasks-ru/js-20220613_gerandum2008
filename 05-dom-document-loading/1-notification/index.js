export default class NotificationMessage {
  static activeNotification;
  timer;
  element;
  constructor(word = "", { duration = 2000, type = "success" } = {}) {
    this.word = word;
    this.duration = duration;
    this.type = type;
    this.render();
  }
  get blockCode() {
    return `<div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">Notification</div>
      <div class="notification-body">
        ${this.word}
      </div>
    </div>
  </div>`;
  }
  render() {
    const elem = document.createElement("div");
    elem.innerHTML = this.blockCode;
    this.element = elem.firstElementChild;
  }

  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    parent.append(this.element);

    this.timer = setTimeout(() => {
      this.remove();
    }, this.duration);
    NotificationMessage.activeNotification = this;
  }

  remove() {
    clearTimeout(this.timer);
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
}
