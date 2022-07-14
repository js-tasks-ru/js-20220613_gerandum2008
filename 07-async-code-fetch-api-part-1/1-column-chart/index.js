import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart {
  chartHeight = 50;
  element;
  subElements = {};
  
  constructor({
    url = "",
    range = {
      from: new Date(),
      to: new Date(),
    },
    label = "",
    link = "",
    formatHeading = (data) => data,
  } = {}) {
    this.range = range;
    this.url = new URL(url, BACKEND_URL);
    this.data = [];
    this.formatHeading = formatHeading;
    this.label = label;
    this.link = link;
    this.render();
    this.update(this.range.from, this.range.to);
  }

  get blockRender() {
    return `<div class="column-chart " style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
      ${this.label}
      ${this.getLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart"></div>
       </div>
       </div>`;
  }
  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.blockRender;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    console.log(this.subElements)
  }
  getSubElements(element) {

    const elements = element.querySelectorAll("[data-element]");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
  async loadData(from, to) {
    this.url.searchParams.set("from", from.toISOString());
    this.url.searchParams.set("to", to.toISOString());
    return await fetchJson(this.url);
  }

  async update(from, to) {
    this.element.classList.add("column-chart_loading");

    const data = await this.loadData(from, to);

    this.setNewRange(from, to);

    if (data && Object.values(data).length) {
      this.subElements.header.textContent = this.getHeaderValue(data);
      this.subElements.body.innerHTML = this.getColumnBody(data);

      this.element.classList.remove("column-chart_loading");
    }

    this.data = data;
    return this.data;
  }
  getHeaderValue(data) {
    return this.formatHeading(Object.values(data).reduce((accum, item) => (accum + item), 0));
  }
  setNewRange(from, to) {
    this.range.from = from;
    this.range.to = to;
  }
  getColumnBody(data) {
    const maxValue = Math.max(...Object.values(data));

    return Object.entries(data).map(([key, value]) => {
      const scale = this.chartHeight / maxValue;
      const percent = (value / maxValue * 100).toFixed(0);
      const tooltip = `<span>
        <small>${key.toLocaleString('default', {dateStyle: 'medium'})}</small>
        <br>
        <strong>${percent}%</strong>
      </span>`;

      return `<div style="--value: ${Math.floor(value * scale)}" data-tooltip="${tooltip}"></div>`;
    }).join('');
  }



  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
