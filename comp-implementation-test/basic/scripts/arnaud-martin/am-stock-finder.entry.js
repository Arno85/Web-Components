import { r as registerInstance, e as createEvent, h } from './index-77474e9f.js';
import { A as AV_API_KEY } from './shared-cd657311.js';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-accent, white);cursor:pointer}form button:hover,form button:active{background:var(--color-primary-lighten, black);border-color:var(--color-primary-lighten, black)}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-accent, white);cursor:pointer}";

const StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.amSymbolSelected = createEvent(this, "amSymbolSelected", 7);
    this.searchResults = [];
    this.loading = false;
  }
  async onFindStocks(event) {
    event.preventDefault();
    try {
      this.error = null;
      this.loading = true;
      var response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockNameInput
        .value}&apikey=&apikey=${AV_API_KEY}`);
      if (!response.ok) {
        throw new Error('Unable to fetch stock!');
      }
      var data = await response.json();
      this.searchResults = data.bestMatches.map((x) => ({
        symbol: x['1. symbol'],
        name: x['2. name']
      }));
    }
    catch (err) {
      this.error = err.message;
    }
    finally {
      this.loading = false;
    }
  }
  onSelectSymbol(symbol) {
    this.amSymbolSelected.emit(symbol);
  }
  render() {
    let content = (h("ul", null, this.searchResults.map((res) => (h("li", { onClick: this.onSelectSymbol.bind(this, res.symbol) }, h("strong", null, res.symbol), " - ", res.name)))));
    if (this.loading) {
      content = h("am-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: (el) => (this.stockNameInput = el) }), h("button", null, "Find")),
      content
    ];
  }
};
StockFinder.style = stockFinderCss;

export { StockFinder as am_stock_finder };
