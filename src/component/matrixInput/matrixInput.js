"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/matrixInput/style.css">`;

const html = `
<button class="matrix-button">
    <svg viewBox="0 0 512 512">
        <rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
    </svg>
</button>
<div class="matrix-view" hidden>
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
`;

export class MatrixInput extends HTMLElement
{
    matrixButton = null;
    matrixView = null;
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
        this.matrixButton = this.shadowRoot.querySelector(".matrix-button");
        this.matrixView = this.shadowRoot.querySelector(".matrix-view");
        this.matrixButton.addEventListener("click", () =>
        {
            this.matrixView.hidden = !this.matrixView.hidden;
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