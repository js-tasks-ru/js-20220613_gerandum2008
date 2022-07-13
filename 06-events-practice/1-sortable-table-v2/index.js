export default class SortableTable {
 element
 subElement={}
  constructor(
    headerConfig = [],
    {
      data = [],
      sorted = {
        id: headerConfig.find((item) => item.sortable).id,
        order: "asc",
      },
    } = {}
  ) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;
    this.render();
  }
  getTable(data) {
    return `<div class="sortable-table">
              ${this.getTableHeader()}
              ${this.getTableBody(data)}
          </div>`;
  }
  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.headerConfig.map((item) => this.getHeaderRow(item)).join("")}
     </div>`;
  }
  getHeaderRow({ id, title, sortable }) {
    const order = this.sorted.id === id ? this.sorted.order : "asc";

    return `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
    <span>${title}</span>
    ${this.getHeaderSortingArrow(id)}
  </div>`;
  }
  getHeaderSortingArrow(id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : "";

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : "";
  }
  getTableBody(data) {
    return `<div data-element="body" class="sortable-table__body">
    ${this.getTableRows(data)}
    </div>`;
  }
  getTableRows(data) {
    return data
      .map((item) => {
        return `<div class="sortable-table__row">
  ${this.getTableRow(item)}
  </div>`;
      })
      .join("");
  }

  getTableRow(item) {
    const cells = this.headerConfig.map(({ id, template }) => {
      return { id, template };
    });

    return cells
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class='sortable-table__cell'>${item[id]}</div>`;
      })
      .join("");
  }
  render() {
    const{id,order}=this.sorted
    const elem = document.createElement("div");
    const sortData = this.sortData(id,order)
    elem.innerHTML = this.getTable(sortData);
    this.element = elem.firstElementChild;
    this.subElements = this.getDataElement(this.element);

    this.initEventListener();
  }

  initEventListener(){
    this.subElements.header.addEventListener("pointerdown", this.onSortClick)
  }
 
  getDataElement(element) {
    const result = {};
    const elements = element.querySelectorAll("[data-element]");
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }
onSortClick = event=>{
  
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc',
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const newOrder = toggleOrder(order); // undefined
      const sortedData = this.sortData(id, newOrder);
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = newOrder;

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableRows(sortedData);
    }
  
}
  

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find((item) => item.id === field);
    const { sortType } = column;
    const direction = order === 'asc'? 1:-1;
    
    return arr.sort((a, b) => {
      switch (sortType) {
        case "number":
          return direction * (a[field] - b[field]);
        case "string":
          return direction * a[field].localeCompare(b[field], ["ru", "en"]);
        case 'custom':
          return direction * customString(a,b);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }
  remove() {
      this.element.remove();
  }
  
  destroy() {
    this.remove();
    // this.element = null; а нужно ли? тесты ругаются в решениях у вас тоже есть. тесты ругаются
    this.subElement = {};
  }
}
