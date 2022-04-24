"use strict";

import { CloseIcon, AppsIcon } from '../.././icons.js';

const css =
`
<link type="text/css" rel="stylesheet" href="./src/styles/button.css">
<link type="text/css" rel="stylesheet" href="./src/styles/input.css">
<link type="text/css" rel="stylesheet" href="./src/styles/modal.css">
<link type="text/css" rel="stylesheet" href="./src/component/matrixInput/style.css">
`;

const html =
`
<button id="button">
    ${AppsIcon}
</button>
<div id="window" hidden>
    <div id="modal">
        <button id="closeButton">
            ${CloseIcon}
        </button>
        <table>
            <tr row="0">
                <td row="0" column="0"><input type="number" value="1" step="0.1"></input></td>
                <td row="0" column="1"><input type="number" value="0" step="0.1"></input></td>
                <td row="0" column="2"><input type="number" value="0" step="0.1"></input></td>
                <td row="0" column="3"><input type="number" value="0" step="0.1"></input></td>
            </tr>
            <tr row="1">
                <td row="1" column="0"><input type="number" value="0" step="0.1"></input></td>
                <td row="1" column="1"><input type="number" value="1" step="0.1"></input></td>
                <td row="1" column="2"><input type="number" value="0" step="0.1"></input></td>
                <td row="1" column="3"><input type="number" value="0" step="0.1"></input></td>
            </tr>
            <tr row="2">
                <td row="2" column="0"><input type="number" value="0" step="0.1"></input></td>
                <td row="2" column="1"><input type="number" value="0" step="0.1"></input></td>
                <td row="2" column="2"><input type="number" value="1" step="0.1"></input></td>
                <td row="2" column="3"><input type="number" value="0" step="0.1"></input></td>
            </tr>
            <tr row="3">
                <td row="3" column="0"><input type="number" value="0" step="0.1"></input></td>
                <td row="3" column="1"><input type="number" value="0" step="0.1"></input></td>
                <td row="3" column="2"><input type="number" value="0" step="0.1"></input></td>
                <td row="3" column="3"><input type="number" value="1" step="0.1"></input></td>
            </tr>
        </table>
    </div>
</div>
`;

export class MatrixInput extends HTMLElement
{
    button = null;
    window = null;
    closeButton = null;
    inputs = [];

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
        this.button = this.shadowRoot.querySelector("#button");
        this.window = this.shadowRoot.querySelector("#window");
        this.closeButton = this.shadowRoot.querySelector("#closeButton");

        this.button.addEventListener("click", () =>
        {
            this.window.hidden = false;
        });

        this.closeButton.addEventListener("click", () =>
        {
            this.window.hidden = true;
        });

