"use strict";

import { BaseElement } from "./baseElement.js";
import { } from '../utils/language.js';

export class EditorView extends BaseElement
{
    editor = null;

    constructor()
    {
        super();

        this.state = { };
    }

    connectedCallback()
    {
        this.createEditor();

        this.setState(this.state);
    }

    createEditor()
    {
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorOptions.html
        this.editor = monaco.editor.create(this.parentNode,
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

    getValue()
    {
        return this.editor.getValue();
    }

    setValue( value )
    {
        this.editor.setValue(value);
    }
}

window.customElements.define("editor-view", EditorView);