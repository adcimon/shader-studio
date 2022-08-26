"use strict";

import { ProfileMenu } from './components/profileMenu.js';
import { AboutModal } from './components/aboutModal.js';
import { UniformList } from './components/uniformList.js';
import { AddModal } from './components/addModal.js';
import { UniformModal } from './components/uniformModal.js';
import { EditorView } from './components/editorView.js';
import { RenderView } from './components/renderView.js';

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
    // Profile menu.
    let profileElement = document.getElementById("top");
    let profileMenu = new ProfileMenu(profileElement);
    Alpine.store("profileMenu", profileMenu);
    window.profileMenu = Alpine.store("profileMenu");

    // About modal.
    let aboutModal = new AboutModal(document.body);
    let versions = { node: window.versions.node, chrome: window.versions.chrome, electron: window.versions.electron };
    aboutModal.updateVersions(versions);
    Alpine.store("aboutModal", aboutModal);
    window.aboutModal = Alpine.store("aboutModal");

    // Uniform list.
    let sidebar = document.getElementById("sidebar");
    let uniformList = new UniformList(sidebar);
    Alpine.store("uniformList", uniformList);
    window.uniformList = Alpine.store("uniformList");

    // Add modal.
    let addModal = new AddModal(document.body);
    Alpine.store("addModal", addModal);
    window.addModal = Alpine.store("addModal");

    // Uniform modal.
    let uniformModal = new UniformModal(document.body);
    Alpine.store("uniformModal", uniformModal);
    window.uniformModal = Alpine.store("uniformModal");

    // Editor view.
    let editorElement = document.getElementById("left");
    let editorView = new EditorView(editorElement);
    editorView.setValue(fragmentShader);
    Alpine.store("editorView", editorView);
    window.editorView = Alpine.store("editorView");

    // Render view.
    let renderElement = document.getElementById("right");
    let renderView = new RenderView(renderElement);
    renderView.setShader(fragmentShader);
    Alpine.store("renderView", renderView);
    window.renderView = Alpine.store("renderView");
}