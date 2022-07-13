export default class ColumnChart {
  chartHeight = 50;
  element
  constructor({
    data = [],
    value = 0,
    label = "",
    link = "",
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.value = formatHeading(value);
    this.label = label;
    this.link = link;
    this.render();
  }

  get blockRender() {
    return `<div class="column-chart  column-chart_loading" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
      ${this.label}
      <a href="${this.link}" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart"></div>
       </div>
       </div>`;
  }
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.blockRender;
    this.element = element.firstElementChild;
    this.update(this.data)
  }
  update(data) {
    const block = this.element.querySelector(".column-chart__chart");
    if(data.length){
      this.element.classList.remove('column-chart_loading')
    }
    block.innerHTML=(data.map(item=>{
     return `<div style="--value: ${Math.floor(
        item * (this.chartHeight / Math.max(...data))
      )}" data-tooltip="${((item / Math.max(...data)) * 100).toFixed(
        0
      )}%"></div>`
    }).join(''))
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
