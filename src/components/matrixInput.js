"use strict";

import { BaseElement } from "./baseElement.js";

const html = /*html*/
`
<table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

        <!-- 0 -->
        <tr
            row="0"
            class="text-gray-700 dark:text-gray-400">
            <td
                row="0"
                column="0">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="0"
                column="1">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="0"
                column="2">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="0"
                column="3">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
        </tr>

        <!-- 1 -->
        <tr
            row="1"
            class="text-gray-700 dark:text-gray-400">
            <td
                row="1"
                column="0">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="1"
                column="1">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="1"
                column="2">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="1"
                column="3">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
        </tr>

        <!-- 2 -->
        <tr
            row="2"
            class="text-gray-700 dark:text-gray-400">
            <td
                row="2"
                column="0">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="2"
                column="1">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="2"
                column="2">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="2"
                column="3">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
        </tr>

        <!-- 3 -->
        <tr
            row="3"
            class="text-gray-700 dark:text-gray-400">
            <td
                row="3"
                column="0">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="3"
                column="1">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="3"
                column="2">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
            <td
                row="3"
                column="3">
                <input
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="number" value="1" step="0.1"/>
            </td>
        </tr>
    </tbody>
</table>
`;

export class MatrixInput extends BaseElement
{
    inputs = null;

    constructor()
    {
        super();

        this.state = { };
    }

    connectedCallback()
    {
        this.createElement(html);

        this.inputs = this.querySelectorAll("input");
        this.inputs.forEach(input =>
        {
            input.addEventListener("change", () =>
            {
                const newEvent = new CustomEvent("change", { detail: { value: this.getValues() }});
                this.dispatchEvent(newEvent);
            });
        });

        this.setState(this.state);
    }

    getInputRow( input )
    {
        const row = Array.from(input.parentNode.parentNode.parentNode.children).indexOf(input.parentNode.parentNode);
        return row;
    }

    getInputColumn( input )
    {
        const column = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
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
        const values = this.getValues();
        return [values[0][0], values[0][1]];
    }

    getVector3()
    {
        const values = this.getValues();
        return [values[0][0], values[0][1], values[0][2]];
    }

    getVector4()
    {
        const values = this.getValues();
        return [values[0][0], values[0][1], values[0][2], values[0][3]];
    }

    getMatrix2()
    {
        const values = this.getValues();
        return [
            [values[0][0], values[0][1]],
            [values[1][0], values[1][1]]
        ];
    }

    getMatrix3()
    {
        const values = this.getValues();
        return [
            [values[0][0], values[0][1], values[0][2]],
            [values[1][0], values[1][1], values[1][2]],
            [values[2][0], values[2][1], values[2][2]]
        ];
    }

    getMatrix4()
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

    setMatrix2( value )
    {
        this.inputs[0].value = value[0][0];
        this.inputs[1].value = value[0][1];
        this.inputs[4].value = value[1][0];
        this.inputs[5].value = value[1][1];
    }

    setMatrix3( value )
    {
        this.inputs[0].value = value[0][0];
        this.inputs[1].value = value[0][1];
        this.inputs[2].value = value[0][2];
        this.inputs[4].value = value[1][0];
        this.inputs[5].value = value[1][1];
        this.inputs[6].value = value[1][2];
        this.inputs[8].value = value[2][0];
        this.inputs[9].value = value[2][1];
        this.inputs[10].value = value[2][2];
    }

    setMatrix4( value )
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
                input.parentNode.show();
            }
            else
            {
                input.parentNode.hide();
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
                input.parentNode.show();
            }
            else
            {
                input.parentNode.hide();
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
                input.parentNode.show();
            }
            else
            {
                input.parentNode.hide();
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
                input.parentNode.show();
            }
            else
            {
                input.parentNode.hide();
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
                input.parentNode.show();
            }
            else
            {
                input.parentNode.hide();
            }
        });
    }

    showMatrix4()
    {
        this.inputs.forEach(input =>
        {
            input.parentNode.show();
        });
    }
}

window.customElements.define("matrix-input", MatrixInput);