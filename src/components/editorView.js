"use strict";

import { } from '../utils/language.js';

export function EditorView( domElement )
{
    let editor = null;

    let init = function()
    {
        editor = monaco.editor.create(domElement,
        {
            automaticLayout: true,
            horizontal: "auto",
            language: "glsl",
            lineHeight: 19,
            lineNumbers: "on",
            minimap: { enabled: true },
            readOnly: false,
            scrollBeyondLastLine: true,
            theme: "vs-dark",
            vertical: "auto"
        });
    }

    let getValue = function()
    {
        return editor.getValue();
    }

    let setValue = function( value )
    {
        editor.setValue(value);
    }

    init();

    return {
        getValue,
        setValue
    }
}