class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipText = 'Add a "text" attribute to the component to show your custom text';
        this._tooltipIcon;
        this._tooltipVisible = false;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Style the main component 
                <am-tooltip></am-tooltip> */
                :host() {
                    position: relative;    
                }

                /* Style the main component with condition from the light DOM 
                <am-tooltip class="important"></am-tooltip> */
                :host(.important) {
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                    position: relative;
                }

                /* Style the main component with condition that is wrapped with a paragraph
                <p><am-tooltip></am-tooltip></p> */
                :host-context(p) {
                    background: #ccc;
                }

                /* Style the content inside the slot */
                ::slotted(.highlight) {
                    border-bottom: 2px dotted red;
                }

                .tooltip-content {
                    font-weight: normal;
                    background-color: #eee;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.5rem;
                    border-radius: 5px;
                    box-shadow: 1px 1px 6px rgba(0, 0 , 0, 0.26);
                }

                .icon {
                    background-color: black;
                    color: white;
                    padding: 0.20rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>

            <slot>Tooltip default text</slot>
            <span class="icon">?</span>
        `;
    }

    static get observedAttributes() {
        return ['text'];
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._addIcon();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (attributeName === 'text') {
            this._tooltipText = newValue;
        }
    }

    diconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('.tooltip-content');

        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.classList.add('tooltip-content');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _addIcon() {
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('am-tooltip', Tooltip);