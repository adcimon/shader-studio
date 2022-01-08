"use strict";

import { Renderer } from './render/renderer.js';
import { Shader } from './render/shader.js';
import { Texture } from './render/texture.js';
import { Quad } from './render/quad.js';
import { ShaderSource } from './render/shaders.js';

import { MainView } from './component/mainView/mainView.js';
import { RenderView } from './component/renderView/renderView.js';
import { EditorView } from './component/editorView/editorView.js';
import { NavigationMenu } from './component/navigationMenu/navigationMenu.js';
import { ShaderEditor } from './component/shaderEditor/shaderEditor.js';
import { UniformList } from './component/uniformList/uniformList.js';
import { UniformItem } from './component/uniformItem/uniformItem.js';
import { MatrixInput } from './component/matrixInput/matrixInput.js';

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
    shaderEditor.setCode(ShaderSource);

    uniformList = document.body.querySelector("uniform-list");
    uniformList.addEventListener("adduniform", (event) =>
    {
        event.detail.uniformItem.addEventListener("typechange", () =>
        {
            let uniformItem = event.detail.uniformItem;

            shader.removeUniform(uniformItem.getName());
            addUniform(uniformItem);

            if( uniformItem.getName() !== "" )
            {
                compile();
            }

            setUniform(uniformItem);
        });

        event.detail.uniformItem.addEventListener("valuechange", () =>
        {
            let uniformItem = event.detail.uniformItem;
            setUniform(uniformItem);
        });
    });
    uniformList.addEventListener("removeuniform", (event) =>
    {
        let uniformItem = event.detail.uniformItem;
        shader.removeUniform(uniformItem.getName());
        compile();
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
        shader.setVector2("u_resolution", [renderView.getWidth(), renderView.getHeight()]);
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

    quad.draw();
}

function addUniform( uniformItem )
{
    let type = uniformItem.getType();
    let name = uniformItem.getName();
    shader.addUniform(type, name);
}

function addUniforms()
{
    shader.clearUniforms();

    let uniformItems = uniformList.getUniforms();
    uniformItems.forEach(uniform => addUniform(uniform));
}

function setUniform( uniformItem )
{
    let type = uniformItem.getType();
    let name = uniformItem.getName();
    let value = uniformItem.getValue();

    switch( type )
    {
        case "int":     shader.setInt(name, value);                 break;
        case "float":   shader.setFloat(name, value);               break;
        case "vec2":    shader.setVector2(name, value);             break;
        case "vec3":    shader.setVector3(name, value);             break;
        case "vec4":    shader.setVector4(name, value);             break;
        case "mat2":    shader.setMatrix2x2(name, value.flat(2));   break;
        case "mat3":    shader.setMatrix3x3(name, value.flat(2));   break;
        case "mat4":    shader.setMatrix4x4(name, value.flat(2));   break;
    }
}

function setUniforms()
{
    shader.setVector2("u_resolution", [renderView.getWidth(), renderView.getHeight()]);

    let uniformItems = uniformList.getUniforms();
    uniformItems.forEach(uniform => setUniform(uniform));
}