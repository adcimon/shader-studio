"use strict";

import { BaseElement } from "./baseElement.js";
import { Icons } from '../utils/icons.js';
import { MatrixInput } from "./matrixInput.js";
import { ImageInput } from "./imageInput.js";
import { WebcamInput } from "./webcamInput.js";

const html = /*html*/
`
<div
    class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    x-show="opened"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0">

    <div
        id="uniformWindow"
        class="absolute w-full px-6 py-4 overflow-hidden bg-gray-300 rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl border-1 border-gray-100 dark:border-gray-700"
        x-show="opened"
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
                    x-show="!deleting"
                    x-on:click="showDelete">
                    $deleteIcon
                    <span class="ml-2">Delete</span>
                </button>
                <button
                    class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg focus:outline-none"
                    x-show="deleting"
                    x-on:click="confirmDelete"
                    x-on:click.away="hideDelete"
                    x-on:keydown.escape="hideDelete">
                    $deleteIcon
                    <span class="ml-2">Delete</span>
                </button>
                <button
                    class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    x-on:click="close">
                    Close
                </button>
            </footer>

    </div>

</div>
`;

export class UniformModal extends BaseElement
{
    uniformWindow = null;
    typeLabel = null;

    intField = null;
    floatField = null;
    matrixField = null;
    colorField = null;
    imageField = null;
    webcamField = null;

    intInput = null;
    floatInput = null;
    matrixInput = null;
    colorInput = null;
    imageInput = null;
    webcamInput = null;

    constructor()
    {
        super();

        this.state =
        {
            selectedItem: null,
            opened: false,
            deleting: false,
            showDelete: this.showDelete.bind(this),
            confirmDelete: this.confirmDelete.bind(this),
            hideDelete: this.hideDelete.bind(this),
            close: this.close.bind(this)
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        const regexp = new RegExp("\\$deleteIcon", "g");
        const composedHtml = html.replace(regexp, Icons.deleteIcon);
        template.innerHTML = composedHtml;
        this.appendChild(template.content.cloneNode(true));

        this.uniformWindow = this.querySelector("#uniformWindow");
        this.typeLabel = this.querySelector("#typeLabel");

        this.intField = this.querySelector("#intField");
        this.floatField = this.querySelector("#floatField");
        this.matrixField = this.querySelector("#matrixField");
        this.colorField = this.querySelector("#colorField");
        this.imageField = this.querySelector("#imageField");
        this.webcamField = this.querySelector("#webcamField");

        // Int.
        this.intInput = this.querySelector("#intInput");
        this.intInput.addEventListener("change", () =>
        {
            let item = this.getSelectedItem();
            if( !item )
            {
                return;
            }

            item.setValue(intInput.value);
            window.renderView.setUniform(item);
        });

        // Float.
        this.floatInput = this.querySelector("#floatInput");
        this.floatInput.addEventListener("change", () =>
        {
            let item = this.getSelectedItem();
            if( !item )
            {
                return;
            }

            item.setValue(floatInput.value);
            window.renderView.setUniform(item);
        });

        // Matrix.
        let matrixContainer = this.querySelector("#matrixContainer");
        this.matrixInput = new MatrixInput(matrixContainer);
        this.matrixInput.addEventListener("change", () =>
        {
            let item = this.getSelectedItem();
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
        this.colorInput = this.querySelector("#colorInput");
        this.colorInput.addEventListener("change", () =>
        {
            let item = this.getSelectedItem();
            if( !item )
            {
                return;
            }

            item.setValue(hexToRgb(colorInput.value));
            window.renderView.setUniform(item);
        });

        // Image.
        let imageContainer = this.querySelector("#imageContainer");
        this.imageInput = new ImageInput(imageContainer);
        this.imageInput.addEventListener("change", (event) =>
        {
            let item = this.getSelectedItem();
            if( !item )
            {
                return;
            }

            item.setValue(event.detail.value);
            window.renderView.setUniform(item);
        });

        // Webcam.
        let webcamContainer = this.querySelector("#webcamContainer");
        this.webcamInput = new WebcamInput(webcamContainer);
        this.webcamInput.addEventListener("change", (event) =>
        {
            let item = this.getSelectedItem();
            if( !item )
            {
                return;
            }

            item.setValue(event.detail.value);
            window.renderView.setUniform(item);
        });

        this.setState(this.state);
    }

    getSelectedItem()
    {
        return this.state.selectedItem;
    }

    open( name, x, y )
    {
        this.state.deleting = false;

        let item = window.uniformList.getUniformItem(name);
        if( !item )
        {
            return;
        }

        this.state.selectedItem = item;
        let type = this.state.selectedItem.getType();
        let value = this.state.selectedItem.getValue();

        typeLabel.innerText = type;
        this.setPosition(x, y);

        switch( type )
        {
            case "int":
            {
                this.intInput.value = value;
                this.intField.show();
                this.floatField.hide();
                this.matrixField.hide();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "float":
            {
                this.floatInput.value = value;
                this.intField.hide();
                this.floatField.show();
                this.matrixField.hide();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "vec2":
            {
                this.matrixInput.setVector2(value);
                this.matrixInput.showVector2();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "vec3":
            {
                this.matrixInput.setVector3(value);
                this.matrixInput.showVector3();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "vec4":
            {
                this.matrixInput.setVector4(value);
                this.matrixInput.showVector4();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "mat2":
            {
                this.matrixInput.setMatrix2(value);
                this.matrixInput.showMatrix2();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "mat3":
            {
                this.matrixInput.setMatrix3(value);
                this.matrixInput.showMatrix3();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "mat4":
            {
                this.matrixInput.setMatrix4(value);
                this.matrixInput.showMatrix4();
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.show();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "color":
            {
                this.colorInput.value = rgbToHex(...value);
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.hide();
                this.colorField.show();
                this.imageField.hide();
                this.webcamField.hide();
                break;
            }
            case "image":
            {
                this.imageInput.setValue(value);
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.hide();
                this.colorField.hide();
                this.imageField.show();
                this.webcamField.hide();
                break;
            }
            case "webcam":
            {
                this.webcamInput.setValue(value);
                this.intField.hide();
                this.floatField.hide();
                this.matrixField.hide();
                this.colorField.hide();
                this.imageField.hide();
                this.webcamField.show();
                break;
            }
            default:
            {
                return;
            }
        }

        this.state.opened = true;
    }

    close()
    {
        this.state.opened = false;
        this.state.selectedItem = null;
    }

    setPosition( x, y )
    {
        uniformWindow.style.left = (x - 10) + "px";
        uniformWindow.style.top = (y + 20) + "px";
    }

    resetPosition()
    {
        uniformWindow.style.left = "50%";
        uniformWindow.style.top = "50%";
    }

    showDelete()
    {
        this.state.deleting = true;
    }

    hideDelete()
    {
        this.state.deleting = false;
    }

    confirmDelete()
    {
        window.uniformList.deleteUniformItem(this.state.selectedItem);
        this.state.opened = false;
        this.state.deleting = false;
        this.state.selectedItem = null;
    }
}

window.customElements.define("uniform-modal", UniformModal);