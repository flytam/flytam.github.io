class TodoIterm extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("list-item");
    const templateContent = template.content;
    const shadowdom = this.attachShadow({ mode: "open" });
    shadowdom.appendChild(templateContent.cloneNode(true));
    shadowdom.getElementById("sub").onclick = e => {
      const event = new CustomEvent("sub", {
        bubbles: true,
        detail: { index: this.dataset.index},
      });
      this.dispatchEvent(event)
    };
  }
}
customElements.define("todo-iterm", TodoIterm);
