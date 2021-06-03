export declare class StockPrice {
  initialStockSymbol: string;
  stockPrice: number;
  stockInput: string;
  stockInputValid: boolean;
  error: string;
  loading: boolean;
  stockSymbol: string;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  onStockSymbolSelected(event: CustomEvent): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentWillUpdate(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  hostData(): {
    class: string;
  };
  onFormSubmit(event: Event): void;
  onUserInput(event: any): void;
  fetchStockPrice(): Promise<void>;
  render(): any[];
}
