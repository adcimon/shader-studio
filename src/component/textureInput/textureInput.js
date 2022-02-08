"use strict";

import { WrapMode } from '../../render/wrapMode.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/styles/select.css">
<link type="text/css" rel="stylesheet" href="./src/styles/video.css">
<link type="text/css" rel="stylesheet" href="./src/component/textureInput/style.css">
`;

const html =
`
<button id="button">
    <svg viewBox="0 0 512 512">
        <path d="M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
        <path d="M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
    </svg>
</button>
<div id="window" hidden>
    <div id="modal">
        <button id="closeButton">
            <svg viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368" />
            </svg>
        </button>
        <div>
            <select id="wrapHorizontalSelect"></select>
            <select id="wrapVerticalSelect"></select>
        </div>
    </div>
</div>
`;

export class TextureInput extends HTMLElement
{
    button = null;
    window = null;
    closeButton = null;
    wrapHorizontalSelect = null;
    wrapVerticalSelect = null;

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
        this.button = this.shadowRoot.querySelector("#button");
        this.window = this.shadowRoot.querySelector("#window");
        this.closeButton = this.shadowRoot.querySelector("#closeButton");
        this.wrapHorizontalSelect = this.shadowRoot.querySelector("#wrapHorizontalSelect");
        this.wrapVerticalSelect = this.shadowRoot.querySelector("#wrapVerticalSelect");

        this.button.addEventListener("click", () =>
        {
            this.window.hidden = false;
        });

        this.closeButton.addEventListener("click", () =>
        {
            this.window.hidden = true;
        });

        Object.keys(WrapMode).forEach(key =>
        {
            let option = document.createElement("option");
            option.value = WrapMode[key];
            option.text = key;
            this.wrapHorizontalSelect.appendChild(option);
        });
        this.wrapHorizontalSelect.addEventListener("change", () =>
        {
            this.dispatchValueChange();
        });

        Object.keys(WrapMode).forEach(key =>
        {
            let option = document.createElement("option");
            option.value = WrapMode[key];
            option.text = key;
            this.wrapVerticalSelect.appendChild(option);
        });
        this.wrapVerticalSelect.addEventListener("change", () =>
        {
            this.dispatchValueChange();
        });
    }

    disconnectedCallback()
    {
    }

    getValue()
    {
        return {
            wrapHorizontal:     this.wrapHorizontalSelect[this.wrapHorizontalSelect.selectedIndex].value,
            wrapVertical:       this.wrapVerticalSelect[this.wrapVerticalSelect.selectedIndex].value
        }
    }

    dispatchValueChange()
    {
        let newEvent = new CustomEvent("valuechange", { detail: { textureInput: this, value: this.getValue() }});
        this.dispatchEvent(newEvent);
    }
}

window.customElements.define("texture-input", TextureInput);