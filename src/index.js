"use strict";

import { Shaders } from './utils/shaders.js';

import { GenericLabel } from './components/genericLabel.js';

import { CompileButton } from './components/compileButton.js';
import { ProfileMenu } from './components/profileMenu.js';

import { UniformList } from './components/uniformList.js';
import { EditorView } from './components/editorView.js';
import { RenderView } from './components/renderView.js';
import { ErrorView } from './components/errorView.js';

import { AddModal } from './components/addModal.js';
import { UniformModal } from './components/uniformModal.js';
import { AboutModal } from './components/aboutModal.js';

window.addEventListener("load", main);

function main()
{
    // Sidebar.
    {
        // Uniform list.
        const uniformList = document.querySelector("uniform-list");
        window.uniformList = uniformList;
    }

    // Header.
    {
        // Compile button.
        const compileButton = document.querySelector("compile-button");
        window.compileButton = compileButton;

        // Resolution label.
        const resolutionLabel = document.querySelector("#resolutionLabel");
        window.resolutionLabel = resolutionLabel;

        // Profile menu.
        const profileMenu = document.querySelector("profile-menu");
        window.profileMenu = profileMenu;
        window.app.setUser("");
    }

    // Main.
    {
        // Editor view.
        const editorView = document.querySelector("editor-view");
        editorView.setValue(Shaders.defaultShader);
        window.editorView = editorView;

        // Render view.
        const renderView = document.querySelector("render-view");
        window.renderView = renderView;
        window.renderView.addEventListener("resize", (event) =>
        {
            window.resolutionLabel.setText(event.detail.width + "x" + event.detail.height);
        });

        // Error view.
        const errorView = document.querySelector("error-view");
        window.errorView = errorView;
        window.errorView.hide();
        console.error = (message) =>
        {
            window.errorView.setText(message);
        };
    }

    // Modals.
    {
        // Add modal.
        const addModal = document.querySelector("add-modal");
        window.addModal = addModal;

        // Uniform modal.
        const uniformModal = document.querySelector("uniform-modal");
        window.uniformModal = uniformModal;

        // About modal.
        const aboutModal = document.querySelector("about-modal");
        const versions =
        {
            node: window.nodeVersion,
            chrome: window.chromeVersion,
            electron: window.electronVersion
        };
        aboutModal.updateVersions(versions);
        window.aboutModal = aboutModal;
    }

    window.renderView.compile(Shaders.defaultShader);
    window.renderView.dispatchResizeEvent();
}