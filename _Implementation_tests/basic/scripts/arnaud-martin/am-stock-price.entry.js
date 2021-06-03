import { r as registerInstance, h, f as Host } from './index-77474e9f.js';
import { A as AV_API_KEY } from './shared-cd657311.js';

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}:host(.error) .data-content{color:red}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:white;cursor:pointer}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background-color:#ccc;border-color:#ccc;color:white;cursor:not-allowed}.data-content{font-weight:700;color:var(--color-primary, black)}";

const StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stockInputValid = false;
    this.loading = false;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice();
    }
  }
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  componentWillLoad() {
    if (this.stockSymbol) {
      this.stockSymbolChanged('', this.stockSymbol);
    }
  }
  componentDidLoad() {
    console.log('Component did load: ', this.stockSymbol);
  }
  componentWillUpdate() {
    console.log('Component will update: ', this.stockInput);
  }
  componentDidUpdate() {
    console.log('Component did update: ', this.stockInput);
  }
  disconnectedCallback() {
    console.log('Component did unload: ', this.stockSymbol);
  }
  hostData() {
    return {
      class: this.error ? 'error' : ''
    };
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput;
  }
  onUserInput(event) {
    this.stockInput = event.target.value;
    this.stockInputValid = this.stockInput.trim() !== '';
  }
  async fetchStockPrice() {
    try {
      this.error = null;
      this.loading = true;
      var response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockInput}&apikey=${AV_API_KEY}`);
      if (!response.ok) {
        throw new Error('Unable to fetch stock!');
      }
      var data = await response.json();
      if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
        throw new Error('Invalid Symbol!');
      }
      this.stockPrice = +data['Global Quote']['05. price'];
    }
    catch (err) {
      this.error = err.message;
      this.stockPrice = null;
    }
    finally {
      this.loading = false;
    }
  }
  __stencil_render() {
    let dataContent = h("p", null, "Price: $", this.stockPrice);
    if (this.loading) {
      dataContent = h("am-spinner", null);
    }
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (!this.stockInputValid) {
      dataContent = h("p", null, "Please enter a symbol");
    }
    return [
      h("form", { onSubmit: this.onFormSubmit.bind(this) }, h("input", { id: "stock-symbol", value: this.stockInput, onInput: this.onUserInput.bind(this) }), h("button", { disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", { class: "data-content" }, dataContent)
    ];
  }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { StockPrice as am_stock_price };
