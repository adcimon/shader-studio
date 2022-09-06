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
        time: { value: 0 },
        resolution:  { value: new THREE.Vector2() },
        mouse:  { value: new THREE.Vector2() },
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

    let addScalar = function( name, value )
    {
        if( name in uniforms )
        {
            return;
        }

        uniforms[name] = { value: value };
        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    let setScalar = function( name, value )
    {
        if( !(name in uniforms) )
        {
            return;
        }

        uniforms[name].value = value;
        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    let addColor = function( name, color )
    {
        if( name in uniforms )
        {
            return;
        }

        uniforms[name] = { value: new THREE.Color(color[0], color[1], color[2]) };
        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    let setColor = function( name, color )
    {
        if( !(name in uniforms) )
        {
            return;
        }

        uniforms[name].value = new THREE.Color(color[0], color[1], color[2]);
        material.uniforms = uniforms;
        material.needsUpdate = true;
    }

    init();

    return {
        setShader,
        addScalar,
        setScalar,
        addColor,
        setColor
    }
}