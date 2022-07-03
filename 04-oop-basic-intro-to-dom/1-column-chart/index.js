export default class ColumnChart {
  chartHeight = 50
  constructor(date) {
    
    if (!date) {
      return this.defaultLoad();
    }
    this.default({ ...date });
    this.render();
    this.update(this.data);
    this.initEventListeners();
  }
  default({
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
  }

  get blockRender() {
    return `<div class="column-chart column-chart__chart" style="--chart-height: ${this.chartHeight}">
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
    this.allElement = element;
    this.element = element.firstElementChild;
  }
  update(data) {
    const block = this.element.querySelector(".column-chart__chart");
    if (data.length === 0) {
      return (block.innerHTML = `<img src='charts-skeleton.svg'>`);
    }
    for (let key of data) {
      block.innerHTML += `<div style="--value: ${Math.floor(
        key * (this.chartHeight / Math.max(...data))
      )}" data-tooltip="${((key / Math.max(...data)) * 100).toFixed(
        0
      )}%"></div>`;
    }
  }
  defaultLoad() {
    this.render();
    this.allElement
      .querySelector(".column-chart")
      .classList.add("column-chart_loading");
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