        this.inputs = this.shadowRoot.querySelectorAll("input");
        this.inputs.forEach(input =>
        {
            input.addEventListener("change", () =>
            {
                let newEvent = new CustomEvent("valuechange", { detail: { matrixInput: this, value: this.getValues() }});
                this.dispatchEvent(newEvent);
            });
        });
    }

    disconnectedCallback()
    {
    }

    getInputRow( input )
    {
        let row = Array.from(input.parentNode.parentNode.parentNode.children).indexOf(input.parentNode.parentNode);
        return row;
    }

    getInputColumn( input )
    {
        let column = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
        return column;
    }

    getValues()
    {
        let values = [];
        this.inputs.forEach(input =>
        {
            let row = this.getInputRow(input);

            if( typeof values[row] === "undefined" )
            {
                values.push([]);
            }

            values[row].push(parseFloat(input.value));
        });

        return values;
    }

    getVector2()
    {
        let values = this.getValues();
        return [values[0][0], values[0][1]];
    }

    getVector3()
    {
        let values = this.getValues();
        return [values[0][0], values[0][1], values[0][2]];
    }

    getVector4()
    {
        let values = this.getValues();
        return [values[0][0], values[0][1], values[0][2], values[0][3]];
    }

    getMatrix2x2()
    {
        let values = this.getValues();
        return [
            [values[0][0], values[0][1]],
            [values[1][0], values[1][1]]
        ];
    }

    getMatrix3x3()
    {
        let values = this.getValues();
        return [
            [values[0][0], values[0][1], values[0][2]],
            [values[1][0], values[1][1], values[1][2]],
            [values[2][0], values[2][1], values[2][2]]
        ];
    }

    getMatrix4x4()
    {
        let values = this.getValues();
        return values;
    }

    setVector2( value )
    {
        this.inputs[0].value = value[0];
        this.inputs[1].value = value[1];
    }

    setVector3( value )
    {
        this.inputs[0].value = value[0];
        this.inputs[1].value = value[1];
        this.inputs[2].value = value[2];
    }

    setVector4( value )
    {
        this.inputs[0].value = value[0];
        this.inputs[1].value = value[1];
        this.inputs[2].value = value[2];
        this.inputs[3].value = value[3];
    }

    setMatrix2x2( value )
    {
        this.inputs[0].value = value[0][0];
        this.inputs[1].value = value[0][1];

        this.inputs[2].value = value[1][0];
        this.inputs[3].value = value[1][1];
    }

    setMatrix3x3( value )
    {
        this.inputs[0].value = value[0][0];
        this.inputs[1].value = value[0][1];
        this.inputs[2].value = value[0][2];

        this.inputs[3].value = value[1][0];
        this.inputs[4].value = value[1][1];
        this.inputs[5].value = value[1][2];

        this.inputs[6].value = value[2][0];
        this.inputs[7].value = value[2][1];
        this.inputs[8].value = value[2][2];
    }

    setMatrix4x4( value )
    {
        this.inputs[0].value = value[0][0];
        this.inputs[1].value = value[0][1];
        this.inputs[2].value = value[0][2];
        this.inputs[3].value = value[0][3];

        this.inputs[4].value = value[1][0];
        this.inputs[5].value = value[1][1];
        this.inputs[6].value = value[1][2];
        this.inputs[7].value = value[1][3];

        this.inputs[8].value = value[2][0];
        this.inputs[9].value = value[2][1];
        this.inputs[10].value = value[2][2];
        this.inputs[11].value = value[2][3];

        this.inputs[12].value = value[3][0];
        this.inputs[13].value = value[3][1];
        this.inputs[14].value = value[3][2];
        this.inputs[15].value = value[3][3];
    }

    showVector2()
    {
        this.inputs.forEach(input =>
        {
            let r = this.getInputRow(input);
            let c = this.getInputColumn(input);
            if( r === 0 && (c === 0 || c === 1) )
            {
                input.parentNode.hidden = false;
            }
            else
            {
                input.parentNode.hidden = true;
            }
        });
    }

    showVector3()
    {
        this.inputs.forEach(input =>
        {
            let r = this.getInputRow(input);
            let c = this.getInputColumn(input);
            if( r === 0 && (c === 0 || c === 1 || c === 2) )
            {
                input.parentNode.hidden = false;
            }
            else
            {
                input.parentNode.hidden = true;
            }
        });
    }

    showVector4()
    {
        this.inputs.forEach(input =>
        {
            let r = this.getInputRow(input);
            if( r === 0 )
            {
                input.parentNode.hidden = false;
            }
            else
            {
                input.parentNode.hidden = true;
            }
        });
    }

    showMatrix2()
    {
        this.inputs.forEach(input =>
        {
            let r = this.getInputRow(input);
            let c = this.getInputColumn(input);
            if( (r === 0 || r === 1) && (c === 0 || c === 1) )
            {
                input.parentNode.hidden = false;
            }
            else
            {
                input.parentNode.hidden = true;
            }
        });
    }

    showMatrix3()
    {
        this.inputs.forEach(input =>
        {
            let r = this.getInputRow(input);
            let c = this.getInputColumn(input);
            if( (r === 0 || r === 1 || r === 2) && (c === 0 || c === 1 || c === 2) )
            {
                input.parentNode.hidden = false;
            }
            else
            {
                input.parentNode.hidden = true;
            }
        });
    }

    showMatrix4()
    {
        this.inputs.forEach(input =>
        {
            input.parentNode.hidden = false;
        });
    }
}

window.customElements.define("matrix-input", MatrixInput);