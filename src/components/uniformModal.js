"use strict";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="$store.uniformModal.isOpen()"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        id="uniformWindow"
        class="absolute w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="$store.uniformModal.isOpen()"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        x-on:click.away="$store.uniformModal.close()"
        x-on:keydown.escape="$store.uniformModal.close()">

            <!-- Body -->
            <div class="mt-1 mb-6">

                <!-- Type -->
                <div class="mb-4">
                    <span
                        id="typeLabel"
                        class="px-1 text-xs text-purple-600 border-2 rounded border-purple-600 select-none">
                        Type
                    </span>
                </div>

                <!-- Value -->
                <div class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Value</span>
                        <input
                            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            type="number"
                            value="1.0"
                            step="0.1"/>
                    </label>
                </div>

                <!-- Color -->
                <div class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Color</span>
                        <input
                            class="block w-full mt-1 text-sm rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                            type="color"
                            value="#ffffff"/>
                    </label>
                </div>

            </div>

            <!-- Footer -->
            <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-300 dark:bg-gray-800">
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="$store.uniformModal.close()">
                    Close
                </button>
            </footer>

    </div>

</div>
`;

export function UniformModal( domElement )
{
    let uniformWindow = null;
    let typeLabel = null;

    let opened = false;
    let selectedItem = null;

    let init = function()
    {
        createElements(html, domElement);
        uniformWindow = domElement.querySelector("#uniformWindow");
        typeLabel = domElement.querySelector("#typeLabel");
    }

    let getSelectedItem = function()
    {
        return this.selectedItem;
    }

    let setPosition = function( x, y )
    {
        uniformWindow.style.left = (x - 10) + "px";
        uniformWindow.style.top = (y + 20) + "px";
    }

    let resetPosition = function()
    {
        uniformWindow.style.left = "50%";
        uniformWindow.style.top = "50%";
    }

    let isOpen = function()
    {
        return this.opened;
    }

    let open = function( name, x, y )
    {
        let item = window.uniformList.getUniformItem(name);
        if( !item )
        {
            return;
        }

        this.selectedItem = item;
        console.log("Selected: " + this.selectedItem.getName());

        typeLabel.innerText = this.selectedItem.getType();
        this.setPosition(x, y);

        this.opened = true;
    }

    let close = function()
    {
        this.opened = false;
        this.selectedItem = null;
    }

    init();

    return {
        getSelectedItem,
        setPosition,
        resetPosition,
        isOpen,
        open,
        close
    }
}