"use strict";

import { Icons } from '../utils/icons.js';

const html = /*html*/
`
<button
    class="flex items-center justify-between mx-4 px-1 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
        <!-- Icon -->
        $icon
</button>
`;

export function CompileButton( domElement )
{
    let root = null;

    let init = function()
    {
        const composedHtml = html.replace("$icon", Icons.compileIcon);
        const elements = createElements(composedHtml, domElement);
        root = elements[0];

        const button = root;
        button.addEventListener("click", click);
    }

    let getElement = function()
    {
        return root;
    }

    let click = function()
    {
        window.renderView.show();
        window.errorView.hide();

        let code = window.editorView.getValue();
        window.renderView.compile(code);
    }

    init();

    return {
        getElement
    }
}