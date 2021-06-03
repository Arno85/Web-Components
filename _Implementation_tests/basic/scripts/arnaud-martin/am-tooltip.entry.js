import { r as registerInstance, h } from './index-77474e9f.js';

const tooltipCss = ":host{position:relative}.icon{background:var(--primary-color-base);color:var(--primary-color-accent);text-align:center;padding:0.25rem 0.5rem;border-radius:50%;margin-left:5px;font-weight:bold;cursor:pointer;outline:none}.tooltip-content{display:none;background:var(--primary-color-base);color:var(--primary-color-accent);padding:1rem;position:absolute;max-width:200px;min-width:150px;top:25px;left:calc(50% - 1rem)}.tooltip-content.visible{display:block}";

const tooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tooltipVisible = false;
  }
  toggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
  }
  render() {
    return [
      h("slot", null),
      h("span", { class: "icon", onClick: this.toggleTooltip.bind(this) }, "?"),
      h("div", { class: this.tooltipVisible ? 'tooltip-content visible' : 'tooltip-content' }, this.text)
    ];
  }
};
tooltip.style = tooltipCss;

export { tooltip as am_tooltip };
