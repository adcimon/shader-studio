"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/editorView/style.css">`;

const html = `
<div class="nav-bar">
    <slot name="nav-bar"/>
</div>
<div class="content">
    <slot name="content"/>
</div>
<div class="status-bar">
    <button class="compile-button">
        <svg viewBox="0 0 512 512">
            <path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        </svg>
    </button>
</div>
`;

export class EditorView extends HTMLElement
{
    constructor()
    {
        super();

        const template = document.createElement("template");
        template.innerHTML = css + html;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback()
    {
        const compileButton = this.shadowRoot.querySelector(".compile-button");
        compileButton.addEventListener("click", function()
        {
            let event = new CustomEvent("compile");
            this.dispatchEvent(event);
        }.bind(this));
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("editor-view", EditorView);