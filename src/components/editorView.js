"use strict";

export function EditorView( domElement )
{
    let editor = null;

    let build = function()
    {
        editor = monaco.editor.create(domElement,
        {
            automaticLayout: true,
            horizontal: "auto",
            language: "javascript",
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

    build();

    return {
        getValue,
        setValue
    }
}