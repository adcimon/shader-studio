"use strict";

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
</div>
`;

export function WebcamInput( domElement )
{
    let eventTarget = new EventTarget();
    let root = null;
    let video = null;
    let deviceSelect = null;

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

        deviceSelect.addEventListener("change", () =>
        {
            let device = deviceSelect.options[deviceSelect.selectedIndex].value;
            let deviceId = devices[device];
            findStream(deviceId);
        });

        // Find devices and stream on enter the first time.
        if( deviceSelect.selectedIndex === -1 )
        {
            findDevices().then(() =>
            {
                deviceSelect.selectedIndex = 0;
                let device = deviceSelect.options[deviceSelect.selectedIndex].value;
                let deviceId = devices[device];
                findStream(deviceId);
            });
        }
    }

    let getElement = function()
    {
        return root;
    }

    let getValue = function()
    {
        let deviceIndex = deviceSelect.selectedIndex;
        let device = (deviceSelect.selectedIndex in deviceSelect.options) ? deviceSelect.options[deviceSelect.selectedIndex].value : "";
        let deviceId = (device in devices) ? devices[device] : "";

        return {
            deviceIndex:    deviceIndex,
            device:         device,
            deviceId:       deviceId,
            video:          video
        }
    }

    let setValue = function( value )
    {
        // TODO
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
                let label = (info.label === "" ) ? ("Video input " + i) : info.label;
                devices[label] = info.deviceId;
                i++;
            }
        }

        while( deviceSelect.firstChild )
        {
            deviceSelect.removeChild(deviceSelect.lastChild);
        }
    
        for( let device in devices )
        {
            let option = document.createElement("option");
            option.value = device;
            option.text = device;
            deviceSelect.appendChild(option);
        }
    }

    let errorDevices = async function( error )
    {
        console.log(error);
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