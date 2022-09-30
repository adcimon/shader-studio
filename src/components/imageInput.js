"use strict";

import { BaseElement } from "./baseElement.js";
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

export class ImageInput extends BaseElement
{
    fileInput = null;
    image = null;
    wrapHorizontalSelect = null;
    wrapVerticalSelect = null;

    constructor()
    {
        super();

        this.state =
        {
            initializing: false
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));

        this.fileInput = this.querySelector("#fileInput");
        this.image = this.querySelector("#image");
        this.wrapHorizontalSelect = this.querySelector("#wrapHorizontalSelect");
        this.wrapVerticalSelect = this.querySelector("#wrapVerticalSelect");

        this.image.addEventListener("load", () =>
        {
            if( !this.state.initializing )
            {
                this.dispatchChangeEvent();
            }

            this.state.initializing = false;
        });

        this.image.addEventListener("error", () =>
        {
            this.state.initializing = false;
        });

        this.fileInput.addEventListener("change", (event) =>
        {
            event.stopPropagation();

            if( event.target.files.length <= 0 )
            {
                return;
            }

            //let fileName = event.target.files[0].name;
            this.image.src = URL.createObjectURL(event.target.files[0]);
        });

        this.image.addEventListener("click", () =>
        {
            let newEvent = new MouseEvent("click",
            {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            this.fileInput.dispatchEvent(newEvent);
        });

        this.wrapHorizontalSelect.addEventListener("change", () =>
        {
            this.dispatchChangeEvent();
        });

        this.wrapVerticalSelect.addEventListener("change", () =>
        {
            this.dispatchChangeEvent();
        });

        this.reset();

        this.setState(this.state);
    }

    getValue()
    {
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
            image,
            wrapHorizontal,
            wrapVertical
        };
    }

    setValue( value )
    {
        this.state.initializing = true;

        if( !value.image.src )
        {
            this.reset();
        }
        else
        {
            this.image.src = value.image.src;
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

    reset()
    {
        this.image.src = "../assets/placeholder_image.png";
        this.wrapHorizontalSelect.selectedIndex = 0;
        this.wrapVerticalSelect.selectedIndex = 0;
    }
}

window.customElements.define("image-input", ImageInput);