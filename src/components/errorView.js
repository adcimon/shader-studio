"use strict";

const html = /*html*/
`
<div
    class="block w-full h-full"
    x-show="$store.errorView.visible">
    <label class="block w-full h-full p-2 text-sm">
        <textarea
            id="errorTextarea"
            class="block w-full h-full resize-none text-sm dark:text-gray-300 dark:bg-gray-700 border-red-600 form-textarea"
            disabled>
        </textarea>
    </label>
</div>
`;

export function ErrorView( domElement )
{
    let errorTextarea = null;

    let init = function()
    {
        const elements = createElements(html, domElement);
        const root = elements[0];
        errorTextarea = root.querySelector("#errorTextarea");
    }

    let show = function()
    {
        this.visible = true;
    }

    let hide = function()
    {
        this.visible = false;
    }

    let setText = function( text )
    {
        window.renderView.hide();
        this.show();

        errorTextarea.value = text;
    }

    init();

    return {
        visible: true,
        show,
        hide,
        setText
    }
}