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
        return this.list.querySelectorAll("uniform-item");
    }

    addUniform()
    {
        let item = new UniformItem();
        item.addEventListener("removeuniform", (event) =>
        {
            let newEvent = new CustomEvent("removeuniform", { detail: { uniformItem: event.detail.uniformItem }});
            this.dispatchEvent(newEvent);
        });
        this.list.appendChild(item);

        let event = new CustomEvent("adduniform", { detail: { uniformItem: item }});
        this.dispatchEvent(event);

        return item;
    }
}

window.customElements.define("uniform-list", UniformList);