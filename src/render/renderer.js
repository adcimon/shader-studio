"use strict";

export function Renderer( canvas )
{
    if( !(canvas instanceof HTMLCanvasElement) )
    {
        return null;
    }

    let gl = canvas.getContext("webgl");

    let handle = null;
    let time = 0;
    let lastUpdate = null;
    let callback= null;

    /**
     * Get the renderer WebGL context.
     */
    let getContext = function()
    {
        return gl;
    };

    /**
     * Clear color, depth and stencil buffers and set the viewport.
     */
    let render = function()
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    /**
     * Update the renderer time.
     */
    let update = function()
    {
        let now = window.Date.now();

        if( lastUpdate )
        {
            let deltaTime = (now - lastUpdate) / 1000; // seconds
            time += deltaTime;
            lastUpdate = now;
    
            render();
            callback(time, deltaTime);
        }
        else
        {
            lastUpdate = now;
        }
    };

    /**
     * Tick the renderer for 1 frame.
     */
    let tick = function()
    {
        update();
        handle = window.requestAnimationFrame(tick);
    };

    /**
     * Start the renderer.
     */
    let start = function( func )
    {
        if( handle )
        {
            console.log("Renderer is already rendering.");
            return false;
        }

        if( !(func instanceof Function) )
        {
            console.log("Renderer callback " + func + " is not a function.");
            return false;
        }
    
        callback = func;
        tick();

        return true;
    };

    /**
     * Stop the renderer.
     */
    let stop = function()
    {
        if( !handle )
        {
            return false;
        }

        window.cancelAnimationFrame(handle);
        handle = null;
        lastUpdate = null;

        return true;
    };

    return {
        getContext,
        start,
        stop
    };
}