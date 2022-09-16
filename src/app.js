"use strict";

function App()
{
    let loadTheme = function()
    {
        if( window.localStorage.getItem("theme") )
        {
            return window.localStorage.getItem("theme");
        }

        if( !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches )
        {
            return "dark";
        }

        return "light";
    }

    let saveTheme = function( value )
    {
        window.localStorage.setItem("theme", value);
    }

    let toggleTheme = function()
    {
        this.theme = (this.theme === "dark") ? "light" : "dark";
        saveTheme(this.theme);
    }

    let getUser = function()
    {
        return this.user;
    }

    let setUser = function( user )
    {
        this.user = user || "";
    }

    let getAvatar = function()
    {
        return "https://avatars.dicebear.com/api/bottts/" + this.user + ".svg"
    }

    this.theme = loadTheme();

    return {
        theme: "dark",
        user: "",
        toggleTheme,
        getUser,
        setUser,
        getAvatar
    }
}

document.addEventListener("alpine:init", () =>
{
    let app = new App();
    Alpine.store("app", app);
    window.app = Alpine.store("app");
});