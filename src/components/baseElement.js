"use strict";

export class BaseElement extends HTMLElement
{
    constructor()
    {
        super();
    }

    createElement( html )
    {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));
    }

    setState( state )
    {
        if( !state )
        {
            state = { };
        }

        // Add default show/hide functionality.
        state.visible = true;
        state.show = this.show.bind(this);
        state.hide = this.hide.bind(this);
        this.setAttribute("x-show", "visible");

        if( !window.Alpine )
        {
            document.addEventListener("alpine:init", () =>
            {
                this.setState(state);
                window.Alpine.initTree(this);
            });

            return;
        }

        this.state = window.Alpine.reactive(state);
        window.Alpine.addScopeToNode(this, this.state);
    }

    show()
    {
        this.state.visible = true;
    }

    hide()
    {
        this.state.visible = false;
    }
}