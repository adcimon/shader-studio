"use strict";

const scalarIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"></path>
</svg>
`;

const vectorIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path id="svg_1" d="m17,9l0,6m-3,-3l6,0m-14,3l2,0a2,2 0 0 0 2,-2l0,-2a2,2 0 0 0 -2,-2l-2,0a2,2 0 0 0 -2,2l0,2a2,2 0 0 0 2,2z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
`;

const matrixIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
</svg>
`;

const colorIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
</svg>
`;

const imageIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
</svg>
`;

const webcamIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
</svg>
`;

const defaultIcon = /*html*/
`
<svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
`;

/**
 * Get the corresponding svg icon.
 * Reference: https://heroicons.dev/
 */
export function getTypeIcon( type )
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