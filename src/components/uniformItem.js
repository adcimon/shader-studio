"use strict";

import { getTypeIcon } from '../utils/icons.js';

const uniformItemHTML = /*html*/
`
<li class="relative px-3 py-1">

    <!-- Border -->
    <span
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        x-show="$store.uniformModal.getSelectedItem() && $store.uniformModal.getSelectedItem().getName() === $el.parentNode.querySelector('#nameLabel').innerText">
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

    let build = function()
    {
        const template = document.createElement("template");
        template.innerHTML = uniformItemHTML.replace("$icon", getTypeIcon(type));
        const fragment = template.content.cloneNode(true);
        root = fragment.firstElementChild;

        let nameLabel = root.querySelector("#nameLabel");
        nameLabel.innerText = name;
    }

    let getName = function()
    {
        return name;
    }

    let getType = function()
    {
        return type;
    }

    let getElement = function()
    {
        return root;
    }

    build();

    return {
        getElement,
        getName,
        getType
    }
}