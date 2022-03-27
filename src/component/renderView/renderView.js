"use strict";

import { ResetIcon, ResumeIcon, PauseIcon, PicInPicIcon } from '../../icons.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/component/renderView/style.css">
`;

const html =
`
<div id="renderContainer">
    <canvas id="canvas">Your browser does not support the HTML5 canvas element.</canvas>
    <video id="video" autoplay controls>Your browser does not support the HTML5 video element.</video>
</div>
<div id="statusBar">
    <button id="resetButton">
        ${ResetIcon}
    </button>
    <button id="resumeButton" hidden>
        ${ResumeIcon}
    </button>
    <button id="pauseButton">
        ${PauseIcon}
    </button>
    <span id="timeLabel">0.0</span>

    <span id="resolutionLabel"></span>
    <button id="picinpicButton">
        ${PicInPicIcon}
    </button>
</div>
`;

export class RenderView extends HTMLElement
{
    canvas = null;
    video = null;
    resetButton = null;
    resumeButton = null;
    pauseButton = null;
    picinpicButton = null;
    timeLabel = null;
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
        this.resetButton = this.shadowRoot.querySelector("#resetButton");
        this.resumeButton = this.shadowRoot.querySelector("#resumeButton");
        this.pauseButton = this.shadowRoot.querySelector("#pauseButton");
        this.picinpicButton = this.shadowRoot.querySelector("#picinpicButton");
        this.timeLabel = this.shadowRoot.querySelector("#timeLabel");
        this.resolutionLabel = this.shadowRoot.querySelector("#resolutionLabel");

        // Picture in picture is not fully supported across browsers.
        if( !document.pictureInPictureEnabled )
        {
            console.log("Picture in picture is not supported");
            this.picinpicButton.hidden = true;
        }

        this.resetButton.addEventListener("click", () =>
        {
            this.setTime(0);

            let newEvent = new CustomEvent("resettime");
            this.dispatchEvent(newEvent);
        });

        this.resumeButton.addEventListener("click", () =>
        {
            this.resumeButton.hidden = true;
            this.pauseButton.hidden = false;

            let newEvent = new CustomEvent("resumetime");
            this.dispatchEvent(newEvent);
        });

        this.pauseButton.addEventListener("click", () =>
        {
            this.resumeButton.hidden = false;
            this.pauseButton.hidden = true;

            let newEvent = new CustomEvent("pausetime");
            this.dispatchEvent(newEvent);
        });

        this.picinpicButton.addEventListener("click", () =>
        {
            this.video.requestPictureInPicture();
        });

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

    setTime( time )
    {
        this.timeLabel.innerHTML = (Math.round(time * 100) / 100).toFixed(2);
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