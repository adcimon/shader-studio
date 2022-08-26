"use strict";

import { UniformItem } from './uniformItem.js';

const uniformListHTML = /*html*/
`
<div class="py-4 text-gray-500 dark:text-gray-400">

    <!-- Title -->
    <div class="flex justify-center">
        <span class="text-lg font-bold text-gray-800 dark:text-gray-200 select-none">Uniforms</span>
    </div>

    <!-- Add Button -->
    <div class="px-6 my-4">
        <button
            class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            x-on:click="$store.addModal.open()">
            Add Uniform
        </button>
    </div>

    <!-- List -->
    <ul id="uniformList" class="mt-6">
    </ul>

</div>
`;

export function UniformList( domElement )
{
    let root = null;
    let list = null;
    let items = { };

    let build = function()
    {
        const template = document.createElement("template");
        template.innerHTML = uniformListHTML;
        const fragment = template.content.cloneNode(true);
        root = fragment.firstElementChild;
        domElement.appendChild(root);

        list = root.querySelector("#uniformList");
    }

    let addUniformItem = function( name, type )
    {
        if( !name || !type )
        {
            return;
        }

        if( name in items )
        {
            return;
        }

        let item = UniformItem(name, type);
        items[name] = item;

        list.appendChild(item.getElement());

        window.addModal.close();
    }

    let getUniformItem = function( name )
    {
        return items[name];
    }

    build();

    return {
        addUniformItem,
        getUniformItem
    }
}