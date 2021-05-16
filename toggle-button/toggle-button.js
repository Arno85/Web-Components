class ToggleButton extends HTMLElement {
    constructor() {
        super();

        this._isHidden = true;
        this._buttonEl;
        this._slotEl;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                slot {
                    display: none;
                }
            </style>

            <button>Show</button>
            <slot>Default element</slot>
        `;
    }

    connectedCallback() {
        this._buttonEl = this.shadowRoot.querySelector('button');
        this._slotEl = this.shadowRoot.querySelector('slot');

        this._buttonEl.addEventListener('click', this._toggle.bind(this));
    }

    _toggle() {
        if (this._isHidden) {
            this._slotEl.style.display = 'block';
            this._buttonEl.textContent = 'Hide';
        } else {
            this._slotEl.style.display = 'none';
            this._buttonEl.textContent = 'Show';
        }

        this._isHidden = !this._isHidden;
    }
}

customElements.define('am-toggle-button', ToggleButton);