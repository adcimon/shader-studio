"use strict";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="$store.uniformModal.opened"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        id="uniformWindow"
        class="absolute w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="$store.uniformModal.opened"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        x-on:click.away="$store.uniformModal.close()"
        x-on:keydown.escape="$store.uniformModal.close()">

            <!-- Body -->
            <div class="mt-1 mb-6">

                <!-- Type -->
                <div class="mb-4">
                    <span
                        id="typeLabel"
                        class="px-1 text-xs text-purple-600 border-2 rounded border-purple-600 select-none">
                        Type
                    </span>
                </div>

                <!-- Int -->
                <div
                    id="intField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Value</span>
                        <input
                            id="intInput"
                            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            type="number"
                            value="1"
                            step="1"/>
                    </label>
                </div>

                <!-- Float -->
                <div
                    id="floatField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Value</span>
                        <input
                            id="floatInput"
                            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            type="number"
                            value="1.0"
                            step="0.1"/>
                    </label>
                </div>

                <!-- Matrix -->
                <div
                    id="matrixField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Value</span>
                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                            <div class="w-full overflow-x-auto">
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
                            </div>
                        </div>
                    </label>
                </div>

                <!-- Color -->
                <div
                    id="colorField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Color</span>
                        <input
                            id="colorInput"
                            class="block w-full mt-1 text-sm rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                            type="color"
                            value="#ffffff"/>
                    </label>
                </div>

            </div>

            <!-- Footer -->
            <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-300 dark:bg-gray-800">
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="$store.uniformModal.close()">
                    Close
                </button>
            </footer>

    </div>

</div>
`;

export function UniformModal( domElement )
{
    let uniformWindow = null;
    let typeLabel = null;

    let intField = null;
    let floatField = null;
    let matrixField = null;
    let colorField = null;

    let matrixInputs = null;

    let init = function()
    {
        createElements(html, domElement);

        uniformWindow = domElement.querySelector("#uniformWindow");
        typeLabel = domElement.querySelector("#typeLabel");

        intField = domElement.querySelector("#intField");
        floatField = domElement.querySelector("#floatField");
        matrixField = domElement.querySelector("#matrixField");
        colorField = domElement.querySelector("#colorField");

        let intInput = domElement.querySelector("#intInput");
        intInput.addEventListener("change", function()
        {
            let item = window.uniformModal.selectedItem;
            item.setValue(this.value);
            window.renderView.setUniform(item);
        });

        let floatInput = domElement.querySelector("#floatInput");
        floatInput.addEventListener("change", function()
        {
            let item = window.uniformModal.selectedItem;
            item.setValue(this.value);
            window.renderView.setUniform(item);
        });

        matrixInputs = matrixField.querySelectorAll("input");

        let colorInput = domElement.querySelector("#colorInput");
        colorInput.addEventListener("change", function()
        {
            let item = window.uniformModal.selectedItem;
            item.setValue(hexToRgb(this.value));
            window.renderView.setUniform(item);
        });
    }

    let open = function( name, x, y )
    {
        let item = window.uniformList.getUniformItem(name);
        if( !item )
        {
            return;
        }

        this.selectedItem = item;
        let type = this.selectedItem.getType();

        typeLabel.innerText = type;
        setPosition(x, y);

        switch( type )
        {
            case "int":
            {
                intField.show();
                floatField.hide();
                matrixField.hide();
                colorField.hide();
                break;
            }
            case "float":
            {
                intField.hide();
                floatField.show();
                matrixField.hide();
                colorField.hide();
                break;
            }
            case "vec2":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showVector2();
                break;
            }
            case "vec3":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showVector3();
                break;
            }
            case "vec4":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showVector4();
                break;
            }
            case "mat2":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showMatrix2();
                break;
            }
            case "mat3":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showMatrix3();
                break;
            }
            case "mat4":
            {
                intField.hide();
                floatField.hide();
                matrixField.show();
                colorField.hide();
                showMatrix4();
                break;
            }
            case "color":
            {
                intField.hide();
                floatField.hide();
                matrixField.hide();
                colorField.show();
                break;
            }
            case "image":
            case "webcam":
            {
                intField.hide();
                floatField.hide();
                matrixField.hide();
                colorField.hide();
                break;
            }
            default:
            {
                return;
            }
        }

        this.opened = true;
    }

    let close = function()
    {
        this.opened = false;
        this.selectedItem = null;
    }

    let setPosition = function( x, y )
    {
        uniformWindow.style.left = (x - 10) + "px";
        uniformWindow.style.top = (y + 20) + "px";
    }

    let resetPosition = function()
    {
        uniformWindow.style.left = "50%";
        uniformWindow.style.top = "50%";
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

    let showVector2 = function()
    {
        matrixInputs.forEach(input =>
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
        matrixInputs.forEach(input =>
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
        matrixInputs.forEach(input =>
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
        matrixInputs.forEach(input =>
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
        matrixInputs.forEach(input =>
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
        matrixInputs.forEach(input =>
        {
            input.parentNode.show();
        });
    }

    init();

    return {
        selectedItem: null,
        opened: false,
        open,
        close,
        setPosition,
        resetPosition,
    }
}