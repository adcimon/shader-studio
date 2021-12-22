"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformList/style.css">`;

const html = `
<div class="list">
</div>
`;

export class UniformList extends HTMLElement
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

window.customElements.define("uniform-list", UniformList);