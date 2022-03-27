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

    let newUniforms = { };
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
     * Add vertex attributes.
     */
    let addAttributes = function( source )
    {
        let a = "";
        Object.values(attributes).forEach(attribute =>
        {
            a += "attribute " + attribute.type + " " + attribute.name + ";" + "\n";
        });
        a += (Object.values(attributes).length > 0) ? "\n" : "";

        return a + source;
    };

    /**
     * Add vertex and fragment varyings.
     */
    let addVaryings = function( source )
    {
        let v = "";
        Object.values(varyings).forEach(varying =>
        {
            v += "varying " + varying.type + " " + varying.name + ";" + "\n";
        });
        v += (Object.values(varyings).length > 0) ? "\n" : "";

        return v + source;
    };

    /**
     * Add fragment uniforms.
     */
    let addUniforms = function( source )
    {
        let u = "";
        Object.values(uniforms).forEach(uniform =>
        {
            u += "uniform " + uniform.type + " " + uniform.name + ";" + "\n";
        });
        u += (Object.values(uniforms).length > 0) ? "\n" : "";

        return u + source;
    };

    /**
     * Add new fragment uniforms.
     */
    let addNewUniforms = function( source )
    {
        let u = "";
        Object.values(newUniforms).forEach(uniform =>
        {
            u += "uniform " + uniform.type + " " + uniform.name + ";" + "\n";
        });
        u += (Object.values(newUniforms).length > 0) ? "\n" : "";

        return u + source;
    }

    /**
     * Add vertex precision.
     */
    let addVertexPrecision = function( source )
    {
        let p = "";
        precisions.vertex.forEach(precision =>
        {
            p += "precision " + precision.precision + " " + precision.type + ";" + "\n";
        });
        p += (Object.values(precisions.vertex).length > 0) ? "\n" : "";

        return p + source;
    };

    /**
     * Add fragment precision.
     */
    let addFragmentPrecision = function( source )
    {
        let p = "";
        precisions.fragment.forEach(precision =>
        {
            p += "precision " + precision.precision + " " + precision.type + ";" + "\n";
        });
        p += (Object.values(precisions.fragment).length > 0) ? "\n" : "";

        return p + source;
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
     * Generate vertex and fragment sources.
     */
    let generate = function( source )
    {
        let vert = createVertexSource();
        let frag = source;

        frag = addNewUniforms(frag);
        frag = addUniforms(frag);
        vert = addVaryings(vert);
        frag = addVaryings(frag);
        vert = addAttributes(vert);
        vert = addVertexPrecision(vert);
        frag = addFragmentPrecision(frag);

        return {
            vert,
            frag
        };
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
        let { vert, frag } = generate(source);
    
        // Create the vertex shader.
        let vertexShader = createShader(vert, gl.VERTEX_SHADER);
        if( !vertexShader )
        {
            return false;
        }

        // Create the fragment shader.
        let fragmentShader = createShader(frag, gl.FRAGMENT_SHADER);
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

        console.log(vert);
        console.log(frag);

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
     * Get the shader program.
     */
    let getProgram = function()
    {
        return program;
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
     * Add a uniform.
     */
    let addUniform = function( type, name )
    {
        if( typeof name !== "string" || name === "" || (name in newUniforms) )
        {
            return;
        }

        newUniforms[name] = { };
        newUniforms[name]["type"] = type;
        newUniforms[name]["name"] = name;
    };

    /**
     * Remove a uniform.
     */
    let removeUniform = function( name )
    {
        if( typeof name !== "string" || name === "" || !(name in newUniforms) )
        {
            return;
        }

        delete newUniforms[name];
    };

    /**
     * Clear the uniforms.
     */
    let clearUniforms = function()
    {
        newUniforms = { };
    };

    /**
     * Set an int uniform value.
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
     * Set a vec2 uniform value.
     */
    let setVector2 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform2fv(uniform, value);
    };

    /**
     * Set a vec3 uniform value.
     */
    let setVector3 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform3fv(uniform, value);
    };

    /**
     * Set a vec4 uniform value.
     */
    let setVector4 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform4fv(uniform, value);
    };

    /**
     * Set a mat2x2 uniform value.
     */
    let setMatrix2x2 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniformMatrix2fv(uniform, false, value);
    };

    /**
     * Set a mat3x3 uniform value.
     */
    let setMatrix3x3 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniformMatrix3fv(uniform, false, value);
    };

    /**
     * Set a mat4x4 uniform value.
     */
    let setMatrix4x4 = function( name, value )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniformMatrix4fv(uniform, false, value);
    };

    /**
     * Set a texture uniform value.
     */
    let setTexture = function( name, unit )
    {
        let uniform = gl.getUniformLocation(program, name);
        gl.uniform1i(uniform, unit);
    };

    return {
        generate,
        compile,
        use,
        getProgram,
        getPositionAttribute,
        getTextureCoordinateAttribute,
        addUniform,
        removeUniform,
        clearUniforms,
        setInt,
        setFloat,
        setVector2,
        setVector3,
        setVector4,
        setMatrix2x2,
        setMatrix3x3,
        setMatrix4x4,
        setTexture
    };
}