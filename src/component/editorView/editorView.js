"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/editorView/style.css">`;

const html = `
<div class="top">
    <slot name="top"/>
</div>
<div class="bottom">
    <slot name="bottom"/>
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
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("editor-view", EditorView);