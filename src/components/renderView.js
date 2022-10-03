"use strict";

import { BaseElement } from './baseElement.js';
import { Shaders } from '../utils/shaders.js';
import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<div
    class="w-full h-full"
    x-show="visible">

    <div class="w-full h-full box-border">
        <div class="w-full h-full box-border resize overflow-hidden border border-gray-100 dark:border-gray-700" style="max-width:100%; max-height:100%;">
            <canvas class="w-full h-full box-border">
            </canvas>
        </div>
    </div>

</div>
`;

export class RenderView extends BaseElement
{
    renderer = null;
    scene = null;
    camera = null;

    material = null;
    mesh = null;

    fragmentShader = Shaders.errorShader;
    uniforms = { };

    constructor()
    {
        super();

        this.state =
        {
            visible: true,
            show: this.show.bind(this),
            hide: this.hide.bind(this)
        };
    }

    connectedCallback()
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));

        const canvas = this.querySelector("canvas");
        this.initRenderer(canvas);

        document.addEventListener("mousemove", (event) =>
        {
            this.uniforms.mouse.value.set(event.clientX, event.clientY);
        });

        this.setState(this.state);
    }

    show()
    {
        this.state.visible = true;
    }

    hide()
    {
        this.state.visible = false;
    }

    initRenderer( canvas )
    {
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.renderer.autoClearColor = false;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(
            -1, // left
            1,  // right
            1,  // top
            -1, // bottom
            -1, // near
            1,  // far
        );
    
        const plane = new THREE.PlaneBufferGeometry(2, 2);
        this.mesh = new THREE.Mesh(plane, null);

        this.uniforms = this.resetUniforms();
        this.compile();

        this.scene.add(this.mesh);
    
        window.requestAnimationFrame(this.render.bind(this));
    }

    resizeRenderer( renderer )
    {
        const canvas = renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        const needResize = (canvas.width !== width) || (canvas.height !== height);
        if( needResize )
        {
            renderer.setSize(width, height, false);

            // Dispatch resize event.
            let newEvent = new CustomEvent("resize", { detail: { width: width, height: height }});
            this.dispatchEvent(newEvent);
        }
    }

    render( time )
    {
        time *= 0.001; // Convert to seconds.

        this.resizeRenderer(this.renderer);

        const canvas = this.renderer.domElement;
        this.uniforms.time.value = time;
        this.uniforms.resolution.value.set(canvas.width, canvas.height);

        this.renderer.setClearColor(0, 0, 0, 1);
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render.bind(this));
    }

    compile( shader )
    {
        if( shader )
        {
            this.fragmentShader = shader;
        }

        this.material = new THREE.ShaderMaterial({ uniforms: this.uniforms });
        this.material.fragmentShader = this.fragmentShader;
        this.material.needsUpdate = true;
        this.mesh.material = this.material;
    }

    resetUniforms()
    {
        return {
            time:           { value: 0 },
            resolution:     { value: new THREE.Vector2() },
            mouse:          { value: new THREE.Vector2() },
        }
    }

    addUniform( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( name in this.uniforms )
        {
            return false;
        }

        switch( type )
        {
            case "int":
            case "float":
            {
                this.uniforms[name] = { value: value };
                break;
            }
            case "vec2":
            case "vec3":
            case "vec4":
            case "mat2":
            case "mat3":
            case "mat4":
            case "color":
            {
                this.uniforms[name] = { value: value.flat() };
                break;
            }
            case "image":
            {
                let texture = new THREE.Texture(value.image);
                texture.wrapS = value.wrapHorizontal;
                texture.wrapT = value.wrapVertical;
                texture.generateMipmaps = false;
                texture.needsUpdate = true;
                this.uniforms[name] = { value: texture };
                break;
            }
            case "webcam":
            {
                let texture = new THREE.VideoTexture(value.video);
                texture.wrapS = value.wrapHorizontal;
                texture.wrapT = value.wrapVertical;
                texture.generateMipmaps = false;
                texture.needsUpdate = true;
                this.uniforms[name] = { value: texture };
                break;
            }
            default:
            {
                return false;
            }
        }

        this.compile();

        return true;
    }

    setUniform( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( !(name in this.uniforms) )
        {
            return false;
        }

        switch( type )
        {
            case "int":
            case "float":
            {
                this.uniforms[name].value = value;
                break;
            }
            case "vec2":
            case "vec3":
            case "vec4":
            case "mat2":
            case "mat3":
            case "mat4":
            case "color":
            {
                this.uniforms[name].value = value.flat();
                break;
            }
            case "image":
            {
                // After the initial use of a texture, its dimensions, format, and type cannot be changed.
                // Instead, call .dispose() on the texture and instantiate a new one.

                let texture = this.uniforms[name].value;
                texture.dispose();
                delete this.uniforms[name];
                this.compile();

                const loader = new THREE.TextureLoader();
                loader.load(value.image.src,
                    ( texture ) =>
                    {
                        texture.wrapS = value.wrapHorizontal;
                        texture.wrapT = value.wrapVertical;
                        texture.generateMipmaps = false;
                        texture.needsUpdate = true;
                        this.uniforms[name] = { value: texture };
                        this.compile();
                    },
                    undefined,
                    ( error ) =>
                    {
                        console.log(error);
                    }
                );

                break;
            }
            case "webcam":
            {
                // After the initial use of a texture, its dimensions, format, and type cannot be changed.
                // Instead, call .dispose() on the texture and instantiate a new one.

                let texture = this.uniforms[name].value;
                texture.dispose();
                delete this.uniforms[name];
                this.compile();

                texture = new THREE.VideoTexture(value.video);
                texture.wrapS = value.wrapHorizontal;
                texture.wrapT = value.wrapVertical;
                texture.generateMipmaps = false;
                texture.needsUpdate = true;
                this.uniforms[name] = { value: texture };
                this.compile();

                break;
            }
            default:
            {
                return false;
            }
        }

        this.material.needsUpdate = true;

        return true;
    }

    deleteUniform( item )
    {
        let name = item.getName();

        if( !(name in this.uniforms) )
        {
            return false;
        }

        delete this.uniforms[name];
        this.compile();

        return true;
    }
}

window.customElements.define("render-view", RenderView);