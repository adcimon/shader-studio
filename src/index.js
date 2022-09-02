"use strict";

import { CompileButton } from './components/compileButton.js';
import { ProfileMenu } from './components/profileMenu.js';
import { UniformList } from './components/uniformList.js';
import { EditorView } from './components/editorView.js';
import { RenderView } from './components/renderView.js';
import { AddModal } from './components/addModal.js';
import { UniformModal } from './components/uniformModal.js';
import { AboutModal } from './components/aboutModal.js';

const fragmentShader =
`// Reference: https://www.shadertoy.com/user/iq  
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

uniform vec2 iResolution;
uniform float iTime;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1).
    vec2 uv = fragCoord / iResolution;

    // Time varying pixel color.
    vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen.
    fragColor = vec4(col, 1.0);
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
    renderView.setShader(fragmentShader);
    Alpine.store("renderView", renderView);
    window.renderView = Alpine.store("renderView");

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
}