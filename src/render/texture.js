"use strict";

export function Texture( gl, unit )
{
    if( !(gl instanceof WebGLRenderingContext) )
    {
        return null;
    }

    let texture = gl.createTexture();
    let pixels = null;

    let initialize = function()
    {
        // Active the texture unit.
        gl.activeTexture(gl.TEXTURE0 + unit);

        // Bind the texture to the texture unit.
        gl.bindTexture(gl.TEXTURE_2D, texture);

        let target = gl.TEXTURE_2D;
        let level = 0;
        let internalFormat = gl.RGBA;
        let width = 1;
        let height = 1;
        let border = 0;
        let format = gl.RGBA;
        let type = gl.UNSIGNED_BYTE;
        let pixels = new Uint8Array([0, 0, 0, 255]);
        gl.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    };

    let setSource = function( source )
    {
        pixels = source;
    };

    let setMinFilter = function( filter )
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        let value = gl.NEAREST_MIPMAP_LINEAR;
    
        switch( filter )
        {
            case "linear": value = gl.LINEAR; break;
            case "nearest": value = gl.NEAREST; break;
            case "nearest_mipmap_nearest": value = gl.NEAREST_MIPMAP_NEAREST; break;
            case "linear_mipmap_nearest": value = gl.LINEAR_MIPMAP_NEAREST; break;
            case "nearest_mipmap_linear": value = gl.NEAREST_MIPMAP_LINEAR; break;
            case "linear_mipmap_linear": value = gl.LINEAR_MIPMAP_LINEAR; break;
        }
    
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, value);
    };

    let setMagFilter = function( filter )
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        let value = gl.LINEAR;
    
        switch( filter )
        {
            case "linear": value = gl.LINEAR; break;
            case "nearest": value = gl.NEAREST; break;
        }
    
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, value);
    };

    let setWrapS = function( wrap )
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        let value = gl.REPEAT;
    
        switch( wrap )
        {
            case "repeat": value = gl.REPEAT; break;
            case "clamp_to_edge": value = gl.CLAMP_TO_EDGE; break;
            case "mirrored_repeat": value = gl.MIRRORED_REPEAT; break;
        }
    
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, value);
    };

    let setWrapT = function( wrap )
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        let value = gl.REPEAT;
    
        switch( wrap )
        {
            case "repeat": value = gl.REPEAT; break;
            case "clamp_to_edge": value = gl.CLAMP_TO_EDGE; break;
            case "mirrored_repeat": value = gl.MIRRORED_REPEAT; break;
        }
    
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, value);
    };

    let update = function()
    {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Turn off mip maps and set wrapping to clamp to edge so it will work regardless of the dimensions of the video.
        // Needed in WebGL1 but not WebGL2 if the image is not power-of-2 in both dimensions.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        let target = gl.TEXTURE_2D;
        let level = 0;
        let internalFormat = gl.RGBA;
        let format = gl.RGBA;
        let type = gl.UNSIGNED_BYTE;
        gl.texImage2D(target, level, internalFormat, format, type, pixels);
    };

    initialize();

    return {
        setSource,
        setMinFilter,
        setMagFilter,
        setWrapS,
        setWrapT,
        update
    };
}