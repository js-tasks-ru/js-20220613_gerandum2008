class Tooltip {
  static op;
  initialize() {
    document.body.addEventListener("pointerover", (event) => {
      if (event.target.dataset.tooltip != undefined) {
        if (Tooltip.op) {
          this.remove();
        }
        this.renderD(event.target.dataset.tooltip);
      }
    });
    document.body.addEventListener("pointerout", this.destroy());
  }
  renderD(pip) {
    const op = document.createElement("div");
    op.classList.add("tooltip");
    op.innerText = pip;
    Tooltip.op = op;
    document.body.append(Tooltip.op);
  }
  remove() {
    
    if (Tooltip.op) {
      Tooltip.op.remove();
      Tooltip.op = null;
    }
  }
  destroy() {
    this.remove();
  }
}

export default Tooltip;
