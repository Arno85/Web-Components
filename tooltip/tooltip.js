class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Add a "text" attribute to the component to show your custom text';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: #eee;
                    position: absolute;
                    z-index: 10;
                }
            </style>

            <slot>Tooltip default text</slot>
            <span> (?)</span>
        `;
    }

    addIcon() {
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this.addIcon();
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('am-tooltip', Tooltip);