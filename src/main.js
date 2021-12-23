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
import { ShaderEditor } from './component/shaderEditor/shaderEditor.js';
import { UniformList } from './component/uniformList/uniformList.js';
import { UniformItem } from './component/uniformItem/uniformItem.js';

var renderView, editorView, navigationMenu, shaderEditor, uniformList;
var gl, renderer, shader, quad;

window.addEventListener("load", main);
window.addEventListener("beforeunload", exit);

function main()
{
    initializeInterface();
    initializeRenderer();
    renderView.resize();
    compile();
}

function exit()
{
}

function initializeInterface()
{
    editorView = document.body.querySelector("editor-view");
    editorView.addEventListener("compile", compile);

    shaderEditor = document.body.querySelector("shader-editor");
    shaderEditor.setCode(Fragments[0]);

    uniformList = document.body.querySelector("uniform-list");
    uniformList.addEventListener("adduniform", (event) =>
    {
    });
    uniformList.addEventListener("removeuniform", (event) =>
    {
        let name = event.detail.uniformItem.getName();
        shader.removeUniform(name);
    });

    navigationMenu = document.body.querySelector("navigation-menu");
    navigationMenu.addEventListener("itemselect", (event) =>
    {
        switch( event.detail.name )
        {
            case "shader":
            {
                uniformList.hidden = true;
                shaderEditor.hidden = false;
                break;
            }
            case "uniforms":
            {
                shaderEditor.hidden = true;
                uniformList.hidden = false;
                break;
            }
        }
    });

    renderView = document.body.querySelector("render-view");
    renderView.addEventListener("resize", () =>
    {
        shader.setVector2("u_resolution", renderView.getWidth(), renderView.getHeight());
    });
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

function compile()
{
    addUniforms();

    shader.compile(shaderEditor.getCode());
    shader.use();

    setUniforms();
}

function render( time, deltaTime )
{
    shader.setFloat("u_time", time);
    shader.setFloat("u_deltaTime", deltaTime);
    setUniforms();

    quad.draw();
}

function addUniforms()
{
    shader.clearUniforms();

    let uniforms = uniformList.getUniforms();
    uniforms.forEach(uniform =>
    {
        let type = uniform.getType();
        let name = uniform.getName();
        shader.addUniform(type, name);
    });
}

function setUniforms()
{
    shader.setVector2("u_resolution", renderView.getWidth(), renderView.getHeight());

    let uniforms = uniformList.getUniforms();
    uniforms.forEach(uniform => setUniform(uniform));
}

function setUniform( uniformItem )
{
    let type = uniformItem.getType();
    let name = uniformItem.getName();
    let value = uniformItem.getValue();

    switch( type )
    {
        case "float": shader.setFloat(name, value); break;
    }
}