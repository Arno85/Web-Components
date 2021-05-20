import { Component, h, Prop, State } from '@stencil/core';

@Component({
	tag: 'am-tooltip',
	styleUrl: 'tooltip.css',
	shadow: true
})
export class tooltip {
	@Prop() text: string;
	@State() tooltipVisible = false;

	toggleTooltip() {
		this.tooltipVisible = !this.tooltipVisible;
	}

	render() {
		return [
			<slot />,
			<span class="icon" onClick={this.toggleTooltip.bind(this)}>
				?
			</span>,
			<div class={this.tooltipVisible ? 'tooltip-content visible' : 'tooltip-content'}>{this.text}</div>
		];
	}
}
