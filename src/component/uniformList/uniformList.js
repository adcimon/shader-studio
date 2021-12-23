"use strict";

import { UniformItem } from "../uniformItem/uniformItem.js";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformList/style.css">`;

const html = `
<div class="list">
</div>
<button class="add-button">
    <svg viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/>
    </svg>
</button>
`;

export class UniformList extends HTMLElement
{
    list = null;
    items = [];
    addButton = null;

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
        this.list = this.shadowRoot.querySelector(".list");

        this.addButton = this.shadowRoot.querySelector(".add-button");
        this.addButton.addEventListener("click", this.addUniform.bind(this));
    }

    disconnectedCallback()
    {
    }

    getUniforms()
    {
        return this.items;
    }

    addUniform()
    {
        let item = new UniformItem();
        this.list.appendChild(item);
        this.items.push(item);
        return item;
    }
}

window.customElements.define("uniform-list", UniformList);