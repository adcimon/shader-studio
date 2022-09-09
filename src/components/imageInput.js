"use strict";

import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<div class="flex flex-col items-center justify-center px-2 py-4">
    <input
        id="fileInput"
        type="file"
        accept="image/*"
        hidden>

    <img
        id="image"
        class="cursor-pointer"
        style="height: 200px;"/>

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

export function ImageInput( domElement )
{
    let eventTarget = new EventTarget();
    let root = null;

    let fileInput = null;
    let image = null;
    let wrapHorizontalSelect = null;
    let wrapVerticalSelect = null;

    let fileName = "";

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];

        fileInput = root.querySelector("#fileInput");
        image = root.querySelector("#image");
        wrapHorizontalSelect = root.querySelector("#wrapHorizontalSelect");
        wrapVerticalSelect = root.querySelector("#wrapVerticalSelect");

        image.addEventListener("load", () =>
        {
            dispatchChangeEvent();
        });

        fileInput.addEventListener("change", (event) =>
        {
            if( event.target.files.length <= 0 )
            {
                return;
            }

            fileName = event.target.files[0].name;
            image.src = URL.createObjectURL(event.target.files[0]);
        });

        image.addEventListener("click", () =>
        {
            let newEvent = new MouseEvent("click",
            {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            fileInput.dispatchEvent(newEvent);
        });

        wrapHorizontalSelect.addEventListener("change", () =>
        {
            dispatchChangeEvent();
        });

        wrapVerticalSelect.addEventListener("change", () =>
        {
            dispatchChangeEvent();
        });

        reset();
    }

    let getElement = function()
    {
        return root;
    }

    let getValue = function()
    {
        let wrapHorizontal = THREE.ClampToEdgeWrapping;
        switch( wrapHorizontalSelect.selectedIndex )
        {
            case 0: wrapHorizontal = THREE.ClampToEdgeWrapping; break;
            case 1: wrapHorizontal = THREE.RepeatWrapping; break;
            case 2: wrapHorizontal = THREE.MirroredRepeatWrapping; break;
            default: wrapHorizontal = THREE.ClampToEdgeWrapping; break;
        }

        let wrapVertical = THREE.ClampToEdgeWrapping;
        switch( wrapVerticalSelect.selectedIndex )
        {
            case 0: wrapVertical = THREE.ClampToEdgeWrapping; break;
            case 1: wrapVertical = THREE.RepeatWrapping; break;
            case 2: wrapVertical = THREE.MirroredRepeatWrapping; break;
            default: wrapVertical = THREE.ClampToEdgeWrapping; break;
        }

        return {
            image,
            fileName,
            wrapHorizontal,
            wrapVertical
        };
    }

    let dispatchChangeEvent = function()
    {
        let newEvent = new CustomEvent("change", { detail: { value: getValue() }});
        eventTarget.dispatchEvent(newEvent);
    }

    let reset = function()
    {
        image.src = "../assets/placeholder_image.png";
    }

    init();

    return Object.assign(eventTarget, {
        getElement,
        getValue,
        reset
    })
}