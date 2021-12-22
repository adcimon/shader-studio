"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformItem/style.css">`;

const html = `
<select class="type">
    <option value="float">float</option>
</select>
<input class="name" type="text"></input>
<input class="value" type="number" value="1.0" step="0.1"></input>
`;

export class UniformItem extends HTMLElement
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

window.customElements.define("uniform-item", UniformItem);