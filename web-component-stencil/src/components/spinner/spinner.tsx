import { Component, h } from '@stencil/core';

@Component({
	tag: 'am-spinner',
	styleUrl: 'spinner.css',
	shadow: true
})
export class spinner {
	render() {
		return <div class="lds-dual-ring" />;
	}
}
