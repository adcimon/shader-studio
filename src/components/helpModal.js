"use strict";

import { BaseElement } from "./baseElement.js";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="opened"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        class="w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="opened"
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
                <div class="flex items-center justify-start w-full">
                    <!-- Title -->
                    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Help
                    </p>
                </div>

                <!-- Description -->
                <p class="text-sm text-gray-700 dark:text-gray-400">
                    Uniforms can be added to the shader via the Uniform List on the left side. A set of common used uniforms are provided by default.
                </p>
                <br>

                <!-- Uniforms -->
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                        <table class="w-full whitespace-no-wrap">

                            <thead>
                                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th class="px-4 py-3">Name</th>
                                    <th class="px-4 py-3">Type</th>
                                    <th class="px-4 py-3">Description</th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                <!-- Time -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">time</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        float
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        Time in seconds.
                                    </td>
                                </tr>

                                <!-- Resolution -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">resolution</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        vec2
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        Canvas resolution in pixels.
                                    </td>
                                </tr>

                                <!-- Mouse -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">mouse</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        vec2
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        Mouse pixel coordinates.
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <!-- Separator -->
                    <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-300 dark:bg-gray-800">
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="close">
                    Close
                </button>
            </footer>

    </div>

</div>
`;

export class HelpModal extends BaseElement
{
    constructor()
    {
        super();

        this.state =
        {
            opened: false,
            close: this.close.bind(this)
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));

        this.setState(this.state);
    }

    open()
    {
        this.state.opened = true;
    }

    close()
    {
        this.state.opened = false;
    }
}

window.customElements.define("help-modal", HelpModal);