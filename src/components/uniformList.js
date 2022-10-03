"use strict";

import { BaseElement } from "./baseElement.js";
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
            x-on:click="openAddModal">
            Add Uniform
        </button>
    </div>

    <!-- List -->
    <ul
        id="list"
        class="mt-6">
    </ul>

</div>
`;

export class UniformList extends BaseElement
{
    regexp = /^[A-Za-z]\w*$/;
    list = null;

    constructor()
    {
        super();

        this.state =
        {
            items: { },
            openAddModal: this.openAddModal.bind(this)
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));

        this.list = this.querySelector("#list");

        this.setState(this.state);
    }

    openAddModal()
    {
        window.addModal.open();
    }

    getUniformItem( name )
    {
        return this.state.items[name];
    }

    addUniformItem( name, type )
    {
        if( !this.regexp.test(name) )
        {
            return false;
        }

        if( name in this.state.items )
        {
            return false;
        }

        let item = new UniformItem();
        item.setName(name);
        item.setType(type);

        const added = window.renderView.addUniform(item);
        if( added )
        {
            this.state.items[name] = item;
            this.list.appendChild(item);
        }

        return added;
    }

    deleteUniformItem( item )
    {
        let name = item.getName();
        if( !(name in this.state.items) )
        {
            return false;
        }

        const deleted = window.renderView.deleteUniform(item);
        if( deleted )
        {
            this.state.items[name].remove();
            delete this.state.items[name];
        }

        return deleted;
    }
}

window.customElements.define("uniform-list", UniformList);