"use strict";

import { BaseElement } from "./baseElement.js";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="visible"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        class="w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="visible"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0 transform translate-y-1/2"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0 transform translate-y-1/2"
        x-on:click.away="close"
        x-on:keydown.escape="close">

            <!-- Body -->
            <div class="mt-4 mb-6">
                <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Add Uniform
                </p>

                <!-- Name -->
                <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        id="nameInput"
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"/>
                    <span id="invalidLabel" class="text-xs text-red-600 dark:text-red-400">Invalid name.</span>
                </label>

                <!-- Type -->
                <label class="block mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Type</span>
                    <select
                        id="typeSelect"
                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                            <option>int</option>
                            <option>float</option>
                            <option>vec2</option>
                            <option>vec3</option>
                            <option>vec4</option>
                            <option>mat2</option>
                            <option>mat3</option>
                            <option>mat4</option>
                            <option>color</option>
                            <option>image</option>
                            <option>webcam</option>
                    </select>
                </label>
            </div>

            <!-- Footer -->
            <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-300 dark:bg-gray-800">

                <!-- Cancel Button -->
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    x-on:click="close">
                    Cancel
                </button>

                <!-- Accept Button -->
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="accept">
                    Accept
                </button>

            </footer>

    </div>

</div>
`;

export class AddModal extends BaseElement
{
    nameInput = null;
    invalidLabel = null;
    typeSelect = null;

    constructor()
    {
        super();

        this.state =
        {
            accept: this.accept.bind(this),
            close: this.close.bind(this)
        };
    }

    connectedCallback()
    {
        this.createElement(html);

        this.nameInput = this.querySelector("#nameInput");
        this.invalidLabel = this.querySelector("#invalidLabel");
        this.invalidLabel.hide();
        this.typeSelect = this.querySelector("#typeSelect");

        this.setState(this.state);
        this.hide();
        window.addModal = this;
    }

    open()
    {
        this.nameInput.value = "";
        this.typeSelect.selectedIndex = 0;
        this.invalidLabel.hide();
        this.show();
    }

    close()
    {
        this.hide();
    }

    accept()
    {
        let name = this.nameInput.value;
        let type = this.typeSelect.options[this.typeSelect.selectedIndex].text;

        if( !window.uniformList.addUniformItem(name, type) )
        {
            this.invalidLabel.show();
            return;
        }

        window.addModal.close();
    }
}

window.customElements.define("add-modal", AddModal);