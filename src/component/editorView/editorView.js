"use strict";

import { PlayIcon, DownloadIcon } from '../../icons.js';

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
        ${PlayIcon}
    </button>
    <button id="downloadButton">
        ${DownloadIcon}
    </button>
</div>
`;

export class EditorView extends HTMLElement
{
    compileButton = null;
    downloadButton = null;

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
        this.compileButton = this.shadowRoot.querySelector("#compileButton");
        this.downloadButton = this.shadowRoot.querySelector("#downloadButton");

        this.compileButton.addEventListener("click", () =>
        {
            let event = new CustomEvent("compile");
            this.dispatchEvent(event);
        });

        this.downloadButton.addEventListener("click", () =>
        {
            let event = new CustomEvent("download");
            this.dispatchEvent(event);
        });
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("editor-view", EditorView);