"use strict";

import { CompileIcon } from '../utils/icons.js';

const html = /*html*/
`
<button
    class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
    <!-- Icon -->
    $icon
</button>
`;

export function CompileButton( domElement )
{
    let init = function()
    {
        const composedHtml = html.replace("$icon", CompileIcon);
        const elements = createElements(composedHtml, domElement);
        const button = elements[0];
        button.addEventListener("click", click);
    }

    let click = function()
    {
        let code = window.editorView.getValue();
        window.renderView.setShader(code);
    }

    init();

    return {
    }
}