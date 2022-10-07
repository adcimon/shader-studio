"use strict";

import { BaseElement } from "./baseElement.js";

const html = /*html*/
`
<div
    class="block w-full h-full"
    x-show="visible">

    <label class="block w-full h-full p-2 text-sm">
        <textarea
            class="block w-full h-full resize-none text-sm dark:text-gray-300 dark:bg-gray-700 border-red-600 form-textarea"
            disabled>
        </textarea>
    </label>

</div>
`;

export class ErrorView extends BaseElement
{
    textarea = null;

    constructor()
    {
        super();

        this.state =
        {
            visible: false,
            show: this.show.bind(this),
            hide: this.hide.bind(this)
        };
    }

    connectedCallback()
    {
        this.createElement(html);

        this.textarea = this.querySelector("textarea");

        this.setState(this.state);
    }

    show()
    {
        this.state.visible = true;
    }

    hide()
    {
        this.state.visible = false;
    }

    setText( text )
    {
        window.renderView.hide();
        this.show();

        this.textarea.value = text;
    }
}

window.customElements.define("error-view", ErrorView);