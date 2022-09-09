"use strict";

import * as THREE from '../../lib/three/build/three.module.js';

const html = /*html*/
`
<canvas class="block w-full h-full">
</canvas>
`;

export function RenderView( domElement )
{
    let renderer = null;
    let scene = null;
    let camera = null;
    let material = null;
    let mesh = null;

    let fragmentShader = "";
    let uniforms = { };

    let init = function()
    {
        const elements = createElements(html, domElement);
        const canvas = elements[0];

        window.threeVersion = THREE.REVISION;

        initRenderer(canvas);

        document.addEventListener("mousemove", (event) =>
        {
            uniforms.mouse.value.set(event.clientX, event.clientY);
        });
    }

    let initRenderer = function( canvas )
    {
        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.autoClearColor = false;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(
            -1, // left
            1,  // right
            1,  // top
            -1, // bottom
            -1, // near
            1,  // far
        );
    
        const plane = new THREE.PlaneBufferGeometry(2, 2);
        mesh = new THREE.Mesh(plane, null);

        uniforms = resetUniforms();
        compile();

        scene.add(mesh);
    
        window.requestAnimationFrame(render);
    }

    let resizeRenderer = function( renderer )
    {
        const canvas = renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const needResize = canvas.width !== width || canvas.height !== height;
        if( needResize )
        {
            renderer.setSize(width, height, false);
        }
    }

    let render = function( time )
    {
        time *= 0.001; // Convert to seconds.

        resizeRenderer(renderer);

        const canvas = renderer.domElement;
        uniforms.time.value = time;
        uniforms.resolution.value.set(canvas.width, canvas.height);

        renderer.setClearColor(0, 0, 0, 1);
        renderer.render(scene, camera);

        window.requestAnimationFrame(render);
    }

    let compile = function( shader )
    {
        if( shader )
        {
            fragmentShader = shader;
        }

        material = new THREE.ShaderMaterial({ uniforms: uniforms });
        material.fragmentShader = fragmentShader;
        material.needsUpdate = true;
        mesh.material = material;
    }

    let resetUniforms = function()
    {
        return {
            time:           { value: 0 },
            resolution:     { value: new THREE.Vector2() },
            mouse:          { value: new THREE.Vector2() },
        }
    }

    let addUniform = function( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( name in uniforms )
        {
            return false;
        }

        switch( type )
        {
            case "int":
            case "float":
            {
                uniforms[name] = { value: value };
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
                uniforms[name] = { value: value.flat() };
                break;
            }
            case "image":
            {
                let texture = new THREE.Texture(value.image);
                texture.generateMipmaps = false;
                texture.needsUpdate = true;
                uniforms[name] = { value: texture };
                break;
            }
            default:
            {
                return false;
            }
        }

        compile();

        return true;
    }

    let setUniform = function( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( !(name in uniforms) )
        {
            return false;
        }

        switch( type )
        {
            case "int":
            case "float":
            {
                uniforms[name].value = value;
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
                uniforms[name].value = value.flat();
                break;
            }
            case "image":
            {
                // let texture = uniforms[name].value;
                // texture.image = value.image;
                // texture.needsUpdate = true;

                // After the initial use of a texture, its dimensions, format, and type cannot be changed.
                // Instead, call .dispose() on the texture and instantiate a new one.

                let texture = uniforms[name].value;
                texture.dispose();
                delete uniforms[name];
                compile();

                texture = new THREE.Texture(value.image);
                texture.generateMipmaps = false;
                texture.needsUpdate = true;
                uniforms[name] = { value: texture };
                compile();

                break;
            }
            default:
            {
                return false;
            }
        }

        material.needsUpdate = true;

        return true;
    }

    let deleteUniform = function( item )
    {
        let name = item.getName();

        if( !(name in uniforms) )
        {
            return false;
        }

        delete uniforms[name];
        compile();

        return true;
    }

    init();

    return {
        compile,
        addUniform,
        setUniform,
        deleteUniform
    }
}