"use strict";

export function Shader( gl )
{
    if( !(gl instanceof WebGLRenderingContext) )
    {
        return null;
    }

    let precisions =
    {
        vertex:
        [
            //{ precision: "highp",       type: "int" },
            //{ precision: "highp",       type: "float" },
            //{ precision: "lowp",        type: "sampler2D" },
            //{ precision: "lowp",        type: "samplerCube" }
        ],

        fragment:
        [
            //{ precision: "mediump",     type: "int" },
            { precision: "mediump",     type: "float" },
            //{ precision: "lowp",        type: "sampler2D" },
            //{ precision: "lowp",        type: "samplerCube" }
        ]
    };

    let attributes = 
    {
        position:           { type: "vec3",     name: "a_position" },
        textureCoordinate:  { type: "vec2",     name: "a_texcoord" }
    };

    let varyings =
    {
        textureCoordinate:  { type: "vec2",     name: "v_texcoord" }
    };

    let uniforms =
    {
        time:               { type: "float",    name: "u_time" },
        deltaTime:          { type: "float",    name: "u_deltaTime" },
        resolution:         { type: "vec2",     name: "u_resolution" }
    };

    let vertexSource = null;
    let fragmentSource = null;
    let program = null;

    /**
     * Create the vertex source code.
     */
    let createVertexSource = function()
    {
        let source = "";
        source += "void main()" + "\n";
        source += "{" + "\n";
        source += "\t" + "gl_Position = vec4(" + attributes.position.name + ", 1.0);" + "\n";
        source += "\t" + varyings.textureCoordinate.name + " = " + attributes.textureCoordinate.name + ";" + "\n";
        source += "}" + "\n";

        return source;
    };

    /**
     * Set vertex attributes.
     */
    let setAttributes = function()
    {
        let a = "";

        for( let key in attributes )
        {
            let attribute = attributes[key];
            a += "attribute " + attribute.type + " " + attribute.name + ";" + "\n";
        }

        a += "\n";
        vertexSource = a + vertexSource;
    };

    /**
     * Set vertex and fragment varyings.
     */
    let setVaryings = function()
    {
        let v = "";

        for( let key in varyings )
        {
            let varying = varyings[key];
            v += "varying " + varying.type + " " + varying.name + ";" + "\n";
        }

        v += "\n";
        vertexSource = v + vertexSource;
        fragmentSource = v + fragmentSource;
    };

    /**
     * Set fragment uniforms.
     */
    let setUniforms = function()
    {
        let u = "";

        for( let key in uniforms )
        {
            let uniform = uniforms[key];
            u += "uniform " + uniform.type + " " + uniform.name + ";" + "\n";
        }

        u += "\n";
        fragmentSource = u + fragmentSource;
    };

    /**
     * Set vertex and fragment precision.
     */
    let setPrecision = function()
    {
        // Vertex.
        let p = "";
        for( let key in precisions.vertex )
        {
            let precision = precisions.vertex[key];
            p += "precision " + precision.precision + " " + precision.type + ";" + "\n";
        }

        p += "\n";
        vertexSource = p + vertexSource;

        // Fragment.
        p = "";
        for( let key in precisions.fragment )
        {
            let precision = precisions.fragment[key];
            p += "precision " + precision.precision + " " + precision.type + ";" + "\n";
        }

        p += "\n";
        fragmentSource = p + fragmentSource;
    };

    /**
     * Create a shader given the source code string and the gl type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER).
     */
    let createShader = function( source, type )
    {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);

        gl.compileShader(shader);
        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if( !compiled )
        {
            let log = gl.getShaderInfoLog(shader);
            console.log(log);
            return null;
        }

        return shader;
    };

    /**
     * Create a program.
     */
    let createProgram = function()
    {
        let program = gl.createProgram();

        gl.validateProgram(program);
        if( gl.getProgramParameter(program, gl.LINK_STATUS) )
        {
            let log = gl.getProgramInfoLog(program);
            console.log(log);
            return;
        }

        return program;
    };

    /**
     * Delete the program.
     */
    let deleteProgram = function()
    {
        if( program )
        {
            gl.deleteProgram(program);
        }
    };

    /**
     * Compile the specified fragment shader.
     */
    let compile = function( source )
    {
        deleteProgram();

        // Create the program.
        program = createProgram();
    
        // Generate vertex and fragment sources.
        vertexSource = createVertexSource();
        fragmentSource = source;
        setUniforms();
        setVaryings();
        setAttributes();
        setPrecision();
    
        // Create the vertex shader.
        let vertexShader = createShader(vertexSource, gl.VERTEX_SHADER);
        if( !vertexShader )
        {
            return false;
        }

        // Create the fragment shader.
        let fragmentShader = createShader(fragmentSource, gl.FRAGMENT_SHADER);
        if( !fragmentShader )
        {
            return false;
        }
    
        // Attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
    
        // Delete the shaders.
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    
        // Link the program.
        gl.linkProgram(program);

        console.log(vertexSource);
        console.log(fragmentSource);

        return true;
    };

    /**
     * Use the shader.
     */
    let use = function()
    {
        if( program )
        {
            gl.useProgram(program);
        }
    };

    /**
     * Get the vertex position attribute name.
     */
    let getPositionAttribute = function()
    {
        return attributes.position.name;
    };

    /**
     * Get the vertex texture coordinate attribute name.
     */
    let getTextureCoordinateAttribute = function()
    {
        return attributes.textureCoordinate.name;
    };

    /**
     * Get the shader program.
     */
    let getProgram = function()
    {
        return program;
    };

    /**
     * Add a uniform.
     */
    let addUniform = function( type, name )
    {
        if( name === "" || uniforms[name] )
        {
            return;
        }

        uniforms[name] = { };
        uniforms[name]["type"] = type;
        uniforms[name]["name"] = name;
    };

    /**
     * Set a int uniform value.
     */
    let setInt = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform1i(uniform, value);
    };

    /**
     * Set a float uniform value.
     */
    let setFloat = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform1f(uniform, value);
    };

    /**
     * Set a vector2 uniform value.
     */
    let setVector2 = function( name, value0, value1 )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform2f(uniform, value0, value1);
    };

    /**
     * Set a texture uniform value.
     */
    let setTexture = function( name, texture )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform1i(uniform, texture.unit);
    };

    return {
        compile,
        use,
        getPositionAttribute,
        getTextureCoordinateAttribute,
        getProgram,
        addUniform,
        setInt,
        setFloat,
        setVector2,
        setTexture
    };
}