"use strict";

import { Texture } from './texture.js';

export function TextureManager( gl, size )
{
    let units = [];
    let textures = { };

    let initialize = function()
    {
        for( let i = 0; i < size; i++ )
        {
            units.push(false);
        }
    };

    let getUnit = function()
    {
        let unit = units.findIndex(used => used === false);
        console.log("Texture manager get unit", unit);
        return unit;
    };

    let useUnit = function( unit )
    {
        if( units[unit] === true )
        {
            console.log("Texture manager use unit", unit, "used");
            return false;
        }
        else
        {
            units[unit] = true;
            console.log("Texture manager use unit", unit, "not used");
            return true;
        }
    };

    let freeUnit = function()
    {
        if( units[unit] === false )
        {
            return false;
        }
        else
        {
            units[unit] = false;
            return true;
        }
    };

    let newTexture = function( name )
    {
        if( name in textures )
        {
            return null;
        }

        let freeUnit = getUnit();
        if( freeUnit === -1 )
        {
            return null;
        }

        if( !useUnit(freeUnit) )
        {
            return null;
        }

        let texture = new Texture(gl, freeUnit);
        textures[name] = texture;

        return texture;
    };

    let getTexture = function( name )
    {
        return textures[name];
    };

    let updateTextures = function()
    {
        for( let name in textures )
        {
            let texture = textures[name];
            texture.update();
        }
    };

    initialize();

    return {
        newTexture,
        getTexture,
        updateTextures
    };
}