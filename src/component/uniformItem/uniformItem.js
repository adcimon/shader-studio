"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/uniformItem/style.css">`;

const html = `
<select class="type-select">
    <option value="int">int</option>
    <option value="float" selected>float</option>
    <option value="vec2">vec2</option>
</select>
<input class="name-input" type="text" placeholder="name"></input>
<input class="value-input" type="number" value="1.0" step="0.1"></input>
<array-input class="array-input" hidden></array-input>
<button class="remove-button">
    <svg viewBox="0 0 512 512">
        <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/>
        <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
    </svg>
</button>
`;

export class UniformItem extends HTMLElement
{
    typeSelect = null;
    nameInput = null;
    valueInput = null;
    arrayInput = null;

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
        this.typeSelect = this.shadowRoot.querySelector(".type-select");
        this.nameInput = this.shadowRoot.querySelector(".name-input");
        this.valueInput = this.shadowRoot.querySelector(".value-input");
        this.arrayInput = this.shadowRoot.querySelector(".array-input");
        let removeButton = this.shadowRoot.querySelector(".remove-button");

        this.typeSelect.addEventListener("change", () =>
        {
            switch( this.typeSelect.value )
            {
                case "int":
                {
                    this.valueInput.hidden = false;
                    this.arrayInput.hidden = true;
                    this.valueInput.step = 1;
                    this.valueInput.value = Math.floor(this.valueInput.value);
                    break;
                }
                case "float":
                {
                    this.valueInput.hidden = false;
                    this.arrayInput.hidden = true;
                    this.valueInput.step = 0.1;
                    break;
                }
                case "vec2":
                {
                    this.valueInput.hidden = true;
                    this.arrayInput.hidden = false;
                    break;
                }
            }

            let newEvent = new CustomEvent("typechange", { detail: { uniformItem: this, value: this.typeSelect.value }});
            this.dispatchEvent(newEvent);
        });

        this.valueInput.addEventListener("change", () =>
        {
            if( this.typeSelect.value === "int" )
            {
                this.valueInput.value = Math.floor(this.valueInput.value);
            }

            let newEvent = new CustomEvent("valuechange", { detail: { uniformItem: this, value: this.valueInput.value }});
            this.dispatchEvent(newEvent);
        });

        removeButton.addEventListener("click", () =>
        {
            this.parentElement.removeChild(this);

            let newEvent = new CustomEvent("removeuniform", { detail: { uniformItem: this }});
            this.dispatchEvent(newEvent);
        });

        this.nameInput.focus();
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