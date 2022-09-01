"use strict";

/**
 * Return a clone of the object.
 */
function clone( object )
{
    return JSON.parse(JSON.stringify(object));
}

/** 
 * Return a function, that, as long as it continues to be invoked, will not be executed until N milliseconds have passed.
 */
function debounce( func, wait, immediate )
{
    let timeout;
    return function()
    {
        let context = this;
        let args = arguments;

        let later = function()
        {
            timeout = null;
            if( !immediate )
            {
                func.apply(context, args);
            }
        };

        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if( callNow )
        {
            func.apply(context, args);
        }
    };
}

/**
 * Convert a color from hexadecimal (#ffffff) to normalized RGB.
 */
function hexToRgb( color )
{
    const r = parseInt(color.substr(1, 2), 16) / 255.0;
    const g = parseInt(color.substr(3, 2), 16) / 255.0;
    const b = parseInt(color.substr(5, 2), 16) / 255.0;
    return [r, g, b];
}

/**
 * Convert a color from normalized RGB to hexadecimal (#ffffff).
 */
function rgbToHex( r, g, b )
{
    function componentToHex( c )
    {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r * 255) + componentToHex(g * 255) + componentToHex(b * 255);
}

/**
 * Generate a universally unique identifier.
 * Reference: RFC 4122 https://www.ietf.org/rfc/rfc4122.txt
 */
function uuid()
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

    /*
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c)
    {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    */
}

/**
 * Download a text file.
 */
function downloadTextFile( filename, text )
{
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
  
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

/**
 * Create an array of HTMLElement given a string.
 * If a DOM element is provided, the elements are appended to the DOM element.
 */
function createElements( html, domElement = null )
{
    const template = document.createElement("template");
    template.innerHTML = html;
    const fragment = template.content;
    let elements = Array.from(fragment.children);

    if( domElement )
    {
        domElement.appendCollection(fragment.children);
    }

    return elements;
}

/**
 * Return the elements that match the specified selector.
 */
HTMLElement.prototype.query = function( selector )
{
    let elements = this.querySelectorAll(selector);
    return (elements.length === 1) ? elements[0] : elements;
}

/**
 * Enable the HTMLElement.
 */
HTMLElement.prototype.enable = function( recursively )
{
    this.disabled = false;

    if( recursively )
    {
        for( let i = 0; i < this.children.length; i++ )
        {
            let child = this.children[i];
            child.enable(recursively);
        }
    }
}

/**
 * Disable the HTMLElement.
 */
HTMLElement.prototype.disable = function( recursively )
{
    this.disabled = true;

    if( recursively )
    {
        for( let i = 0; i < this.children.length; i++ )
        {
            let child = this.children[i];
            child.disable(recursively);
        }
    }
}

/**
 * Show the HTMLElement.
 */
HTMLElement.prototype.show = function()
{
    this.hidden = false;
}

/**
 * Hide the HTMLElement.
 */
HTMLElement.prototype.hide = function()
{
    this.hidden = true;
}

/** 
 * Get / Set the innerHTML of the HTMLElement.
 */
HTMLElement.prototype.html = function( str )
{
    if( !str )
    {
        return this.innerHTML;
    }

    this.innerHTML = str;

    return this;
}

/** 
 * Get / Set the innerText of the HTMLElement.
 */
HTMLElement.prototype.text = function( str )
{
    if( !str )
    {
        return this.textContent;
    }

    this.innerText = str;

    return this;
}

/** 
 * Prepend the HTMLElement to another HTMLElement sibling.
 */
HTMLElement.prototype.prepend = function( sibling )
{
    if( sibling instanceof HTMLElement )
    {
        this.parentNode.insertBefore(sibling, this);
    }

    return this;
}

/** 
 * Remove the HTMLElement.
 */
HTMLElement.prototype.remove = function()
{
    this.parentNode.removeChild(this);
}

/** 
 * Remove all the children of the HTMLElement.
 */
HTMLElement.prototype.removeChildren = function()
{
    let child = this.firstElementChild;
    while( child )
    {
        this.removeChild(child);
        child = this.firstElementChild;
    }
}

/** 
 * Add an event listener to the HTMLElement.
 */
HTMLElement.prototype.on = function( event, callback, options )
{
    this.addEventListener(event, callback, options);
    return this;
}

/** 
 * Remove an event listener from the HTMLElement.
 */
HTMLElement.prototype.off = function( event, callback, options )
{
    this.removeEventListener(event, callback, options);
    return this;
}

/** 
 * Dispatch an event on the HTMLElement.
 */
HTMLElement.prototype.emit = function( event, args = null )
{
    this.dispatchEvent(event, new CustomEvent(event, { detail: args }));
    return this;
}

/**
 * Append an HTMLCollection to the Element.
 */
Element.prototype.appendCollection = function( collection )
{
    if( !(collection instanceof HTMLCollection) )
    {
        return;
    }

    for( let i = 0; i < collection.length; i++ )
    {
        let element = collection[i];
        this.append(element);
    }
}