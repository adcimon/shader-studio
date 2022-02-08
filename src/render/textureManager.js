"use strict";

import { Texture } from './texture.js';

export function TextureManager( gl )
{
    let units = []; // (index, unit)
    let textures = { }; // (uuid, texture)
    let textureUnits = { }; // (uuid, unit)

    let initialize = function()
    {
        let maxTotalTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        console.log("Maximum total textures:", maxTotalTextures);
    
        let maxFragmentTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        console.log("Maximum fragment textures:", maxFragmentTextures);

        for( let i = 0; i < maxFragmentTextures; i++ )
        {
            units.push(false);
        }
    };

    let getTexture = function( uuid )
    {
        return textures[uuid];
    };

    let newTexture = function( uuid )
    {
        if( uuid in textures )
        {
            return null;
        }

        let texture = new Texture(gl);
        textures[uuid] = texture;

        return texture;
    };

    let deleteTexture = function( uuid )
    {
        if( !(uuid in textures) )
        {
            return false;
        }

        delete textures[uuid];
        if( uuid in textureUnits )
        {
            let unit = textureUnits[uuid];
            delete textureUnits[uuid];
            units[unit] = false;
        }

        return true;
    };

    let getUnit = function( uuid )
    {
        if( !(uuid in textures) )
        {
            return -1;
        }

        if( uuid in textureUnits )
        {
            return textureUnits[uuid];
        }

        let unit = units.findIndex(used => used === false);
        if( unit >= 0 )
        {
            console.log("Get texture unit", unit, "success");
            units[unit] = true;
            textureUnits[uuid] = unit;
            return unit;
        }
        else
        {
            console.log("Get texture unit", unit, "failure");
            return -1;
        }
    };

    let clearUnits = function()
    {
        for( let index in units )
        {
            units[index] = false;
        }

        textureUnits = { };
    };

    let updateTextures = function()
    {
        for( let uuid in textures )
        {
            let texture = textures[uuid];
            let unit = textureUnits[uuid];
            texture.update(unit);
        }
    };

    initialize();

    return {
        getTexture,
        newTexture,
        deleteTexture,
        getUnit,
        clearUnits,
        updateTextures
    };
}