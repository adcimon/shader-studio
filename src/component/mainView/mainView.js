"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/mainView/style.css">`;

const html = `
<div class="left">
    <slot name="left"/>
</div>
<div class="right">
    <slot name="right"/>
</div>
`;

export class MainView extends HTMLElement
{
    canvas = null;

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

window.customElements.define("main-view", MainView);