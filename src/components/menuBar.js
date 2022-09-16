"use strict";

const html = /*html*/
`
<div class="flex items-center justify-start h-full px-6 mx-auto text-purple-600 dark:text-purple-300">

    <!-- Items -->

</div>
`;

export function MenuBar( domElement )
{
    let root = null;

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];
    }

    let addMenuItem = function( item )
    {
        root.appendChild(item.getElement());
    }

    init();

    return {
        addMenuItem
    }
}