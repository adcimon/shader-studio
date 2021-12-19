"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformList/style.css">`;

const html = `
<div>
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

    show()
    {
        this.style.visibility = "visible";
    }

    hide()
    {
        this.style.visibility = "hidden";
    }
}

window.customElements.define("uniform-list", UniformList);