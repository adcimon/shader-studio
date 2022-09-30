"use strict";

export class BaseElement extends HTMLElement
{
    constructor()
    {
        super();
    }

    setState( state )
    {
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
}