import { EventEmitter } from '../../stencil-public-runtime';
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  error: string;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  loading: boolean;
  amSymbolSelected: EventEmitter<string>;
  onFindStocks(event: Event): Promise<void>;
  onSelectSymbol(symbol: string): void;
  render(): any[];
}
