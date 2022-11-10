"use strict";

import { Shaders } from './utils/shaders.js';

import { GenericLabel } from './components/genericLabel.js';

import { CompileButton } from './components/compileButton.js';
import { SaveButton } from './components/saveButton.js';
import { ProfileMenu } from './components/profileMenu.js';

import { UniformList } from './components/uniformList.js';
import { EditorView } from './components/editorView.js';
import { RenderView } from './components/renderView.js';
import { ErrorView } from './components/errorView.js';

import { AddModal } from './components/addModal.js';
import { UniformModal } from './components/uniformModal.js';
import { AboutModal } from './components/aboutModal.js';
import { HelpModal } from './components/helpModal.js';

window.addEventListener("load", main);

function main()
{
    // App.
    window.app.setUser("");

    // Resolution label.
    const resolutionLabel = document.querySelector("#resolutionLabel");
    window.resolutionLabel = resolutionLabel;

    // Editor view.
    editorView.setValue(Shaders.defaultShader);

    // Render view.
    window.renderView.addEventListener("resize", (event) =>
    {
        window.resolutionLabel.setText(event.detail.width + "x" + event.detail.height);
    });

    // Error view.
    console.error = (message) =>
    {
        window.errorView.setText(message);
    };

    // About modal.
    const versions =
    {
        node: window.nodeVersion,
        chrome: window.chromeVersion,
        electron: window.electronVersion
    };
    window.aboutModal.updateVersions(versions);

    window.renderView.compile(Shaders.defaultShader);
    window.renderView.dispatchResizeEvent();
}