"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformItem/style.css">`;

const html = `
<select class="type">
    <option value="float">float</option>
</select>
<input class="name" type="text" placeholder="name"></input>
<input class="value" type="number" value="1.0" step="0.1"></input>
`;

export class UniformItem extends HTMLElement
{
    typeSelect = null;
    nameInput = null;
    valueInput = null;

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
        this.typeSelect = this.shadowRoot.querySelector(".type");
        this.nameInput = this.shadowRoot.querySelector(".name");
        this.valueInput = this.shadowRoot.querySelector(".value");
    }

    disconnectedCallback()
    {
    }

    getType()
    {
        return this.typeSelect.value;
    }

    getName()
    {
        return this.nameInput.value;
    }

    getValue()
    {
        return this.valueInput.value;
    }
}

window.customElements.define("uniform-item", UniformItem);