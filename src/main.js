"use strict";

import { Fragments } from './render/fragments.js';
import { Quad } from './render/quad.js';
import { Texture } from './render/texture.js';
import { Shader } from './render/shader.js';
import { Renderer } from './render/renderer.js';

import { CodeEditor } from './component/codeEditor/codeEditor.js';
import { NavigationMenu } from './component/navigationMenu/navigationMenu.js';
import { EditorView } from './component/editorView/editorView.js';
import { RenderView } from './component/renderView/renderView.js';
import { MainView } from './component/mainView/mainView.js';

var codeEditor, renderView;
var gl, quad, shader, renderer;

window.addEventListener("load", main);
window.addEventListener("beforeunload", exit);

function main()
{
    initializeInterface();
    initializeRenderer();
}

function exit()
{
}

function initializeInterface()
{
    codeEditor = document.body.querySelector("code-editor");
    codeEditor.setCode(Fragments[0]);

    renderView = document.body.querySelector("render-view");
    renderView.resize();
}

function initializeRenderer()
{
    // Renderer.
    renderer = new Renderer(renderView.getCanvas());
    gl = renderer.getContext();

    // Shader.
    shader = new Shader(gl);
    compile();

    // Quad.
    quad = new Quad(gl);
    quad.bindBuffers(shader);

    renderer.start(render);
}

function setUniforms()
{
    shader.setVector2("u_resolution", renderView.getWidth(), renderView.getHeight());
}

function compile()
{
    shader.compile(codeEditor.getCode());
    shader.use();

    setUniforms();
}

function render( time, deltaTime )
{
    shader.setFloat("u_time", time);
    shader.setFloat("u_deltaTime", deltaTime);

    quad.draw();
}