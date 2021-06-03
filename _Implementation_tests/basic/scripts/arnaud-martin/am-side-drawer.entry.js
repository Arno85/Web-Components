import { r as registerInstance, h } from './index-77474e9f.js';

const sideDrawerCss = "aside{position:fixed;top:0;left:-30rem;width:30rem;max-width:80%;height:100vh;background:#f3f3f3;box-shadow:0 2px 10px rgba(0, 0, 0, 0.3);transition:left 0.3s ease-out;z-index:100}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, 0.4);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) aside{left:0}:host([opened]) .backdrop{opacity:1;pointer-events:all}header{padding:1rem;background:var(--primary-color-base);position:relative}header h1{font-size:1.6rem;color:var(--primary-color-accent);margin:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.4rem;border:none}.tabs{display:flexbox;justify-content:center;width:100%;margin:1rem;text-align:center}.tabs button{width:30%;background:var(--primary-color-accent);color:var(--primary-color-base);text-align:center;font:inherit;padding:0.4rem;font-weight:bold;border:1px solid var(--primary-color-base)}.tabs button.active,.tabs button:hover,.tabs button:active{background:var(--primary-color-base);color:var(--primary-color-accent)}button{cursor:pointer}button:focus{outline:none}.contact-information{padding:1rem}";

const SideDrawer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.showContact = false;
  }
  async open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }
  onContentChange(content) {
    this.showContact = content === 'contact';
  }
  render() {
    let mainContent = h("slot", null);
    if (this.showContact) {
      mainContent = (h("div", { class: "contact-information" }, h("h2", null, "Contact Information"), h("p", null, "You can reach us via phone or email"), h("ul", null, h("li", null, "Phone: 555-555-5555"), h("li", null, "E-Mail: ", h("a", { href: "mailto:test@test.com" }, "test@test.com")))));
    }
    return [
      h("div", { class: "backdrop", onClick: this.close.bind(this) }),
      h("aside", null, h("header", null, h("h1", null, this.drawerTitle), h("button", { onClick: this.close.bind(this) }, "x")), h("section", { class: "tabs" }, h("button", { class: !this.showContact ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"), h("button", { class: this.showContact ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), h("nav", null, mainContent))
    ];
  }
};
SideDrawer.style = sideDrawerCss;

export { SideDrawer as am_side_drawer };
