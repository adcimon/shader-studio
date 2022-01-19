"use strict";

export function TextureUnits( size )
{
    let units = [];

    let initialize = function()
    {
        for( let i = 0; i < size; i++ )
        {
            units.push(false);
        }
    };

    let getUnit = function()
    {
        return units.findIndex(used => used === false);
    };

    let useUnit = function( unit )
    {
        if( units[unit] === true )
        {
            return false;
        }
        else
        {
            units[unit] = true;
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

    initialize();

    return {
        getUnit,
        useUnit,
        freeUnit
    };
}