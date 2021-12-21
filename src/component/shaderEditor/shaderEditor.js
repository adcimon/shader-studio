"use strict";

import CodeFlask from './codeflask.module.js';

const css = `<link type="text/css" rel="stylesheet" href="./src/component/shaderEditor/style.css">`;

const html = `
<div class="editor">
</div>
<div class="controls">
    <button class="compile-button">
        <svg viewBox="0 0 512 512">
            <path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        </svg>
    </button>
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
        // Editor.
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

        // Compile.
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