"use strict";

import { BinIcon } from '../.././icons.js';
import { hexToRgb, uuid } from '../../utils.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/styles/input.css">
<link type="text/css" rel="stylesheet" href="./src/styles/select.css">
<link type="text/css" rel="stylesheet" href="./src/component/uniformItem/style.css">
`;

const html =
`
<select id="typeSelect">
    <option value="int">int</option>
    <option value="float" selected>float</option>
    <option value="vec2">vec2</option>
    <option value="vec3">vec3</option>
    <option value="vec4">vec4</option>
    <option value="mat2">mat2</option>
    <option value="mat3">mat3</option>
    <option value="mat4">mat4</option>
    <option value="color">color</option>
    <option value="image">image</option>
    <option value="webcam">webcam</option>
</select>

<input id="nameInput" type="text" placeholder="name"></input>
<input id="valueInput" type="number" value="1.0" step="0.1"></input>
<matrix-input id="matrixInput" hidden></matrix-input>
<input id="colorInput" type="color" value="#ffffff" hidden></input>
<image-input id="imageInput" hidden></image-input>
<webcam-input id="webcamInput" hidden></webcam-input>

<button id="removeButton">
    ${BinIcon}
</button>
`;

export class UniformItem extends HTMLElement
{
    uuid = null;
    typeSelect = null;
    nameInput = null;
    valueInput = null;
    matrixInput = null;
    colorInput = null;
    imageInput = null;
    webcamInput = null;
    removeButton = null;

    constructor()
    {
        super();

        const template = document.createElement("template");
        template.innerHTML = css + html;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.uuid = uuid();
    }

    connectedCallback()
    {
        this.typeSelect = this.shadowRoot.querySelector("#typeSelect");
        this.nameInput = this.shadowRoot.querySelector("#nameInput");
        this.valueInput = this.shadowRoot.querySelector("#valueInput");
        this.matrixInput = this.shadowRoot.querySelector("#matrixInput");
        this.colorInput = this.shadowRoot.querySelector("#colorInput");
        this.imageInput = this.shadowRoot.querySelector("#imageInput");
        this.webcamInput = this.shadowRoot.querySelector("#webcamInput");
        this.removeButton = this.shadowRoot.querySelector("#removeButton");

        this.typeSelect.addEventListener("change", this.dispatchTypeChange.bind(this));
        this.valueInput.addEventListener("change", this.dispatchValueChange.bind(this));
        this.matrixInput.addEventListener("valuechange", this.dispatchValueChange.bind(this));
        this.matrixInput.addEventListener("click", this.dispatchClickMatrixInput.bind(this));
        this.colorInput.addEventListener("change", this.dispatchValueChange.bind(this));
        this.imageInput.addEventListener("valuechange", this.dispatchValueChange.bind(this));
        this.webcamInput.addEventListener("valuechange", this.dispatchValueChange.bind(this));
        this.removeButton.addEventListener("click", this.dispatchRemoveUniform.bind(this));

        this.nameInput.focus();
    }

    disconnectedCallback()
    {
    }

    getUuid()
    {
        return this.uuid;
    }

    getType()
    {
        return this.typeSelect.value;
    }

    getName()
    {
        return this.nameInput.value;
    }

    getValue()
    {
        switch( this.typeSelect.value )
        {
            case "int":
            case "float":       return this.valueInput.value;
            case "vec2":        return this.matrixInput.getVector2();
            case "vec3":        return this.matrixInput.getVector3();
            case "vec4":        return this.matrixInput.getVector4();
            case "mat2":        return this.matrixInput.getMatrix2x2();
            case "mat3":        return this.matrixInput.getMatrix3x3();
            case "mat4":        return this.matrixInput.getMatrix4x4();
            case "color":       return hexToRgb(this.colorInput.value);
            case "image":       return this.imageInput.getValue();
            case "webcam":      return this.webcamInput.getValue();
        }
    }

    dispatchTypeChange()
    {
        let type = this.typeSelect.value;

        switch( type )
        {
            case "int":
            {
                this.valueInput.hidden = false;
                this.matrixInput.hidden = true;
                this.colorInput.hidden = true;
                this.webcamInput.hidden = true;
                this.imageInput.hidden = true;
                this.valueInput.step = 1;
                this.valueInput.value = Math.floor(this.valueInput.value);
                break;
            }
            case "float":
            {
                this.valueInput.hidden = false;
                this.matrixInput.hidden = true;
                this.colorInput.hidden = true;
                this.webcamInput.hidden = true;
                this.imageInput.hidden = true;
                this.valueInput.step = 0.1;
                break;
            }
            case "vec2":
            case "vec3":
            case "vec4":
            case "mat2":
            case "mat3":
            case "mat4":
            {
                this.valueInput.hidden = true;
                this.matrixInput.hidden = false;
                this.colorInput.hidden = true;
                this.webcamInput.hidden = true;
                this.imageInput.hidden = true;
                break;
            }
            case "color":
            {
                this.valueInput.hidden = true;
                this.matrixInput.hidden = true;
                this.colorInput.hidden = false;
                this.webcamInput.hidden = true;
                this.imageInput.hidden = true;
                break;
            }
            case "image":
            {
                this.valueInput.hidden = true;
                this.matrixInput.hidden = true;
                this.colorInput.hidden = true;
                this.webcamInput.hidden = true;
                this.imageInput.hidden = false;
                break;
            }
            case "webcam":
            {
                this.valueInput.hidden = true;
                this.matrixInput.hidden = true;
                this.colorInput.hidden = true;
                this.webcamInput.hidden = false;
                this.imageInput.hidden = true;
                break;
            }
        }

        let newEvent = new CustomEvent("typechange", { detail: { uniformItem: this, value: type }});
        this.dispatchEvent(newEvent);
    }

    dispatchValueChange()
    {
        let type = this.typeSelect.value;

        if( type === "int" )
        {
            this.valueInput.value = Math.floor(this.valueInput.value);
        }

        let value = 0;
        switch( type )
        {
            case "int":
            case "float":
                this.valueInput.value;
                break;
            case "vec2":
                value = this.matrixInput.getVector2();
                break;
            case "vec3":
                value = this.matrixInput.getVector3();
                break;
            case "vec4":
                value = this.matrixInput.getVector4();
                break;
            case "mat2":
                value = this.matrixInput.getMatrix2x2();
                break;
            case "mat3":
                value = this.matrixInput.getMatrix3x3();
                break;
            case "mat4":
                value = this.matrixInput.getMatrix4x4();
                break;
            case "color":
                value = hexToRgb(this.colorInput.value);
                break;
            case "image":
                value = this.imageInput.getValue();
                break;
            case "webcam":
                value = this.webcamInput.getValue();
                break;
        }

        let newEvent = new CustomEvent("valuechange", { detail: { uniformItem: this, value: value }});
        this.dispatchEvent(newEvent);
    }

    dispatchClickMatrixInput()
    {
        let type = this.typeSelect.value;

        switch( type )
        {
            case "vec2":
                this.matrixInput.showVector2();
                break;
            case "vec3":
                this.matrixInput.showVector3();
                break;
            case "vec4":
                this.matrixInput.showVector4();
                break;
            case "mat2":
                this.matrixInput.showMatrix2();
                break;
            case "mat3":
                this.matrixInput.showMatrix3();
                break;
            case "mat4":
                this.matrixInput.showMatrix4();
                break;
        }
    }

    dispatchRemoveUniform()
    {
        this.parentElement.removeChild(this);

        let newEvent = new CustomEvent("removeuniform", { detail: { uniformItem: this }});
        this.dispatchEvent(newEvent);
    }
}

window.customElements.define("uniform-item", UniformItem);