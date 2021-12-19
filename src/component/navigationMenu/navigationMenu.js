"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/navigationMenu/style.css">`;

const html = `
<div class="nav-menu">
    <ul>
        <li class="nav-item active" name="shader">
            <a href="#">
                <span class="nav-icon">
                    <svg viewBox="0 0 512 512">
                        <path d="M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                        <circle cx="144" cy="208" r="32" fill="currentColor"/>
                        <circle cx="152" cy="311" r="32" fill="currentColor"/>
                        <circle cx="224" cy="144" r="32" fill="currentColor"/>
                        <circle cx="256" cy="367" r="48" fill="currentColor"/>
                        <circle cx="328" cy="144" r="32" fill="currentColor"/>
                    </svg>
                </span>
                <span class="nav-text">Shader</span>
            </a>
        </li>
        <li class="nav-item" name="uniforms">
            <a href="#">
                <span class="nav-icon">
                    <svg viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/>
                        <circle cx="336" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                        <circle cx="176" cy="256" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                        <circle cx="336" cy="384" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                    </svg>
                </span>
                <span class="nav-text">Uniforms</span>
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

        let event = new CustomEvent("itemselect", { detail:
        {
            item: item,
            name: item.getAttribute("name")
        }});
        this.dispatchEvent(event);
    }
}

window.customElements.define("navigation-menu", NavigationMenu);