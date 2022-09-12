"use strict";

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
uniform sampler2D test;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1).
    vec2 uv = fragCoord / resolution;

    // Time varying pixel color.
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));

    // Output to screen.
    //fragColor = vec4(color, 1.0);
    fragColor = texture(test, uv);
}

void main()
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

window.addEventListener("load", main);

function main()
{
    const sidebar = document.getElementById("sidebar");
    const top = document.getElementById("top");
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    // Compile button.
    const compileButton = new CompileButton(top);
    Alpine.store("compileButton", compileButton);
    window.compileButton = Alpine.store("compileButton");

    // Profile menu.
    const profileMenu = new ProfileMenu(top);
    Alpine.store("profileMenu", profileMenu);
    window.profileMenu = Alpine.store("profileMenu");

    // Uniform list.
    const uniformList = new UniformList(sidebar);
    Alpine.store("uniformList", uniformList);
    window.uniformList = Alpine.store("uniformList");

    // Editor view.
    const editorView = new EditorView(left);
    editorView.setValue(fragmentShader);
    Alpine.store("editorView", editorView);
    window.editorView = Alpine.store("editorView");

    // Render view.
    const renderView = new RenderView(right);
    Alpine.store("renderView", renderView);
    window.renderView = Alpine.store("renderView");

    // Error view.
    const errorView = new ErrorView(right);
    Alpine.store("errorView", errorView);
    window.errorView = Alpine.store("errorView");
    window.errorView.hide();
    console.error = (message) =>
    {
        window.errorView.setText(message);
    };

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
        electron: window.electronVersion,
        three: window.threeVersion
    };
    aboutModal.updateVersions(versions);
    Alpine.store("aboutModal", aboutModal);
    window.aboutModal = Alpine.store("aboutModal");

    renderView.compile(fragmentShader);
}