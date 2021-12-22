"use strict";

import { UniformItem } from "../uniformItem/uniformItem.js";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformList/style.css">`;

const html = `
<div class="list">
</div>
`;

export class UniformList extends HTMLElement
{
    list = null;

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

        for( let i = 0; i < 3; i++ )
        {
            let item = new UniformItem();
            this.list.appendChild(item);
        }
    }

    disconnectedCallback()
    {
    }

    addUniform()
    {
        let item = new UniformItem();
        this.list.appendChild(item);
        return item;
    }
}

window.customElements.define("uniform-list", UniformList);