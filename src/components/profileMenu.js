'use strict';

import { BaseElement } from './baseElement.js';

const html =
	/*html*/
	`
<ul class="flex items-center flex-shrink-0 space-x-6">
    <li class="relative">

        <span class="mr-2 font-bold" x-text="$store.app.getUser()"></span>

        <!-- Button -->
        <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none border-2 border-purple-600 dark:border-purple-300"
            x-on:click="toggle"
            x-on:keydown.escape="fold">
            <!--
            <img
                class="object-cover w-8 h-8 rounded-full"
                x-bind:src="$store.app.getAvatar()"/>
            -->
            <img
                class="object-cover w-8 h-8 rounded-full"
                src="../assets/favicon/favicon_128x128.png"/>
        </button>

        <!-- Menu -->
        <ul
            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-gray-300 border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
            x-show="!folded"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            x-on:click.away="fold"
            x-on:keydown.escape="fold">

            <!-- Theme -->
            <li class="flex">
                <a
                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                    x-on:click="theme">
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

            <!-- About -->
            <li class="flex">
                <a
                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                    x-on:click="about">
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

            <!-- Help -->
            <li class="flex">
                <a
                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                    x-on:click="help">
                    <svg
                        class="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Help</span>
                </a>
            </li>

        </ul>

    </li>
</ul>
`;

export class ProfileMenu extends BaseElement {
	constructor() {
		super();

		this.state = {
			folded: true,
			toggle: this.toggle.bind(this),
			fold: this.fold.bind(this),
			theme: this.theme.bind(this),
			about: this.about.bind(this),
			help: this.help.bind(this),
		};
	}

	connectedCallback() {
		this.createElement(html);
		this.classList.add('ml-auto');
		this.setState(this.state);
		window.profileMenu = this;
	}

	toggle() {
		this.state.folded = !this.state.folded;
	}

	fold() {
		this.state.folded = true;
	}

	theme() {
		window.app.toggleTheme();
	}

	about() {
		this.fold();
		window.aboutModal.open();
	}

	help() {
		this.fold();
		window.helpModal.open();
	}
}

window.customElements.define('profile-menu', ProfileMenu);
