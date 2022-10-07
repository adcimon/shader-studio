"use strict";

import { BaseElement } from "./baseElement.js";
import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<div class="flex flex-col items-center justify-center px-2 py-4">

    <video id="video" autoplay loop muted playsinline></video>

    <!-- Device -->
    <label class="block mt-4 text-sm px-2">
        <span class="text-gray-700 dark:text-gray-400">Device</span>
        <select
            id="deviceSelect"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
        </select>
    </label>

    <div class="flex items-center justify-center w-full">

        <!-- Wrap Horizontal -->
        <label class="block mt-4 text-sm px-2">
            <span class="text-gray-700 dark:text-gray-400">Wrap Horizontal</span>
            <select
                id="wrapHorizontalSelect"
                class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                    <option>Clamp to Edge</option>
                    <option>Repeat Wrapping</option>
                    <option>Mirrored Repeat Wrapping</option>
            </select>
        </label>

        <!-- Wrap Vertical -->
        <label class="block mt-4 text-sm px-2">
            <span class="text-gray-700 dark:text-gray-400">Wrap Vertical</span>
            <select
                id="wrapVerticalSelect"
                class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                    <option>Clamp to Edge</option>
                    <option>Repeat Wrapping</option>
                    <option>Mirrored Repeat Wrapping</option>
            </select>
        </label>

    </div>

</div>
`;

export class WebcamInput extends BaseElement
{
    video = null;
    deviceSelect = null;
    wrapHorizontalSelect = null;
    wrapVerticalSelect = null;

    devices = { };
    previousConstraints = null;
    constraints =
    {
        video:
        {
            deviceId:   { exact: undefined },
            width:      { exact: undefined },
            height:     { exact: undefined },
            frameRate:  { ideal: 60 }
        }
    };

    constructor()
    {
        super();

        this.state = { };
    }

    connectedCallback()
    {
        this.createElement(html);

        this.video = this.querySelector("#video");
        this.deviceSelect = this.querySelector("#deviceSelect");
        this.wrapHorizontalSelect = this.querySelector("#wrapHorizontalSelect");
        this.wrapVerticalSelect = this.querySelector("#wrapVerticalSelect");

        this.deviceSelect.addEventListener("change", (event) =>
        {
            event.stopPropagation();

            let name = this.deviceSelect.options[this.deviceSelect.selectedIndex].text;
            let id = this.devices[name];
            this.findStream(id);
        });

        this.wrapHorizontalSelect.addEventListener("change", (event) =>
        {
            event.stopPropagation();

            this.dispatchChangeEvent();
        });

        this.wrapVerticalSelect.addEventListener("change", (event) =>
        {
            event.stopPropagation();

            this.dispatchChangeEvent();
        });

        this.findDevices().then(() =>
        {
            this.deviceSelect.selectedIndex = this.selectDefaultDevice();
            let name = this.deviceSelect.options[this.deviceSelect.selectedIndex].text;
            let id = this.devices[name];
            this.findStream(id);
        });

        this.setState(this.state);
    }

    getValue()
    {
        let index = this.deviceSelect.selectedIndex;
        let name = (this.deviceSelect.selectedIndex in this.deviceSelect.options) ? this.deviceSelect.options[this.deviceSelect.selectedIndex].text : "";
        let id = (name in this.devices) ? this.devices[name] : "";

        let wrapHorizontal = THREE.ClampToEdgeWrapping;
        switch( this.wrapHorizontalSelect.selectedIndex )
        {
            case 0:     wrapHorizontal = THREE.ClampToEdgeWrapping; break;
            case 1:     wrapHorizontal = THREE.RepeatWrapping; break;
            case 2:     wrapHorizontal = THREE.MirroredRepeatWrapping; break;
            default:    wrapHorizontal = THREE.ClampToEdgeWrapping; break;
        }

        let wrapVertical = THREE.ClampToEdgeWrapping;
        switch( this.wrapVerticalSelect.selectedIndex )
        {
            case 0:     wrapVertical = THREE.ClampToEdgeWrapping; break;
            case 1:     wrapVertical = THREE.RepeatWrapping; break;
            case 2:     wrapVertical = THREE.MirroredRepeatWrapping; break;
            default:    wrapVertical = THREE.ClampToEdgeWrapping; break;
        }

        return {
            device:             { id: id, index: index, name: name },
            wrapHorizontal:     wrapHorizontal,
            wrapVertical:       wrapVertical,
            video:              this.video
        }
    }

    setValue( value )
    {
        this.video.srcObject = value.video.srcObject;

        if( value.device.name in this.devices )
        {
            if( this.deviceSelect.options[value.device.index].value === value.device.id )
            {
                this.deviceSelect.selectedIndex = value.device.index;
            }
            else
            {
                for( let i = 0; i < this.deviceSelect.options.length; i++ )
                {
                    if( this.deviceSelect.options[i].value === value.device.id )
                    {
                        this.deviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        else
        {
            this.deviceSelect.selectedIndex = -1;
        }

        switch( value.wrapHorizontal )
        {
            case THREE.ClampToEdgeWrapping:     this.wrapHorizontalSelect.selectedIndex = 0; break;
            case THREE.RepeatWrapping:          this.wrapHorizontalSelect.selectedIndex = 1; break;
            case THREE.MirroredRepeatWrapping:  this.wrapHorizontalSelect.selectedIndex = 2; break;
            default:                            this.wrapHorizontalSelect.selectedIndex = 0; break;
        }

        switch( value.wrapVertical )
        {
            case THREE.ClampToEdgeWrapping:     this.wrapVerticalSelect.selectedIndex = 0; break;
            case THREE.RepeatWrapping:          this.wrapVerticalSelect.selectedIndex = 1; break;
            case THREE.MirroredRepeatWrapping:  this.wrapVerticalSelect.selectedIndex = 2; break;
            default:                            this.wrapVerticalSelect.selectedIndex = 0; break;
        }
    }

    dispatchChangeEvent()
    {
        let newEvent = new CustomEvent("change", { detail: { value: this.getValue() }});
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
                let name = (info.label === "" ) ? ("Video input " + i) : info.label;
                this.devices[name] = info.deviceId;
                i++;
            }
        }

        while( this.deviceSelect.firstChild )
        {
            this.deviceSelect.removeChild(this.deviceSelect.lastChild);
        }
    
        for( let name in this.devices )
        {
            let option = document.createElement("option");
            option.value = this.devices[name]; // id
            option.text = name;
            this.deviceSelect.appendChild(option);
        }
    }

    async errorDevices( error )
    {
        console.log(error);
    }

    selectDefaultDevice()
    {
        for( let i = 0; i < this.deviceSelect.options.length; i++ )
        {
            let name = this.deviceSelect.options[i].text.toLowerCase();
            if( name.includes("ndi") || name.includes("obs") )
            {
                continue;
            }

            return i;
        }

        return 0;
    }

    async findStream( deviceId )
    {
        this.previousConstraints = clone(this.constraints);
        this.constraints.video.deviceId = deviceId;
        return this.getStream();
    }

    async getStream()
    {
        this.stopStream(this.video.srcObject);
        return window.navigator.mediaDevices.getUserMedia(this.constraints).then(this.gotStream.bind(this)).catch(this.errorStream.bind(this));
    }

    async gotStream( stream )
    {
        this.video.srcObject = stream;
        this.dispatchChangeEvent();
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

    async stopStream( stream )
    {
        if( stream )
        {
            stream.getTracks().forEach(track => track.stop());
        }
    }
}

window.customElements.define("webcam-input", WebcamInput);