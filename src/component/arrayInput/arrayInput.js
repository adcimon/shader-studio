"use strict";

const css = `<link type="text/css" rel="stylesheet" href="./src/component/arrayInput/style.css">`;

const html = `
<button class="array-button">
    <svg viewBox="0 0 512 512">
        <rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
    </svg>
</button>
<div class="array-view" hidden>
    <table>
        <tr>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
        <tr>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
        </tr>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
        </tr>
        <td><input></input></td>
        <td><input></input></td>
        <td><input></input></td>
        <td><input></input></td>
    </table>
</div>
`;

export class ArrayInput extends HTMLElement
{
    arrayButton = null;
    arrayView = null;

    constructor()
    {
        super();

        const template = document.createElement("template");
        template.innerHTML = css + html;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback()
    {
        this.arrayButton = this.shadowRoot.querySelector(".array-button");
        this.arrayView = this.shadowRoot.querySelector(".array-view");

        this.arrayButton.addEventListener("click", () =>
        {
            this.arrayView.hidden = !this.arrayView.hidden;
        });
    }

    disconnectedCallback()
    {
    }
}

window.customElements.define("array-input", ArrayInput);