"use strict";

import { Icons } from '../utils/icons.js';
import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<li class="relative px-3 py-1">

    <!-- Border -->
    <span
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        x-show="$store.uniformModal.selectedItem && $store.uniformModal.selectedItem.getName() === $el.parentNode.querySelector('#nameLabel').innerText">
    </span>

    <!-- Content -->
    <a
        class="inline-flex items-center w-full p-1 text-sm font-semibold text-gray-800 transition-colors duration-150 rounded-md hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
        href="#"
        x-on:click="$store.uniformModal.open($el.querySelector('#nameLabel').innerText, $el.getBoundingClientRect().left, $el.getBoundingClientRect().top)">
            <!-- Icon -->
            $icon

            <!-- Name -->
            <span
                id="nameLabel"
                class="ml-4">
                Name
            </span>
    </a>

</li>
`;

export function UniformItem( name, type )
{
    let root = null;
    let value = null;

    let init = function()
    {
        const composedHtml = html.replace("$icon", Icons.getTypeIcon(type));
        const elements = createElements(composedHtml);
        root = elements[0];

        const nameLabel = root.querySelector("#nameLabel");
        nameLabel.innerText = name;

        switch( type )
        {
            case "int":         value = 1; break;
            case "float":       value = 1; break;
            case "vec2":        value = [1, 1]; break;
            case "vec3":        value = [1, 1, 1]; break;
            case "vec4":        value = [1, 1, 1, 1]; break;
            case "mat2":        value = [[1, 0], [0, 1]]; break;
            case "mat3":        value = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; break;
            case "mat4":        value = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; break;
            case "color":       value = [1, 1, 1]; break;
            case "image":
            {
                value =
                {
                    image: new Image(2, 2),
                    wrapHorizontal: THREE.ClampToEdgeWrapping,
                    wrapVertical: THREE.ClampToEdgeWrapping
                };
                break;
            }
            default: break;
        }
    }

    let remove = function()
    {
        root.remove();
    }

    let getElement = function()
    {
        return root;
    }

    let getName = function()
    {
        return name;
    }

    let getType = function()
    {
        return type;
    }

    let getValue = function()
    {
        return value;
    }

    let setValue = function( newValue )
    {
        switch( type )
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
                value = newValue;
                break;
            }
            case "image":
            {
                value =
                {
                    image: newValue.image.cloneNode(),
                    wrapHorizontal: newValue.wrapHorizontal,
                    wrapVertical: newValue.wrapVertical
                }
                break;
            }
            default:
            {
                return;
            }
        }
    }

    init();

    return {
        remove,
        getElement,
        getName,
        getType,
        getValue,
        setValue
    }
}