"use strict";

import { CloseIcon, CameraIcon } from '../../icons.js';
import { clone } from '../../utils.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/styles/select.css">
<link type="text/css" rel="stylesheet" href="./src/styles/video.css">
<link type="text/css" rel="stylesheet" href="./src/styles/modal.css">
<link type="text/css" rel="stylesheet" href="./src/component/webcamInput/style.css">
`;

const html =
`
<button id="button">
    ${CameraIcon}
</button>
<div id="window" hidden>
    <div id="modal">
        <button id="closeButton">
            ${CloseIcon}
        </button>
        <video id="video" autoplay loop muted playsinline></video>
        <select id="deviceSelect"></select>
    </div>
</div>
`;

export class WebcamInput extends HTMLElement
{
    button = null;
    window = null;
    closeButton = null;
    video = null;
    deviceSelect = null;

    stream = null;
    devices = { };
    previousConstraints = null;
    constraints =
    {
        video:
        {
            deviceId: { exact: undefined },
            width: { exact: undefined },
            height: { exact: undefined },
            frameRate: { ideal: 60 }
        }
    };

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
        this.button = this.shadowRoot.querySelector("#button");
        this.window = this.shadowRoot.querySelector("#window");
        this.closeButton = this.shadowRoot.querySelector("#closeButton");
        this.video = this.shadowRoot.querySelector("#video");
        this.deviceSelect = this.shadowRoot.querySelector("#deviceSelect");
        this.stream = new MediaStream();

        this.button.addEventListener("click", () =>
        {
            this.window.hidden = false;

            // Find devices and stream on enter the first time.
            if( this.deviceSelect.selectedIndex === -1 )
            {
                this.findDevices().then(() =>
                {
                    console.log(this.deviceSelect.selectedIndex);
                    this.deviceSelect.selectedIndex = 0;
                    let device = this.deviceSelect.options[this.deviceSelect.selectedIndex].value;
                    let deviceId = this.devices[device];
                    this.findStream(deviceId);
                });
            }
        });

        this.closeButton.addEventListener("click", () =>
        {
            this.window.hidden = true;
        });

        this.deviceSelect.addEventListener("change", () =>
        {
            let device = this.deviceSelect.options[this.deviceSelect.selectedIndex].value;
            let deviceId = this.devices[device];
            this.findStream(deviceId);
        });
    }

    disconnectedCallback()
    {
    }

    getStream()
    {
        return this.stream;
    }

    getVideo()
    {
        return this.video;
    }

    getValue()
    {
        return {
            stream: this.stream,
            video:  this.video
        }
    }

    dispatchValueChange()
    {
        let newEvent = new CustomEvent("valuechange", { detail: { webcamInput: this, value: this.getValue() }});
        this.dispatchEvent(newEvent);
    }

    async findDevices()
    {
        return this.getDevices();
    }

    async getDevices()
    {
        return window.navigator.mediaDevices.enumerateDevices().then(this.gotDevices.bind(this)).catch(this.errorDevices.bind(this));
    }

    async gotDevices( deviceInfos )
    {
        this.devices = { };

        let i = 0;
        for( let info of deviceInfos )
        {
            if( info.kind === "videoinput" )
            {
                let label = (info.label === "" ) ? ("Video input " + i) : info.label;
                this.devices[label] = info.deviceId;
                i++;
            }
        }

        while( this.deviceSelect.firstChild )
        {
            this.deviceSelect.removeChild(this.deviceSelect.lastChild);
        }
    
        for( let device in this.devices )
        {
            let option = document.createElement("option");
            option.value = device;
            option.text = device;
            this.deviceSelect.appendChild(option);
        }
    }

    async errorDevices( error )
    {
        console.log(error);
    }

    async findStream( deviceId )
    {
        this.previousConstraints = clone(this.constraints);
        this.constraints.video.deviceId = deviceId;
        return this.getStream();
    }

    async getStream()
    {
        this.stopStream();
        return window.navigator.mediaDevices.getUserMedia(this.constraints).then(this.gotStream.bind(this)).catch(this.errorStream.bind(this));
    }

    async gotStream( stream )
    {
        this.stream = stream;
        this.video.srcObject = stream;

        this.dispatchValueChange();
    }

    async errorStream( error )
    {
        console.log(error);

        if( this.previousConstraints )
        {
            this.constraints = clone(this.previousConstraints);
            this.previousConstraints = null;
            this.getStream();
        }
    }

    stopStream()
    {
        if( this.stream )
        {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}

window.customElements.define("webcam-input", WebcamInput);