"use strict";

const html = /*html*/
`
<ul class="flex items-center flex-shrink-0 space-x-6">
    <li class="relative">

        <span class="mr-2 font-bold" x-text="$store.app.getUser()"></span>

        <!-- Button -->
        <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none border-2 border-purple-600 dark:border-purple-300"
            x-on:click="$store.profileMenu.toggle()"
            x-on:keydown.escape="$store.profileMenu.close()"
            aria-label="Profile"
            aria-haspopup="true">
            <img
                class="object-cover w-8 h-8 rounded-full"
                x-bind:src="$store.app.getAvatar()"/>
        </button>

        <!-- Menu -->
        <ul
            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-gray-300 border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
            x-show="$store.profileMenu.isOpen()"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            x-on:click.away="$store.profileMenu.close()"
            x-on:keydown.escape="$store.profileMenu.close()">

            <!-- About -->
            <li class="flex">
                <a
                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                    x-on:click="$store.profileMenu.close(); $store.aboutModal.open()">
                    <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>About</span>
                </a>
            </li>

            <!-- Theme -->
            <li class="flex">
                <a
                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                    aria-label="Toggle Theme"
                    x-on:click="$store.app.toggleTheme()">
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        x-show="$store.app.theme === 'light'">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        x-show="$store.app.theme === 'dark'">
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Theme</span>
                </a>
            </li>

        </ul>

    </li>
</ul>
`;

export function ProfileMenu( domElement )
{
    let opened = false;

    let init = function()
    {
        createElements(html, domElement);
    }

    let isOpen = function()
    {
        return this.opened;
    }

    let toggle = function()
    {
        this.opened = !this.opened;
    }

    let close = function()
    {
        this.opened = false;
    }

    init();

    return {
        isOpen,
        toggle,
        close
    }
}