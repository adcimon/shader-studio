"use strict";

import { BaseElement } from "./baseElement.js";

const html = /*html*/
`
<div
    id="text"
    class="text-base text-gray-800 dark:text-gray-200">
    Placeholder
</div>
`;

export class GenericLabel extends BaseElement
{
    text = null;

    constructor()
    {
        super();

        this.state =
        {
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));

        this.text = this.querySelector("#text");

        this.setState(this.state);
    }

    setText( text )
    {
        this.text.innerText = text;
    }
}

window.customElements.define("generic-label", GenericLabel);