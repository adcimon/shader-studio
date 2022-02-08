"use strict";

import { Renderer } from './render/renderer.js';
import { TextureManager } from './render/textureManager.js';
import { Shader } from './render/shader.js';
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
import { WebcamInput } from './component/webcamInput/webcamInput.js';
import { TextureInput } from './component/textureInput/textureInput.js';

var renderView, editorView, navigationMenu, shaderEditor, uniformList;
var gl, renderer, textureManager, shader, quad;

window.addEventListener("load", main);

function main()
{
    initializeInterface();
    initializeRenderer();

    renderView.resize();
}

function initializeInterface()
{
    // Editor view.
    editorView = document.body.querySelector("editor-view");
    editorView.addEventListener("compile", compile);

    // Shader editor.
    shaderEditor = document.body.querySelector("shader-editor");
    shaderEditor.setCode(ShaderSource);

    // Uniform list.
    uniformList = document.body.querySelector("uniform-list");
    uniformList.addEventListener("adduniform", (event) =>
    {
        event.detail.uniformItem.addEventListener("typechange", () =>
        {
            let item = event.detail.uniformItem;
            textureManager.deleteTexture(item.getUuid());
            shader.removeUniform(item.getName());
            addUniform(item);
            setUniform(item);
        });

        event.detail.uniformItem.addEventListener("valuechange", () =>
        {
            let item = event.detail.uniformItem;
            setUniform(item);
        });
    });
    uniformList.addEventListener("removeuniform", (event) =>
    {
        let item = event.detail.uniformItem;
        textureManager.deleteTexture(item.getUuid());
        shader.removeUniform(item.getName());
    });

    // Navigation menu.
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

    // Render view.
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

    // Texture manager.
    textureManager = new TextureManager(gl);

    // Shader.
    shader = new Shader(gl);
    compile();
    setUniforms();

    // Quad.
    quad = new Quad(gl);
    quad.bindBuffers(shader);

    renderer.start(render);
}

function render( time, deltaTime )
{
    shader.setFloat("u_time", time);
    shader.setFloat("u_deltaTime", deltaTime);

    textureManager.updateTextures();

    quad.draw();
}

function compile()
{
    textureManager.clearUnits();

    addUniforms();

    shader.compile(shaderEditor.getCode());
    shader.use();

    setUniforms();
}

function addUniforms()
{
    shader.clearUniforms();

    let items = uniformList.getUniforms();
    items.forEach(item => addUniform(item));
}

function addUniform( item )
{
    let type = item.getType();
    let name = item.getName();

    switch( type )
    {
        case "webcam":
        {
            shader.addUniform("sampler2D", name);
            break;
        }
        default:
        {
            shader.addUniform(type, name);
            break;
        }
    }
}

function setUniforms()
{
    shader.setVector2("u_resolution", [renderView.getWidth(), renderView.getHeight()]);

    let items = uniformList.getUniforms();
    items.forEach(item => setUniform(item));
}

function setUniform( item )
{
    let uuid = item.getUuid();
    let type = item.getType();
    let name = item.getName();
    let value = item.getValue();

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
        case "webcam":
        {
            let texture = textureManager.getTexture(uuid) || textureManager.newTexture(uuid);
            let unit = textureManager.getUnit(uuid);
            texture.setSource(value.video);
            shader.setTexture(name, unit);
            break;
        }
    }
}