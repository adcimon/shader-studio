"use strict";

import { AddIcon } from '../../icons.js';
import { UniformItem } from "../uniformItem/uniformItem.js";

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/component/uniformList/style.css">
`;

const html =
`
<div id="list">
</div>
<button id="addButton" title="Add">
    ${AddIcon}
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
        this.list = this.shadowRoot.querySelector("#list");

        this.addButton = this.shadowRoot.querySelector("#addButton");
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

        let newEvent = new CustomEvent("adduniform", { detail: { uniformItem: item }});
        this.dispatchEvent(newEvent);

        return item;
    }
}

window.customElements.define("uniform-list", UniformList);