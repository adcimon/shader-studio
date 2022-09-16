"use strict";

import { MenuBar } from './components/menuBar.js';
import { Label } from './components/label.js';
import { CompileButton } from './components/compileButton.js';
import { ProfileMenu } from './components/profileMenu.js';
import { UniformList } from './components/uniformList.js';
import { EditorView } from './components/editorView.js';
import { RenderView } from './components/renderView.js';
import { ErrorView } from './components/errorView.js';
import { AddModal } from './components/addModal.js';
import { UniformModal } from './components/uniformModal.js';
import { AboutModal } from './components/aboutModal.js';

const fragmentShader =
`// Reference: https://www.shadertoy.com/user/iq  
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1).
    vec2 uv = fragCoord / resolution;

    // Time varying pixel color.
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));

    // Output to screen.
    fragColor = vec4(color, 1.0);
}

void main()
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

window.addEventListener("load", main);

function main()
{
    const header = document.getElementById("header");
    const sidebar = document.getElementById("sidebar");
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    // Menu bar.
    const menuBar = new MenuBar(header);
    Alpine.store("menuBar", menuBar);
    window.menuBar = Alpine.store("menuBar");
    {
        // Compile button.
        const compileButton = new CompileButton();
        Alpine.store("compileButton", compileButton);
        window.compileButton = Alpine.store("compileButton");
        window.menuBar.addMenuItem(window.compileButton);

        // Resolution label.
        const resolutionLabel = new Label();
        Alpine.store("resolutionLabel", resolutionLabel);
        window.resolutionLabel = Alpine.store("resolutionLabel");
        window.menuBar.addMenuItem(window.resolutionLabel);

        // Profile menu.
        const profileMenu = new ProfileMenu();
        Alpine.store("profileMenu", profileMenu);
        window.profileMenu = Alpine.store("profileMenu");
        window.app.setUser("");
        window.menuBar.addMenuItem(window.profileMenu);
    }

    // Uniform list.
    const uniformList = new UniformList(sidebar);
    Alpine.store("uniformList", uniformList);
    window.uniformList = Alpine.store("uniformList");

    // Main view.
    {
        // Editor view.
        const editorView = new EditorView(left);
        editorView.setValue(fragmentShader);
        Alpine.store("editorView", editorView);
        window.editorView = Alpine.store("editorView");

        // Render view.
        const renderView = new RenderView(right);
        Alpine.store("renderView", renderView);
        window.renderView = Alpine.store("renderView");
        window.renderView.addEventListener("resize", (event) =>
        {
            window.resolutionLabel.setText(event.detail.width + "x" + event.detail.height);
        });

        // Error view.
        const errorView = new ErrorView(right);
        Alpine.store("errorView", errorView);
        window.errorView = Alpine.store("errorView");
        window.errorView.hide();
        console.error = (message) =>
        {
            window.errorView.setText(message);
        };
    }

    // Modals.
    {
        // Add modal.
        const addModal = new AddModal(document.body);
        Alpine.store("addModal", addModal);
        window.addModal = Alpine.store("addModal");

        // Uniform modal.
        const uniformModal = new UniformModal(document.body);
        Alpine.store("uniformModal", uniformModal);
        window.uniformModal = Alpine.store("uniformModal");

        // About modal.
        const aboutModal = new AboutModal(document.body);
        const versions =
        {
            node: window.nodeVersion,
            chrome: window.chromeVersion,
            electron: window.electronVersion
        };
        aboutModal.updateVersions(versions);
        Alpine.store("aboutModal", aboutModal);
        window.aboutModal = Alpine.store("aboutModal");
    }

    window.renderView.compile(fragmentShader);
}