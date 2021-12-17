"use strict";

import { Renderer } from './render/renderer.js';
import { Shader } from './render/shader.js';
import { Texture } from './render/texture.js';
import { Quad } from './render/quad.js';
import { Fragments } from './render/fragments.js';

import { MainView } from './component/mainView/mainView.js';
import { RenderView } from './component/renderView/renderView.js';
import { EditorView } from './component/editorView/editorView.js';
import { NavigationMenu } from './component/navigationMenu/navigationMenu.js';
import { CodeEditor } from './component/codeEditor/codeEditor.js';
import { UniformList } from './component/uniformList/uniformList.js';

var renderView, navigationMenu, codeEditor, uniformList;
var gl, renderer, shader, quad;

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
    navigationMenu = document.body.querySelector("navigation-menu");

    codeEditor = document.body.querySelector("code-editor");
    codeEditor.setCode(Fragments[0]);

    uniformList = new UniformList();

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