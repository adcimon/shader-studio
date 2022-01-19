"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/webcamInput/style.css">`;

const html = `
<button class="button">
    <svg viewBox="0 0 512 512">
        <path d="M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
        <path d="M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
    </svg>
</button>
<div class="window" hidden>
    <video autoplay loop muted playsinline></video>
    <select class="device-select"></select>
</div>
`;

export class WebcamInput extends HTMLElement
{
    button = null;
    window = null;
    video = null;
    deviceSelect = null;

    devices = { };
    stream = null;

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
        this.button = this.shadowRoot.querySelector(".button");
        this.window = this.shadowRoot.querySelector(".window");
        this.video = this.shadowRoot.querySelector("video");
        this.deviceSelect = this.shadowRoot.querySelector(".device-select");

        this.button.addEventListener("click", () =>
        {
            this.window.hidden = !this.window.hidden;
            this.findDevices();
        });

        this.deviceSelect.addEventListener("change", () =>
        {
            let device = this.deviceSelect.options[this.deviceSelect.selectedIndex].value;
            let deviceId = this.devices[device];
            this.findStream(deviceId);
        });

        this.stream = new MediaStream();
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

    async findDevices()
    {
        return this.getDevices().then(this.gotDevices.bind(this)).catch(this.errorDevices.bind(this));
    }

    async getDevices()
    {
        return window.navigator.mediaDevices.enumerateDevices();
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
        this.stopStream();
        this.constraints.video.deviceId = deviceId;
        return window.navigator.mediaDevices.getUserMedia(this.constraints).then(this.gotStream.bind(this)).catch(this.errorStream.bind(this));
    }

    async gotStream( stream )
    {
        this.stream = stream;
        this.video.srcObject = stream;

        let newEvent = new CustomEvent("valuechange", { detail: { webcamInput: this, value: this.stream }});
        this.dispatchEvent(newEvent);
    };

    async errorStream( error )
    {
        console.log(error);
    };

    stopStream()
    {
        if( this.stream )
        {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}

window.customElements.define("webcam-input", WebcamInput);