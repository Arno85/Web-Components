import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';
import { AV_API_KEY } from './../../shared/shared';

@Component({
	tag: 'am-stock-price',
	styleUrl: 'stock-price.css',
	shadow: true
})
export class StockPrice {
	initialStockSymbol: string;

	@State() stockPrice: number;
	@State() stockInput: string;
	@State() stockInputValid = false;
	@State() error: string;
	@State() loading = false;

	@Prop({ mutable: true, reflect: true })
	stockSymbol: string;

	@Watch('stockSymbol')
	stockSymbolChanged(newValue: string, oldValue: string) {
		if (newValue !== oldValue) {
			this.stockInput = this.stockSymbol;
			this.stockInputValid = true;
			this.fetchStockPrice();
		}
	}

	@Listen('amSymbolSelected', { target: 'body' })
	onStockSymbolSelected(event: CustomEvent) {
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

	onFormSubmit(event: Event) {
		event.preventDefault();
		this.stockSymbol = this.stockInput;
	}

	onUserInput(event) {
		this.stockInput = (event.target as HTMLInputElement).value;
		this.stockInputValid = this.stockInput.trim() !== '';
	}

	async fetchStockPrice() {
		try {
			this.error = null;
			this.loading = true;

			var response = await fetch(
				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockInput}&apikey=${AV_API_KEY}`
			);

			if (!response.ok) {
				throw new Error('Unable to fetch stock!');
			}

			var data = await response.json();

			if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
				throw new Error('Invalid Symbol!');
			}

			this.stockPrice = +data['Global Quote']['05. price'];
		} catch (err) {
			this.error = err.message;
			this.stockPrice = null;
		} finally {
			this.loading = false;
		}
	}

	render() {
		let dataContent = <p>Price: ${this.stockPrice}</p>;

		if (this.loading) {
			dataContent = <am-spinner />;
		}

		if (this.error) {
			dataContent = <p>{this.error}</p>;
		}

		if (!this.stockInputValid) {
			dataContent = <p>Please enter a symbol</p>;
		}

		return [
			<form onSubmit={this.onFormSubmit.bind(this)}>
				<input id="stock-symbol" value={this.stockInput} onInput={this.onUserInput.bind(this)} />
				<button disabled={!this.stockInputValid || this.loading}>Fetch</button>
			</form>,
			<div class="data-content">{dataContent}</div>
		];
	}
}
