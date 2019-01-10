class TodoList extends HTMLElement {
  constructor() {
    super();
    this.shadowdom = this.attachShadow({ mode: "open" });
  }

  get data() {
    const dataAttribute = this.getAttribute("data");
    if (dataAttribute) {
      return Array.isArray(dataAttribute)
        ? dataAttribute
        : JSON.parse(dataAttribute);
    } else {
      return [];
    }
  }

  set data(val) {
    this.setAttribute("data", JSON.stringify(val));
    this.render();
  }
  connectedCallback() {
    this.render();
    this.shadowdom.addEventListener('sub',(e) =>{
        this.remove(e.detail.index)
    })
  }

  //渲染内容
  render() {
    // 简便起见，每次渲染前先清空shadowdom的内容
    let last = null;
    while ((last = this.shadowdom.lastChild)) {
      this.shadowdom.removeChild(last);
    }
    this.data.forEach((item, index) => {
      const todoiterm = new (customElements.get("todo-iterm"))();
      todoiterm.innerHTML = `<span slot='text'>${item}</span>`;
      todoiterm.setAttribute("data-index", index);

      this.shadowdom.appendChild(todoiterm);
    });
  }

  addIterm(text) {
    this.data = [...this.data, text];
  }
  remove(deleteIndex) {
    this.data = this.data.filter((item, index) => index != deleteIndex);
  }
}
customElements.define("todo-list", TodoList);
