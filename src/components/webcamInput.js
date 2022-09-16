"use strict";

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

export function WebcamInput( domElement )
{
    let eventTarget = new EventTarget();
    let root = null;
    let video = null;
    let deviceSelect = null;
    let wrapHorizontalSelect = null;
    let wrapVerticalSelect = null;

    let devices = { };
    let previousConstraints = null;
    let constraints =
    {
        video:
        {
            deviceId:   { exact: undefined },
            width:      { exact: undefined },
            height:     { exact: undefined },
            frameRate:  { ideal: 60 }
        }
    };

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];

        video = root.querySelector("#video");
        deviceSelect = root.querySelector("#deviceSelect");
        wrapHorizontalSelect = root.querySelector("#wrapHorizontalSelect");
        wrapVerticalSelect = root.querySelector("#wrapVerticalSelect");

        deviceSelect.addEventListener("change", () =>
        {
            let name = deviceSelect.options[deviceSelect.selectedIndex].text;
            let id = devices[name];
            findStream(id);
        });

        wrapHorizontalSelect.addEventListener("change", () =>
        {
            dispatchChangeEvent();
        });

        wrapVerticalSelect.addEventListener("change", () =>
        {
            dispatchChangeEvent();
        });

        findDevices().then(() =>
        {
            deviceSelect.selectedIndex = selectDefaultDevice();
            let name = deviceSelect.options[deviceSelect.selectedIndex].text;
            let id = devices[name];
            findStream(id);
        });
    }

    let getElement = function()
    {
        return root;
    }

    let getValue = function()
    {
        let index = deviceSelect.selectedIndex;
        let name = (deviceSelect.selectedIndex in deviceSelect.options) ? deviceSelect.options[deviceSelect.selectedIndex].text : "";
        let id = (name in devices) ? devices[name] : "";

        let wrapHorizontal = THREE.ClampToEdgeWrapping;
        switch( wrapHorizontalSelect.selectedIndex )
        {
            case 0:     wrapHorizontal = THREE.ClampToEdgeWrapping; break;
            case 1:     wrapHorizontal = THREE.RepeatWrapping; break;
            case 2:     wrapHorizontal = THREE.MirroredRepeatWrapping; break;
            default:    wrapHorizontal = THREE.ClampToEdgeWrapping; break;
        }

        let wrapVertical = THREE.ClampToEdgeWrapping;
        switch( wrapVerticalSelect.selectedIndex )
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
            video:              video
        }
    }

    let setValue = function( value )
    {
        video.srcObject = value.video.srcObject;

        if( value.device.name in devices )
        {
            if( deviceSelect.options[value.device.index].value === value.device.id )
            {
                deviceSelect.selectedIndex = value.device.index;
            }
            else
            {
                for( let i = 0; i < deviceSelect.options.length; i++ )
                {
                    if( deviceSelect.options[i].value === value.device.id )
                    {
                        deviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        else
        {
            deviceSelect.selectedIndex = -1;
        }

        switch( value.wrapHorizontal )
        {
            case THREE.ClampToEdgeWrapping:     wrapHorizontalSelect.selectedIndex = 0; break;
            case THREE.RepeatWrapping:          wrapHorizontalSelect.selectedIndex = 1; break;
            case THREE.MirroredRepeatWrapping:  wrapHorizontalSelect.selectedIndex = 2; break;
            default:                            wrapHorizontalSelect.selectedIndex = 0; break;
        }

        switch( value.wrapVertical )
        {
            case THREE.ClampToEdgeWrapping:     wrapVerticalSelect.selectedIndex = 0; break;
            case THREE.RepeatWrapping:          wrapVerticalSelect.selectedIndex = 1; break;
            case THREE.MirroredRepeatWrapping:  wrapVerticalSelect.selectedIndex = 2; break;
            default:                            wrapVerticalSelect.selectedIndex = 0; break;
        }
    }

    let dispatchChangeEvent = function()
    {
        let newEvent = new CustomEvent("change", { detail: { value: getValue() }});
        eventTarget.dispatchEvent(newEvent);
    }

    let findDevices = async function()
    {
        return getDevices();
    }

    let getDevices = async function()
    {
        return window.navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(errorDevices);
    }

    let gotDevices = async function( deviceInfos )
    {
        devices = { };

        let i = 0;
        for( let info of deviceInfos )
        {
            if( info.kind === "videoinput" )
            {
                let name = (info.label === "" ) ? ("Video input " + i) : info.label;
                devices[name] = info.deviceId;
                i++;
            }
        }

        while( deviceSelect.firstChild )
        {
            deviceSelect.removeChild(deviceSelect.lastChild);
        }
    
        for( let name in devices )
        {
            let option = document.createElement("option");
            option.value = devices[name]; // id
            option.text = name;
            deviceSelect.appendChild(option);
        }
    }

    let errorDevices = async function( error )
    {
        console.log(error);
    }

    let selectDefaultDevice = function()
    {
        for( let i = 0; i < deviceSelect.options.length; i++ )
        {
            let name = deviceSelect.options[i].text.toLowerCase();
            if( name.includes("ndi") || name.includes("obs") )
            {
                continue;
            }

            return i;
        }

        return -1;
    }

    let findStream = async function( deviceId )
    {
        previousConstraints = clone(constraints);
        constraints.video.deviceId = deviceId;
        return getStream();
    }

    let getStream = async function()
    {
        stopStream(video.srcObject);
        return window.navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(errorStream);
    }

    let gotStream = async function( stream )
    {
        video.srcObject = stream;
        dispatchChangeEvent();
    }

    let errorStream = async function( error )
    {
        console.log(error);

        if( previousConstraints )
        {
            constraints = clone(previousConstraints);
            previousConstraints = null;
            getStream();
        }
    }

    let stopStream = async function( stream )
    {
        if( stream )
        {
            stream.getTracks().forEach(track => track.stop());
        }
    }

    init();

    return Object.assign(eventTarget, {
        getElement,
        getValue,
        setValue
    })
}