"use strict";

import { BaseElement } from "./baseElement.js";
import { Icons } from '../utils/icons.js';
import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<li class="relative px-3 py-1">

    <!-- Border -->
    <span
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        x-show="selected">
    </span>

    <!-- Content -->
    <a
        class="inline-flex items-center w-full p-1 text-sm font-semibold text-gray-800 transition-colors duration-150 rounded-md hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
        href="#"
        x-on:click="click">
            <!-- Icon -->
            $icon

            <!-- Name -->
            <span
                class="ml-4"
                x-text="name">
            </span>
    </a>

</li>
`;

export class UniformItem extends BaseElement
{
    image = new Image(2, 2);
    video = null;

    constructor()
    {
        super();

        this.video = document.createElement("video");
        this.video.autoplay = true;
        this.video.loop = true;
        this.video.muted = true;
        this.video.playsinline = true;
        this.video.hidden = true;

        this.state =
        {
            name: "",
            type: "",
            value: null,
            selected: false,
            click: this.click.bind(this)
        };
    }

    connectedCallback()
    {
        const composedHtml = html.replace("$icon", Icons.getTypeIcon(this.state.type));
        this.createElement(composedHtml);

        this.querySelector("li").appendChild(this.video);

        this.setState(this.state);
    }

    getName()
    {
        return this.state.name;
    }

    getType()
    {
        return this.state.type;
    }

    getValue()
    {
        return this.state.value;
    }

    setName( name )
    {
        this.state.name = name;
    }

    setType( type )
    {
        this.state.type = type;
        this.resetValue();
    }

    setValue( newValue )
    {
        switch( this.state.type )
        {
            case "int":
            case "float":
            case "vec2":
            case "vec3":
            case "vec4":
            case "mat2":
            case "mat3":
            case "mat4":
            case "color":
            {
                this.state.value = newValue;
                break;
            }
            case "image":
            {
                this.image = newValue.image.cloneNode();

                this.state.value =
                {
                    image:              this.image,
                    wrapHorizontal:     newValue.wrapHorizontal,
                    wrapVertical:       newValue.wrapVertical
                };

                break;
            }
            case "webcam":
            {
                this.video.srcObject = newValue.video.srcObject;

                this.state.value =
                {
                    device:             { id: newValue.device.id, index: newValue.device.index, name: newValue.device.name },
                    wrapHorizontal:     newValue.wrapHorizontal,
                    wrapVertical:       newValue.wrapVertical,
                    video:              this.video
                };

                break;
            }
            default:
            {
                return;
            }
        }
    }

    resetValue()
    {
        switch( this.state.type )
        {
            case "int":         this.state.value = 1; break;
            case "float":       this.state.value = 1; break;
            case "vec2":        this.state.value = [1, 1]; break;
            case "vec3":        this.state.value = [1, 1, 1]; break;
            case "vec4":        this.state.value = [1, 1, 1, 1]; break;
            case "mat2":        this.state.value = [[1, 0], [0, 1]]; break;
            case "mat3":        this.state.value = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; break;
            case "mat4":        this.state.value = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; break;
            case "color":       this.state.value = [1, 1, 1]; break;
            case "image":
            {
                this.state.value =
                {
                    image:              this.image,
                    wrapHorizontal:     THREE.ClampToEdgeWrapping,
                    wrapVertical:       THREE.ClampToEdgeWrapping
                };

                break;
            }
            case "webcam":
            {
                this.state.value =
                {
                    device:             { id: "", index: -1, name: ""},
                    wrapHorizontal:     THREE.ClampToEdgeWrapping,
                    wrapVertical:       THREE.ClampToEdgeWrapping,
                    video:              this.video
                };

                break;
            }
        }
    }

    click()
    {
        window.uniformModal.open(this.state.name, this.getBoundingClientRect().left, this.getBoundingClientRect().top);
    }

    select()
    {
        this.state.selected = true;
    }

    deselect()
    {
        this.state.selected = false;
    }
}

window.customElements.define("uniform-item", UniformItem);