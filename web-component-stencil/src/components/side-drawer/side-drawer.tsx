import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
	tag: 'am-side-drawer',
	styleUrl: 'side-drawer.css',
	shadow: true
})
export class SideDrawer {
	@Prop({ reflect: true })
	drawerTitle: string;
	@Prop({ reflect: true, mutable: true })
	opened: boolean;
	@State() showContact = false;

	@Method()
	async open() {
		this.opened = true;
	}

	close() {
		this.opened = false;
	}

	onContentChange(content: string) {
		this.showContact = content === 'contact';
	}

	render() {
		let mainContent = <slot />;

		if (this.showContact) {
			mainContent = (
				<div class="contact-information">
					<h2>Contact Information</h2>
					<p>You can reach us via phone or email</p>
					<ul>
						<li>Phone: 555-555-5555</li>
						<li>
							E-Mail: <a href="mailto:test@test.com">test@test.com</a>
						</li>
					</ul>
				</div>
			);
		}

		return [
			<div class="backdrop" onClick={this.close.bind(this)} />,
			<aside>
				<header>
					<h1>{this.drawerTitle}</h1>
					<button onClick={this.close.bind(this)}>x</button>
				</header>
				<section class="tabs">
					<button class={!this.showContact ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>
						Navigation
					</button>
					<button
						class={this.showContact ? 'active' : ''}
						onClick={this.onContentChange.bind(this, 'contact')}
					>
						Contact
					</button>
				</section>
				<nav>{mainContent}</nav>
			</aside>
		];
	}
}
