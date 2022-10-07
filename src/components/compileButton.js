"use strict";

import { BaseElement } from "./baseElement.js";
import { Icons } from '../utils/icons.js';

const html = /*html*/
`
<button
    class="flex items-center justify-between mx-4 px-1 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
    x-on:click="click">
        <!-- Icon -->
        $icon
</button>
`;

export class CompileButton extends BaseElement
{
    constructor()
    {
        super();

        this.state =
        {
            click: this.click.bind(this)
        };
    }

    connectedCallback()
    {
        const composedHtml = html.replace("$icon", Icons.compileIcon);
        this.createElement(composedHtml);

        this.setState(this.state);
    }

    click()
    {
        window.renderView.show();
        window.errorView.hide();

        let code = window.editorView.getValue();
        window.renderView.compile(code);
    }
}

window.customElements.define("compile-button", CompileButton);