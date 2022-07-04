class Tooltip {
  static activTooltip;
  initialize() {
    document.body.addEventListener("pointerover", (event) => {
      if (event.target.dataset.tooltip != undefined) {
        if (Tooltip.activTooltip) {
          this.remove();
        }
        this.render(event.target.dataset.tooltip);
      }
    });
    document.body.addEventListener("pointerout", this.destroy());
  }
  render(eventDiv) {
    const divTooltip = document.createElement("div");
    divTooltip.classList.add("tooltip");
    divTooltip.innerText = eventDiv;
    Tooltip.activTooltip = divTooltip;
    document.body.append(Tooltip.activTooltip);
  }
  remove() {
    
    if (Tooltip.activTooltip) {
      Tooltip.activTooltip.remove();
      Tooltip.activTooltip = null;
    }
  }
  destroy() {
    this.remove();
  }
}

export default Tooltip;
