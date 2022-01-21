"use strict";

import { CompileIcon } from './icons.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/component/editorView/style.css">
`;

const html =
`
<div id="navBar">
    <slot name="top"/>
</div>
<div id="content">
    <slot name="content"/>
</div>
<div id="statusBar">
    <button id="compileButton">
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
        const compileButton = this.shadowRoot.querySelector("#compileButton");
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