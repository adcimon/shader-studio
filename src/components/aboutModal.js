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
                <div class="flex items-center justify-start w-full">
                    <!-- Title -->
                    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        About
                    </p>

                    <!-- Version -->
                    <div class="mb-4 ml-auto">
                        <span
                            class="px-1 text-xs text-purple-600 border-2 rounded border-purple-600 select-none">
                            1.0.0
                        </span>
                    </div>
                </div>

                <!-- Description -->
                <p class="text-sm text-gray-700 dark:text-gray-400">
                    Thank you for using Shader Studio!
                </p>
                <br>

                <!-- Made With -->
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                        <table class="w-full whitespace-no-wrap">

                            <thead>
                                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th class="px-4 py-3">Made With</th>
                                    <th class="px-4 py-3">Version</th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                <!-- Node -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">Node</p>
                                        </div>
                                    </td>
                                    <td
                                        id="nodeLabel"
                                        class="px-4 py-3 text-sm">
                                        X.Y.Z
                                    </td>
                                </tr>

                                <!-- Chrome -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">Chrome</p>
                                        </div>
                                    </td>
                                    <td
                                        id="chromeLabel"
                                        class="px-4 py-3 text-sm">
                                        X.Y.Z
                                    </td>
                                </tr>

                                <!-- Electron -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">Electron</p>
                                        </div>
                                    </td>
                                    <td
                                        id="electronLabel"
                                        class="px-4 py-3 text-sm">
                                        X.Y.Z
                                    </td>
                                </tr>

                                <!-- Alpine -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">Alpine</p>
                                        </div>
                                    </td>
                                    <td
                                        class="px-4 py-3 text-sm">
                                        3.10.3
                                    </td>
                                </tr>

                                <!-- Monaco -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">Monaco</p>
                                        </div>
                                    </td>
                                    <td
                                        class="px-4 py-3 text-sm">
                                        0.34.0
                                    </td>
                                </tr>

                                <!-- THREE -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <p class="font-semibold">THREE</p>
                                        </div>
                                    </td>
                                    <td
                                        class="px-4 py-3 text-sm">
                                        143
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <!-- Separator -->
                    <div class="grid px-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    </div>
                </div>
            </div>

            <!-- Star -->
            <div class="text-sm text-gray-700 dark:text-gray-400">
                <a
                    class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                    href="https://github.com/adcimon/shader-studio"
                    target="popup">
                    <div class="flex items-center">
                        <svg
                            class="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span>Star this project on GitHub</span>
                    </div>
                </a>
            </div>
            <br>

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

export class AboutModal extends BaseElement
{
    nodeLabel = null;
    chromeLabel = null;
    electronLabel = null;

    constructor()
    {
        super();

        this.state =
        {
            close: this.close.bind(this)
        };
    }

    connectedCallback()
    {
        this.createElement(html);

        this.nodeLabel = this.querySelector("#nodeLabel");
        this.chromeLabel = this.querySelector("#chromeLabel");
        this.electronLabel = this.querySelector("#electronLabel");

        this.setState(this.state);

        this.hide();
    }

    open()
    {
        this.show();
    }

    close()
    {
        this.hide();
    }

    updateVersions( versions )
    {
        this.nodeLabel.innerText = versions.node;
        this.chromeLabel.innerText = versions.chrome;
        this.electronLabel.innerText = versions.electron;
    }
}

window.customElements.define("about-modal", AboutModal);