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

    let uniforms =
    {
        time:           { value: 0 },
        resolution:     { value: new THREE.Vector2() },
        mouse:          { value: new THREE.Vector2() },
    };

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
        material = new THREE.ShaderMaterial({ uniforms: uniforms });
        const mesh = new THREE.Mesh(plane, material);

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

        renderer.render(scene, camera);

        window.requestAnimationFrame(render);
    }

    let setShader = function( shader )
    {
        material.fragmentShader = shader;
        material.needsUpdate = true;
    }

    let addUniform = function( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( name in uniforms )
        {
            return;
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
            {
                uniforms[name] = { value: value.flat() };
                break;
            }
            case "color":
            {
                uniforms[name] = { value: new THREE.Color(value[0], value[1], value[2]) };
                break;
            }
            default:
            {
                return;
            }
        }

        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    let setUniform = function( item )
    {
        let name = item.getName();
        let type = item.getType();
        let value = item.getValue();

        if( !(name in uniforms) )
        {
            return;
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
            {
                uniforms[name].value = value.flat();
                break;
            }
            case "color":
            {
                uniforms[name].value = new THREE.Color(value[0], value[1], value[2]);
                break;
            }
            default:
            {
                return;
            }
        }

        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    init();

    return {
        setShader,
        addUniform,
        setUniform
    }
}