"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/renderView/style.css">`;

const html = `
<canvas>Your browser does not support the HTML5 canvas element.</canvas>
`;

export class RenderView extends HTMLElement
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
        this.canvas = this.shadowRoot.querySelector("canvas");
        window.addEventListener("resize", this.resize.bind(this));
    }

    disconnectedCallback()
    {
        window.removeEventListener("resize", this.resize);
    }

    getWidth()
    {
        return this.canvas.getBoundingClientRect().width;
    }

    getHeight()
    {
        return this.canvas.getBoundingClientRect().height;
    }

    getCanvas()
    {
        return this.canvas;
    }

    resize()
    {
        let rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        let event = new CustomEvent("resize");
        this.dispatchEvent(event);
    }
}

window.customElements.define("render-view", RenderView);