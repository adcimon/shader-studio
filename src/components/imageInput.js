"use strict";

const html = /*html*/
`
<div class="flex items-center justify-center px-2 py-4">
    <input
        id="fileInput"
        type="file"
        accept="image/*"
        hidden>
    <img
        id="image"
        class="cursor-pointer"
        style="height: 200px;"/>
</div>
`;

export function ImageInput( domElement )
{
    let eventTarget = new EventTarget();
    let root = null;

    let fileInput = null;
    let image = null;

    let fileName = "";

    let init = function()
    {
        const elements = createElements(html, domElement);
        root = elements[0];

        fileInput = root.querySelector("#fileInput");
        image = root.querySelector("#image");

        image.addEventListener("load", () =>
        {
            let newEvent = new CustomEvent("change", { detail: { value: getValue() }});
            eventTarget.dispatchEvent(newEvent);
        });

        fileInput.addEventListener("change", (event) =>
        {
            if( event.target.files.length <= 0 )
            {
                return;
            }

            fileName = event.target.files[0].name;
            image.src = URL.createObjectURL(event.target.files[0]);
        });

        image.addEventListener("click", () =>
        {
            let newEvent = new MouseEvent("click",
            {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            fileInput.dispatchEvent(newEvent);
        });

        reset();
    }

    let getElement = function()
    {
        return root;
    }

    let getValue = function()
    {
        return { image, fileName };
    }

    let reset = function()
    {
        image.src = "../assets/placeholder_image.png";
    }

    init();

    return Object.assign(eventTarget, {
        getElement,
        getValue,
        reset
    })
}