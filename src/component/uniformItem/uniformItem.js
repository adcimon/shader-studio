"use strict";

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
    <option value="webcam">webcam</option>
</select>
<input id="nameInput" type="text" placeholder="name"></input>
<input id="valueInput" type="number" value="1.0" step="0.1"></input>
<matrix-input id="matrixInput" hidden></matrix-input>
<webcam-input id="webcamInput" hidden></webcam-input>
<button id="removeButton">
    <svg viewBox="0 0 512 512">
        <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/>
        <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
    </svg>
</button>
`;

export class UniformItem extends HTMLElement
{
    typeSelect = null;
    nameInput = null;
    valueInput = null;
    matrixInput = null;
    webcamInput = null;
    removeButton = null;

    constructor()
    {
        super();

        const template = document.createElement("template");
        template.innerHTML = css + html;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback()
    {
        this.typeSelect = this.shadowRoot.querySelector("#typeSelect");
        this.nameInput = this.shadowRoot.querySelector("#nameInput");
        this.valueInput = this.shadowRoot.querySelector("#valueInput");
        this.matrixInput = this.shadowRoot.querySelector("#matrixInput");
        this.webcamInput = this.shadowRoot.querySelector("#webcamInput");
        this.removeButton = this.shadowRoot.querySelector("#removeButton");

        this.typeSelect.addEventListener("change", this.dispatchTypeChange.bind(this));
        this.valueInput.addEventListener("change", this.dispatchValueChange.bind(this));
        this.matrixInput.addEventListener("valuechange", this.dispatchValueChange.bind(this));
        this.matrixInput.addEventListener("click", this.dispatchClickMatrixInput.bind(this));
        this.webcamInput.addEventListener("valuechange", this.dispatchValueChange.bind(this));
        this.removeButton.addEventListener("click", this.dispatchRemoveUniform.bind(this));

        this.nameInput.focus();
    }

    disconnectedCallback()
    {
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
            case "float":   return this.valueInput.value;
            case "vec2":    return this.matrixInput.getVector2();
            case "vec3":    return this.matrixInput.getVector3();
            case "vec4":    return this.matrixInput.getVector4();
            case "mat2":    return this.matrixInput.getMatrix2x2();
            case "mat3":    return this.matrixInput.getMatrix3x3();
            case "mat4":    return this.matrixInput.getMatrix4x4();
            case "webcam":  return this.webcamInput.getValue();
        }
    }

    dispatchTypeChange()
    {
        switch( this.typeSelect.value )
        {
            case "int":
            {
                this.valueInput.hidden = false;
                this.matrixInput.hidden = true;
                this.webcamInput.hidden = true;
                this.valueInput.step = 1;
                this.valueInput.value = Math.floor(this.valueInput.value);
                break;
            }
            case "float":
            {
                this.valueInput.hidden = false;
                this.matrixInput.hidden = true;
                this.webcamInput.hidden = true;
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
                this.webcamInput.hidden = true;
                break;
            }
            case "webcam":
            {
                this.valueInput.hidden = true;
                this.matrixInput.hidden = true;
                this.webcamInput.hidden = false;
                break;
            }
        }

        let newEvent = new CustomEvent("typechange", { detail: { uniformItem: this, value: this.typeSelect.value }});
        this.dispatchEvent(newEvent);
    }

    dispatchValueChange()
    {
        if( this.typeSelect.value === "int" )
        {
            this.valueInput.value = Math.floor(this.valueInput.value);
        }

        let value = 0;
        switch( this.typeSelect.value )
        {
            case "int":
            case "float":
                value = this.valueInput.value;
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
            case "webcam":
                value = this.webcamInput.getValue();
                break;
        }

        let newEvent = new CustomEvent("valuechange", { detail: { uniformItem: this, value: value }});
        this.dispatchEvent(newEvent);
    }

    dispatchClickMatrixInput()
    {
        switch( this.typeSelect.value )
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