"use strict";

/**
 * Return a clone of the object.
 */
export function clone( object )
{
    return JSON.parse(JSON.stringify(object));
}

/**
 * Remove undefined and null values from the object.
 */
export function clean( object )
{
    Object.keys(object).forEach(function(key)
    {
        let value = object[key];
        let type = typeof value;

        if( type === "object" )
        {
            clean(value);

            if( !Object.keys(value).length )
            {
                delete object[key]
            }
        }
        else if( type === "undefined" || type === "null" )
        {
            delete object[key];
        }
    });
}

/**
 * Convert a color from hexadecimal (#ffffff) to normalized RGB.
 */
export function hexToRgb( color )
{
    const r = parseInt(color.substr(1, 2), 16) / 255.0;
    const g = parseInt(color.substr(3, 2), 16) / 255.0;
    const b = parseInt(color.substr(5, 2), 16) / 255.0;
    return [r, g, b];
}

/**
 * Generate a universally unique identifier.
 * Reference: RFC 4122 https://www.ietf.org/rfc/rfc4122.txt
 */
export function uuid()
{
    return uuidv4();
}
 
 /**
  * Generate a universally unique identifier v4.
  * Reference: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  */
function uuidv4()
{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * Download a text file.
 */
export function downloadTextFile( filename, text )
{
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
  
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}