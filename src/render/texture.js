"use strict";

import { WrapMode } from "./wrapMode.js";

export function Texture( gl )
{
    if( !(gl instanceof WebGLRenderingContext) )
    {
        return null;
    }

    let texture = gl.createTexture();
    let pixels = null;

    let minFilter = gl.LINEAR;
    let magFilter = gl.LINEAR;
    let wrapHorizontal = gl.CLAMP_TO_EDGE;
    let wrapVertical = gl.CLAMP_TO_EDGE;
    let verticalFlip = false;

    let setSource = function( source )
    {
        // Validate source type.
        if( source instanceof HTMLImageElement || source instanceof HTMLVideoElement )
        {
            pixels = source;
        }
    };

    let setMinFilter = function( filter )
    {  
        let value = gl.NEAREST;
        switch( filter )
        {
            case "nearest": value = gl.NEAREST; break;
            case "linear": value = gl.LINEAR; break;
        }

        minFilter = value;
    };

    let setMagFilter = function( filter )
    {   
        let value = gl.NEAREST;
        switch( filter )
        {
            case "nearest": value = gl.NEAREST; break;
            case "linear": value = gl.LINEAR; break;
        }

        magFilter = value;
    };

    /**
     * Set the horizontal wrapping function for texture coordinate s (u).
     */
    let setWrapHorizontal = function( wrapMode )
    {    
        let value = gl.REPEAT;
        switch( wrapMode )
        {
            case WrapMode.Repeat:           value = gl.REPEAT;              break;
            case WrapMode.ClampToEdge:      value = gl.CLAMP_TO_EDGE;       break;
            case WrapMode.MirroredRepeat:   value = gl.MIRRORED_REPEAT;     break;
        }

        wrapHorizontal = value;

        console.log("Horizontal wrap mode", wrapMode, wrapHorizontal);
    };

    /**
     * Set the vertical wrapping function for texture coordinate t (v).
     */
    let setWrapVertical = function( wrapMode )
    {    
        let value = gl.REPEAT;
        switch( wrapMode )
        {
            case WrapMode.Repeat:           value = gl.REPEAT;              break;
            case WrapMode.ClampToEdge:      value = gl.CLAMP_TO_EDGE;       break;
            case WrapMode.MirroredRepeat:   value = gl.MIRRORED_REPEAT;     break;
        }

        wrapVertical = value;

        console.log("Vertical wrap mode", wrapMode, wrapVertical);
    };

    let flip = function( enable )
    {
        verticalFlip = enable;
    };

    let update = function( unit )
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapHorizontal);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapVertical);
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, verticalFlip);

        // Turn off mip maps. Allowed modes are gl.NEAREST and gl.LINEAR (default is gl.NEAREST_MIPMAP_LINEAR).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Set wrapping to clamp to edge so it will work regardless of the dimensions of the video.
        // Needed in WebGL1 but not WebGL2 if the image is not power-of-2 in both dimensions.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        let target = gl.TEXTURE_2D;
        let level = 0;
        let internalFormat = gl.RGBA;
        let format = gl.RGBA;
        let type = gl.UNSIGNED_BYTE;
        //let pixels = new Uint8Array([0, 0, 0, 255]);

        if( pixels instanceof HTMLImageElement || pixels instanceof HTMLVideoElement )
        {
            gl.texImage2D(target, level, internalFormat, format, type, pixels);
        }
    };

    return {
        setSource,
        setMinFilter,
        setMagFilter,
        setWrapHorizontal,
        setWrapVertical,
        flip,
        update
    };
}