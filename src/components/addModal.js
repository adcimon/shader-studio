"use strict";

const addModalHTML = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="$store.addModal.isOpen()"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        class="w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="$store.addModal.isOpen()"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0 transform translate-y-1/2"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0 transform translate-y-1/2"
        x-on:click.away="$store.addModal.close()"
        x-on:keydown.escape="$store.addModal.close()">

            <!-- Body -->
            <div class="mt-4 mb-6">
                <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Add Uniform
                </p>

                <!-- Name -->
                <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        x-ref="nameInput"/>
                </label>

                <!-- Type -->
                <label class="block mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Type</span>
                    <select
                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        x-ref="typeSelect">
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
                    x-on:click="$store.addModal.close()">
                    Cancel
                </button>

                <!-- Accept Button -->
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="$store.uniformList.addUniformItem($refs.nameInput.value, $refs.typeSelect.options[$refs.typeSelect.selectedIndex].text)">
                    Accept
                </button>

            </footer>

    </div>

</div>
`;

export function AddModal( domElement )
{
    let root = null;
    let opened = false;

    let build = function()
    {
        const template = document.createElement("template");
        template.innerHTML = addModalHTML;
        const fragment = template.content.cloneNode(true);
        root = fragment.firstElementChild;
        domElement.appendChild(root);
    }

    let isOpen = function()
    {
        return this.opened;
    }

    let open = function()
    {
        this.opened = true;
    }

    let close = function()
    {
        this.opened = false;
    }

    build();

    return {
        isOpen,
        open,
        close
    }
}