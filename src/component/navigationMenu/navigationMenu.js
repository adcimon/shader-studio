"use strict";

import { ShaderIcon, UniformsIcon } from './icons.js';

const css = `<link type="text/css" rel="stylesheet" href="./src/component/navigationMenu/style.css">`;

const html = `
<div class="nav-menu">
    <ul>
        <li class="nav-item active" name="shader">
            <a href="#">
                <span class="nav-icon">
                    ${ShaderIcon}
                </span>
                <span class="nav-text">SHADER</span>
            </a>
        </li>
        <li class="nav-item" name="uniforms">
            <a href="#">
                <span class="nav-icon">
                    ${UniformsIcon}
                </span>
                <span class="nav-text">UNIFORMS</span>
            </a>
        </li>
        <div class="nav-indicator"></div>
    </ul>
</div>
`;

export class NavigationMenu extends HTMLElement
{
    items = null;

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
        this.items = this.shadowRoot.querySelectorAll(".nav-item");
        this.items.forEach((item) =>
        {
            item.addEventListener("click", this.handleClickItem.bind(this, item));
        });
    }

    disconnectedCallback()
    {
        this.items.forEach((item) =>
        {
            item.removeEventListener("click", this.handleClickItem);
        });
    }

    handleClickItem( item )
    {
        this.items.forEach((i) =>
        {
            i.classList.remove("active");
            item.classList.add("active");
        });

        let newEvent = new CustomEvent("itemselect", { detail:
        {
            item: item,
            name: item.getAttribute("name")
        }});
        this.dispatchEvent(newEvent);
    }
}

window.customElements.define("navigation-menu", NavigationMenu);