"use strict";

const css =
`
<link type="text/css" rel="stylesheet" href="./src/component/renderView/style.css">
`;

const html =
`
<div id="renderContainer">
    <canvas id="canvas">Your browser does not support the HTML5 canvas element.</canvas>
    <video id="video" autoplay controls>Your browser does not support the HTML5 video element.</video>
</div>
<div id="statusBar">
    <span id="resolutionLabel"></span>
</div>
`;

export class RenderView extends HTMLElement
{
    canvas = null;
    video = null;
    resolutionLabel = null;

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
        this.canvas = this.shadowRoot.querySelector("#canvas");
        this.video = this.shadowRoot.querySelector("#video");
        this.resolutionLabel = this.shadowRoot.querySelector("#resolutionLabel");

        window.addEventListener("resize", this.resize.bind(this));

        window.setTimeout(() =>
        {
            let stream = this.canvas.captureStream();
            this.video.srcObject = stream;
        }, 1000);
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
        this.resolutionLabel.innerHTML = rect.width + "x" + rect.height;

        let newEvent = new CustomEvent("resize");
        this.dispatchEvent(newEvent);
    }
}

window.customElements.define("render-view", RenderView);