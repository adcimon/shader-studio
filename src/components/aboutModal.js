"use strict";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="$store.aboutModal.opened"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        class="w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="$store.aboutModal.opened"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0 transform translate-y-1/2"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0 transform translate-y-1/2"
        x-on:click.away="$store.aboutModal.close()"
        x-on:keydown.escape="$store.aboutModal.close()">

            <!-- Body -->
            <div class="mt-4 mb-6">

                <!-- Title -->
                <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    About
                </p>

                <!-- Description -->
                <p class="text-sm text-gray-700 dark:text-gray-400">
                    Thank you for using Shader Studio!
                </p>
                <br>

                <!-- Technologies -->
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                        <table class="w-full whitespace-no-wrap">

                            <thead>
                                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th class="px-4 py-3">Technology</th>
                                    <th class="px-4 py-3">Version</th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                                <!-- Node -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <div>
                                                <p class="font-semibold">Node</p>
                                            </div>
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
                                            <div>
                                                <p class="font-semibold">Chrome</p>
                                            </div>
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
                                            <div>
                                                <p class="font-semibold">Electron</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        id="electronLabel"
                                        class="px-4 py-3 text-sm">
                                        X.Y.Z
                                    </td>
                                </tr>

                                <!-- Monaco -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <div>
                                                <p class="font-semibold">Monaco</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        id="monacoLabel"
                                        class="px-4 py-3 text-sm">
                                        0.34.0
                                    </td>
                                </tr>

                                <!-- THREE -->
                                <tr class="text-gray-700 dark:text-gray-400">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                            <div>
                                                <p class="font-semibold">THREE</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        id="threeLabel"
                                        class="px-4 py-3 text-sm">
                                        X.Y.Z
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
                    x-on:click="$store.aboutModal.close()">
                    Close
                </button>
            </footer>

    </div>

</div>
`;

export function AboutModal( domElement )
{
    let root = null;

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];
    }

    let open = function()
    {
        this.opened = true;
    }

    let close = function()
    {
        this.opened = false;
    }

    let updateVersions = function( versions )
    {
        let nodeLabel = root.querySelector("#nodeLabel");
        nodeLabel.innerText = versions.node;

        let chromeLabel = root.querySelector("#chromeLabel");
        chromeLabel.innerText = versions.chrome;

        let electronLabel = root.querySelector("#electronLabel");
        electronLabel.innerText = versions.electron;

        let threeLabel = root.querySelector("#threeLabel");
        threeLabel.innerText = versions.three;
    }

    init();

    return {
        opened: false,
        open,
        close,
        updateVersions
    }
}