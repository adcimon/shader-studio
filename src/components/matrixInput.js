"use strict";

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

export function MatrixInput( domElement )
{
    let eventTarget = new EventTarget();
    let root = null;
    let inputs = null;

    let init = function()
    {
        createElements(html, domElement);

        root = domElement.querySelector("table");
        let table = root;
        inputs = table.querySelectorAll("input");
        inputs.forEach(input =>
        {
            input.addEventListener("change", () =>
            {
                let newEvent = new CustomEvent("change", { detail: { value: getValues() }});
                eventTarget.dispatchEvent(newEvent);
            });
        });
    }

    let getElement = function()
    {
        return root;
    }

    let getInputRow = function( input )
    {
        let row = Array.from(input.parentNode.parentNode.parentNode.children).indexOf(input.parentNode.parentNode);
        return row;
    }

    let getInputColumn = function( input )
    {
        let column = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
        return column;
    }

    let getValues = function()
    {
        let values = [];
        inputs.forEach(input =>
        {
            let row = getInputRow(input);

            if( typeof values[row] === "undefined" )
            {
                values.push([]);
            }

            values[row].push(parseFloat(input.value));
        });

        return values;
    }

    let getVector2 = function()
    {
        let values = getValues();
        return [values[0][0], values[0][1]];
    }

    let getVector3 = function()
    {
        let values = getValues();
        return [values[0][0], values[0][1], values[0][2]];
    }

    let getVector4 = function()
    {
        let values = getValues();
        return [values[0][0], values[0][1], values[0][2], values[0][3]];
    }

    let getMatrix2 = function()
    {
        let values = getValues();
        return [
            [values[0][0], values[0][1]],
            [values[1][0], values[1][1]]
        ];
    }

    let getMatrix3 = function()
    {
        let values = getValues();
        return [
            [values[0][0], values[0][1], values[0][2]],
            [values[1][0], values[1][1], values[1][2]],
            [values[2][0], values[2][1], values[2][2]]
        ];
    }

    let getMatrix4 = function()
    {
        let values = getValues();
        return values;
    }

    let setVector2 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
    }

    let setVector3 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
        inputs[2].value = value[0][2];
    }

    let setVector4 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
        inputs[2].value = value[0][2];
        inputs[3].value = value[0][3];
    }

    let setMatrix2 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
        inputs[4].value = value[1][0];
        inputs[5].value = value[1][1];
    }

    let setMatrix3 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
        inputs[2].value = value[0][2];
        inputs[4].value = value[1][0];
        inputs[5].value = value[1][1];
        inputs[6].value = value[1][2];
        inputs[8].value = value[2][0];
        inputs[9].value = value[2][1];
        inputs[10].value = value[2][2];
    }

    let setMatrix4 = function( value )
    {
        inputs[0].value = value[0][0];
        inputs[1].value = value[0][1];
        inputs[2].value = value[0][2];
        inputs[3].value = value[0][3];
        inputs[4].value = value[1][0];
        inputs[5].value = value[1][1];
        inputs[6].value = value[1][2];
        inputs[7].value = value[1][3];
        inputs[8].value = value[2][0];
        inputs[9].value = value[2][1];
        inputs[10].value = value[2][2];
        inputs[11].value = value[2][3];
        inputs[12].value = value[3][0];
        inputs[13].value = value[3][1];
        inputs[14].value = value[3][2];
        inputs[15].value = value[3][3];
    }

    let showVector2 = function()
    {
        inputs.forEach(input =>
        {
            let r = getInputRow(input);
            let c = getInputColumn(input);
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

    let showVector3 = function()
    {
        inputs.forEach(input =>
        {
            let r = getInputRow(input);
            let c = getInputColumn(input);
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

    let showVector4 = function()
    {
        inputs.forEach(input =>
        {
            let r = getInputRow(input);
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

    let showMatrix2 = function()
    {
        inputs.forEach(input =>
        {
            let r = getInputRow(input);
            let c = getInputColumn(input);
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

    let showMatrix3 = function()
    {
        inputs.forEach(input =>
        {
            let r = getInputRow(input);
            let c = getInputColumn(input);
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

    let showMatrix4 = function()
    {
        inputs.forEach(input =>
        {
            input.parentNode.show();
        });
    }

    init();

    return Object.assign(eventTarget, {
        getElement,
        getVector2,
        getVector3,
        getVector4,
        getMatrix2,
        getMatrix3,
        getMatrix4,
        setVector2,
        setVector3,
        setVector4,
        setMatrix2,
        setMatrix3,
        setMatrix4,
        showVector2,
        showVector3,
        showVector4,
        showMatrix2,
        showMatrix3,
        showMatrix4
    })
}