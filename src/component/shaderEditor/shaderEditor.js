"use strict";

import CodeFlask from './codeflask.module.js';

const css = `<link type="text/css" rel="stylesheet" href="./src/component/shaderEditor/style.css">`;

const html = `
<div class="editor">
</div>
`;

export class ShaderEditor extends HTMLElement
{
    code = null;
    flask = null;

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
        const editor = this.shadowRoot.querySelector(".editor");
        this.flask = new CodeFlask(editor,
        {
            language: "js",
            lineNumbers: true,
            styleParent: this.shadowRoot,
            defaultTheme: false
        });
        this.flask.onUpdate(function( code )
        {
            this.code = code;
        }.bind(this));
    }

    disconnectedCallback()
    {
    }

    getCode()
    {
        return this.code;
    }

    setCode( code )
    {
        this.code = code;
        this.flask.updateCode(this.code);
    }
}

window.customElements.define("shader-editor", ShaderEditor);