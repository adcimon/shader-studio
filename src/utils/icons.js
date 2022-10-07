"use strict";

/*
|--------------------------------------------------------------------------
| Reference
|--------------------------------------------------------------------------
|
| https://heroicons.dev/
|
*/

const defaultIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
    </path>
</svg>
`;

const scalarIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8">
    </path>
</svg>
`;

const vectorIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        d="m17,9l0,6m-3,-3l6,0m-14,3l2,0a2,2 0 0 0 2,-2l0,-2a2,2 0 0 0 -2,-2l-2,0a2,2 0 0 0 -2,2l0,2a2,2 0 0 0 2,2z"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round">
    </path>
</svg>
`;

const matrixIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
    </path>
</svg>
`;

const colorIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
    </path>
</svg>
`;

const imageIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
    </path>
</svg>
`;

const webcamIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
    </path>
</svg>
`;

const compileIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke-width="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z">
    </path>
</svg>
`;

const saveIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4">
    </path>
</svg>
`;

const deleteIcon = /*html*/
`
<svg
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z">
    </path>
</svg>
`;

/**
 * Get the corresponding svg icon for each uniform item type.
 */
function getTypeIcon( type )
{
    switch( type )
    {
        case "int":
        case "float":   return scalarIcon;
        case "vec2":
        case "vec3":
        case "vec4":    return vectorIcon;
        case "mat2":
        case "mat3":
        case "mat4":    return matrixIcon;
        case "color":   return colorIcon;
        case "image":   return imageIcon;
        case "webcam":  return webcamIcon;
        default:        return defaultIcon;
    }
}

export const Icons =
{
    defaultIcon,
    scalarIcon,
    vectorIcon,
    matrixIcon,
    colorIcon,
    imageIcon,
    webcamIcon,
    compileIcon,
    saveIcon,
    deleteIcon,
    getTypeIcon
}