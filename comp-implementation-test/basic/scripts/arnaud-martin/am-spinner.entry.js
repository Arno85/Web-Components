import { r as registerInstance, h } from './index-77474e9f.js';

const spinnerCss = ".lds-dual-ring{display:inline-block;width:30px;height:30px;margin:10px 0}.lds-dual-ring:after{content:\" \";display:block;width:30px;height:30px;border-radius:50%;border:3px solid var(--color-primary, black);border-color:var(--color-primary, black) transparent var(--color-primary, black) transparent;animation:lds-dual-ring 1.2s linear infinite}@keyframes lds-dual-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const spinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("div", { class: "lds-dual-ring" });
  }
};
spinner.style = spinnerCss;

export { spinner as am_spinner };
