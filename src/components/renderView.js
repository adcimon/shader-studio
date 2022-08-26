"use strict";

import * as THREE from '../../lib/three/build/three.module.js';

const renderViewHTML = /*html*/
`
<canvas class="block w-full h-full">
</canvas>
`;

export function RenderView( domElement )
{
    let root = null;

    let renderer = null;
    let scene = null;
    let camera = null;
    let material = null;

    let build = function()
    {
        const template = document.createElement("template");
        template.innerHTML = renderViewHTML;
        const fragment = template.content.cloneNode(true);
        root = fragment.firstElementChild;
        domElement.appendChild(root);
    }

    let initialize = function()
    {
        const canvas = root;

        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.autoClearColor = false;
    
        camera = new THREE.OrthographicCamera(
            -1, // left
            1,  // right
            1,  // top
            -1, // bottom
            -1, // near
            1,  // far
        );
    
        scene = new THREE.Scene();
        const plane = new THREE.PlaneBufferGeometry(2, 2);
    
        const uniforms =
        {
            iTime: { value: 0 },
            iResolution:  { value: new THREE.Vector2() },
        };
    
        material = new THREE.ShaderMaterial(
        {
            uniforms: uniforms,
        });

        scene.add(new THREE.Mesh(plane, material));

        function resizeRenderer( renderer )
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
    
            return needResize;
        }
    
        function render( time )
        {
            time *= 0.001; // Convert to seconds.
    
            resizeRenderer(renderer);
    
            const canvas = renderer.domElement;
            uniforms.iResolution.value.set(canvas.width, canvas.height);
            uniforms.iTime.value = time;
    
            renderer.render(scene, camera);
    
            window.requestAnimationFrame(render);
        }
    
        window.requestAnimationFrame(render);
    }

    let setShader = function( shader )
    {
        material.fragmentShader = shader;
    }

    build();
    initialize();

    return {
        setShader
    }
}