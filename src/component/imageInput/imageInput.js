"use strict";

import { CloseIcon, ImageIcon } from '../.././icons.js';
import { WrapMode } from '../../render/wrapMode.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/styles/select.css">
<link type="text/css" rel="stylesheet" href="./src/styles/video.css">
<link type="text/css" rel="stylesheet" href="./src/styles/modal.css">
<link type="text/css" rel="stylesheet" href="./src/component/imageInput/style.css">
`;

const html =
`
<button id="button">
    ${ImageIcon}
</button>
<div id="window" hidden>
    <div id="modal">
        <button id="closeButton">
            ${CloseIcon}
        </button>

        <input id="fileInput" type="file" accept="image/*" hidden>
        <img id="image"/>

        <div>
            <select id="wrapHorizontalSelect"></select>
            <select id="wrapVerticalSelect"></select>
        </div>
    </div>
</div>
`;

export class ImageInput extends HTMLElement
{
    button = null;
    window = null;
    closeButton = null;
    fileInput = null;
    image = null;
    wrapHorizontalSelect = null;
    wrapVerticalSelect = null;

    fileName = ""

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
        this.fileInput = this.shadowRoot.querySelector("#fileInput");
        this.image = this.shadowRoot.querySelector("#image");
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

        this.fileInput.addEventListener("change", (event) =>
        {
            this.fileName = event.target.files[0].name;
            this.image.src = URL.createObjectURL(event.target.files[0]);
        });

        this.image.addEventListener("click", () =>
        {
            let clickEvent = new MouseEvent("click",
            {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            this.fileInput.dispatchEvent(clickEvent);
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
            fileName:           this.fileName,
            image:              this.image,
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

window.customElements.define("image-input", ImageInput);