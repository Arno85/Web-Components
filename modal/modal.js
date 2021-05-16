class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0 , 0.6);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                #modal {
                    position: fixed;
                    top: 30%;
                    left: 50%;
                    z-index: 100;
                    transform: translate(-50%, -50%);
                    background: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-width: 500px;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }

                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    top: 50%;
                }

                header, main, #actions {
                    padding: 1rem;
                }

                ::slotted([slot=title]) {
                    font-size: 1.4rem;
                    margin: 0;
                }

                header {
                    border-bottom: 1px solid #ccc;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    padding: 0.25rem;
                    margin: 0 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"></slot>
                </header>
                <main>
                    <slot></slot>
                </main>
                <section id="actions">
                    <button id="cancel">Cancel</button>
                    <button id="confirm">Ok</button>
                </section>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', (evt) => {
            console.dir(slots[1].assignedNodes());
        });

        this.isOpen = false;
        this._cancelButton = this.shadowRoot.querySelector('#cancel');
        this._confirmButton = this.shadowRoot.querySelector('#confirm');
        this._backdrop = this.shadowRoot.querySelector('#backdrop');

        this._cancelButton.addEventListener('click', this._cancel.bind(this));
        this._confirmButton.addEventListener('click', this._confirm.bind(this));
        this._backdrop.addEventListener('click', this._cancel.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
        } else {
            this.isOpen = false;
        }
    }

    disconnectedCallback() {
        this._cancelButton.removeEventListener('click');
        this._confirmButton.removeEventListener('click');
        this._backdrop.removeEventListener('click');
    }

    static get observedAttributes() {
        return ['opened'];
    }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    close() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }

        this.isOpen = false;
    }

    _cancel(event) {
        this.close();
        const cancelEvent = new Event('cancel', { bubbles: true, cancelable: false, composed: true });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.close();
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent) // Because of inheritance of HTMLElement, the custome Element has the method dispatchEvent within itself
    }
}

customElements.define('am-modal', Modal);