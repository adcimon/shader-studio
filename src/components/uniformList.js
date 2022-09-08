"use strict";

import { UniformItem } from './uniformItem.js';

const html = /*html*/
`
<div class="py-4 text-gray-500 dark:text-gray-400">

    <!-- Title -->
    <div class="flex justify-center">
        <span class="text-lg font-bold text-gray-800 dark:text-gray-200 select-none">Uniforms</span>
    </div>

    <!-- Add Button -->
    <div class="px-6 my-4">
        <button
            class="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
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
    var regexp = /^[A-Za-z]\w*$/;
    let list = null;
    let items = { };

    let init = function()
    {
        createElements(html, domElement);
        list = domElement.querySelector("#uniformList");
    }

    let getUniformItem = function( name )
    {
        return items[name];
    }

    let addUniformItem = function( name, type )
    {
        if( !regexp.test(name) )
        {
            return false;
        }

        if( name in items )
        {
            return false;
        }

        let item = UniformItem(name, type);
        items[name] = item;
        list.appendChild(item.getElement());
        window.renderView.addUniform(item);

        return true;
    }

    let deleteUniformItem = function( item )
    {
        let name = item.getName();
        if( !(name in items) )
        {
            return false;
        }

        item.remove();
        delete items[name];
        window.renderView.deleteUniform(item);

        return true;
    }

    init();

    return {
        getUniformItem,
        addUniformItem,
        deleteUniformItem
    }
}