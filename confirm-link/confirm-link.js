class ConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you really want to leave ?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('am-confirm-link', ConfirmLink, { extends: 'a' });