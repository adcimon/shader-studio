"use strict";

import { PlayIcon, DownloadIcon, UploadIcon } from '../../icons.js';

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
    <button id="compileButton" title="Compile">
        ${PlayIcon}
    </button>
    <div id="rightBar">
        <button id="saveButton" title="Save">
            ${DownloadIcon}
        </button>
        <input id="loadInput" type="file" accept="application/json" hidden>
        <button id="loadButton" title="Load">
            ${UploadIcon}
        </button>
    </div>
</div>
`;

export class EditorView extends HTMLElement
{
    compileButton = null;
    saveButton = null;
    loadInput = null;
    loadButton = null;

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
        this.saveButton = this.shadowRoot.querySelector("#saveButton");
        this.loadInput = this.shadowRoot.querySelector("#loadInput");
        this.loadButton = this.shadowRoot.querySelector("#loadButton");

        this.compileButton.addEventListener("click", () =>
        {
            let event = new CustomEvent("compile");
            this.dispatchEvent(event);
        });

        this.saveButton.addEventListener("click", () =>
        {
            let event = new CustomEvent("save");
            this.dispatchEvent(event);
        });

        let editorView = this;
        this.loadInput.addEventListener("change", (event) =>
        {
            let file = event.target.files[0];
            if( !file )
            {
                return;
            }

            let reader = new FileReader();
            reader.onload = function( event )
            {
                let contents = event.target.result;

                let clickEvent = new CustomEvent("load", { detail: { contents: contents } });
                editorView.dispatchEvent(clickEvent);
            };

            reader.readAsText(file);
        });

        this.loadButton.addEventListener("click", () =>
        {
            this.loadInput.click();
        });
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("editor-view", EditorView);