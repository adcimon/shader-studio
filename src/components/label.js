"use strict";

const html = /*html*/
`
<div
    class="text-base text-gray-800 dark:text-gray-200">
    Text
</div>
`;

export function Label( domElement )
{
    let root = null;

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];
    }

    let getElement = function()
    {
        return root;
    }

    let setText = function( text )
    {
        root.innerText = text;
    }

    init();

    return {
        getElement,
        setText
    }
}