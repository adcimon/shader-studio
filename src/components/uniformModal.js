"use strict";

import { Icons } from '../utils/icons.js';
import { MatrixInput } from "./matrixInput.js";
import { ImageInput } from "./imageInput.js";

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
                            <div
                                id="matrixContainer"
                                class="w-full">
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

                <!-- Image -->
                <div
                    id="imageField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">Click to select the image</span>
                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                            <div
                                id="imageContainer"
                                class="w-full">
                            </div>
                        </div>
                    </label>
                </div>

                <!-- Webcam -->
                <div
                    id="webcamField"
                    class="mb-2">
                    <label class="block text-sm">
                        <span class="text-gray-700 dark:text-gray-400">NYI</span>
                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                            <div
                                id="webcamContainer"
                                class="w-full">
                            </div>
                        </div>
                    </label>
                </div>

            </div>

            <!-- Footer -->
            <footer class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-300 dark:bg-gray-800">
                <button
                    class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150  border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    x-show="!$store.uniformModal.deleting"
                    x-on:click="$store.uniformModal.showDelete()">
                    $deleteIcon
                    <span class="ml-2">Delete</span>
                </button>
                <button
                    class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg focus:outline-none"
                    x-show="$store.uniformModal.deleting"
                    x-on:click="$store.uniformModal.confirmDelete()"
                    x-on:click.away="$store.uniformModal.hideDelete()"
                    x-on:keydown.escape="$store.uniformModal.hideDelete()">
                    $deleteIcon
                    <span class="ml-2">Delete</span>
                </button>
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
    let imageField = null;
    let webcamField = null;

    let intInput = null;
    let floatInput = null;
    let matrixInput = null;
    let colorInput = null;
    let imageInput = null;

    let init = function()
    {
        const regexp = new RegExp("\\$deleteIcon", "g");
        const composedHtml = html.replace(regexp, Icons.deleteIcon);
        createElements(composedHtml, domElement);

        uniformWindow = domElement.querySelector("#uniformWindow");
        typeLabel = domElement.querySelector("#typeLabel");

        intField = domElement.querySelector("#intField");
        floatField = domElement.querySelector("#floatField");
        matrixField = domElement.querySelector("#matrixField");
        colorField = domElement.querySelector("#colorField");
        imageField = domElement.querySelector("#imageField");
        webcamField = domElement.querySelector("#webcamField");

        // Int.
        intInput = domElement.querySelector("#intInput");
        intInput.addEventListener("change", () =>
        {
            let item = window.uniformModal.selectedItem;
            if( !item )
            {
                return;
            }

            item.setValue(intInput.value);
            window.renderView.setUniform(item);
        });

        // Float.
        floatInput = domElement.querySelector("#floatInput");
        floatInput.addEventListener("change", () =>
        {
            let item = window.uniformModal.selectedItem;
            if( !item )
            {
                return;
            }

            item.setValue(floatInput.value);
            window.renderView.setUniform(item);
        });

        // Matrix.
        let matrixContainer = domElement.querySelector("#matrixContainer");
        matrixInput = new MatrixInput(matrixContainer);
        matrixInput.addEventListener("change", () =>
        {
            let item = window.uniformModal.selectedItem;
            if( !item )
            {
                return;
            }

            let type = item.getType();
            let value = null;

            switch( type )
            {
                case "vec2": value = matrixInput.getVector2(); break;
                case "vec3": value = matrixInput.getVector3(); break;
                case "vec4": value = matrixInput.getVector4(); break;
                case "mat2": value = matrixInput.getMatrix2(); break;
                case "mat3": value = matrixInput.getMatrix3(); break;
                case "mat4": value = matrixInput.getMatrix4(); break;
                default: return;
            }

            item.setValue(value);
            window.renderView.setUniform(item);
        });

        // Color.
        colorInput = domElement.querySelector("#colorInput");
        colorInput.addEventListener("change", () =>
        {
            let item = window.uniformModal.selectedItem;
            if( !item )
            {
                return;
            }

            item.setValue(hexToRgb(colorInput.value));
            window.renderView.setUniform(item);
        });

        // Image.
        let imageContainer = domElement.querySelector("#imageContainer");
        imageInput = new ImageInput(imageContainer);
        imageInput.addEventListener("change", (event) =>
        {
            let item = window.uniformModal.selectedItem;
            if( !item )
            {
                return;
            }

            item.setValue(event.detail.value);
            window.renderView.setUniform(item);
        });
    }

    let open = function( name, x, y )
    {
        this.deleting = false;

        let item = window.uniformList.getUniformItem(name);
        if( !item )
        {
            return;
        }

        this.selectedItem = item;
        let type = this.selectedItem.getType();
        let value = this.selectedItem.getValue();

        typeLabel.innerText = type;
        setPosition(x, y);

        switch( type )
        {
            case "int":
            {
                intInput.value = value;
                intField.show();
                floatField.hide();
                matrixField.hide();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "float":
            {
                intField.hide();
                floatInput.value = value;
                floatField.show();
                matrixField.hide();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "vec2":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setVector2(value);
                matrixInput.showVector2();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "vec3":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setVector3(value);
                matrixInput.showVector3();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "vec4":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setVector4(value);
                matrixInput.showVector4();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "mat2":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setMatrix2(value);
                matrixInput.showMatrix2();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "mat3":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setMatrix3(value);
                matrixInput.showMatrix3();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "mat4":
            {
                intField.hide();
                floatField.hide();
                matrixInput.setMatrix4(value);
                matrixInput.showMatrix4();
                matrixField.show();
                colorField.hide();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "color":
            {
                intField.hide();
                floatField.hide();
                matrixField.hide();
                colorInput.value = rgbToHex(...value);
                colorField.show();
                imageField.hide();
                webcamField.hide();
                break;
            }
            case "image":
            {
                intField.hide();
                floatField.hide();
                matrixField.hide();
                colorField.hide();
                imageField.show();
                webcamField.hide();
                break;
            }
            case "webcam":
            {
                intField.hide();
                floatField.hide();
                matrixField.hide();
                colorField.hide();
                imageField.hide();
                webcamField.show();
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

    let showDelete = function()
    {
        this.deleting = true;
    }

    let hideDelete = function()
    {
        this.deleting = false;
    }

    let confirmDelete = function()
    {
        window.uniformList.deleteUniformItem(this.selectedItem);
        this.opened = false;
        this.deleting = false;
        this.selectedItem = null;
    }

    init();

    return {
        selectedItem: null,
        opened: false,
        deleting: false,
        open,
        close,
        setPosition,
        resetPosition,
        showDelete,
        hideDelete,
        confirmDelete
    }
}