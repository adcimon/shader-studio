"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformItem/style.css">`;

const html = `
<div class="item">
</div>
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