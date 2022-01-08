"use strict";

import { CompileIcon } from './icons.js';

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
        ${CompileIcon}
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
        compileButton.addEventListener("click", () =>
        {
            let event = new CustomEvent("compile");
            this.dispatchEvent(event);
        });
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("editor-view", EditorView);