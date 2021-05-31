import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from './../../shared/shared';

@Component({
	tag: 'am-stock-finder',
	styleUrl: 'stock-finder.css',
	shadow: true
})
export class StockFinder {
	stockNameInput: HTMLInputElement;

	@State() error: string;
	@State() searchResults: { symbol: string; name: string }[] = [];
	@State() loading = false;

	@Event({ bubbles: true, composed: true })
	amSymbolSelected: EventEmitter<string>;

	async onFindStocks(event: Event) {
		event.preventDefault();

		try {
			this.error = null;
			this.loading = true;

			var response = await fetch(
				`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockNameInput
					.value}&apikey=&apikey=${AV_API_KEY}`
			);

			if (!response.ok) {
				throw new Error('Unable to fetch stock!');
			}

			var data = await response.json();
			this.searchResults = data.bestMatches.map((x) => ({
				symbol: x['1. symbol'],
				name: x['2. name']
			}));
		} catch (err) {
			this.error = err.message;
		} finally {
			this.loading = false;
		}
	}

	onSelectSymbol(symbol: string) {
		this.amSymbolSelected.emit(symbol);
	}

	render() {
		let content = (
			<ul>
				{this.searchResults.map((res) => (
					<li onClick={this.onSelectSymbol.bind(this, res.symbol)}>
						<strong>{res.symbol}</strong> - {res.name}
					</li>
				))}
			</ul>
		);

		if (this.loading) {
			content = <am-spinner />;
		}

		return [
			<form onSubmit={this.onFindStocks.bind(this)}>
				<input id="stock-symbol" ref={(el) => (this.stockNameInput = el)} />
				<button>Find</button>
			</form>,
			content
		];
	}
}
