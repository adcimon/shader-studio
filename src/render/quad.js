"use strict";

export function Quad( gl )
{
    if( !(gl instanceof WebGLRenderingContext) )
    {
        return null;
    }

    let vertices = [1, 1, 0, 1, -1, 0, -1, -1, 0, -1, 1, 0];
    let indices = [0, 1, 2, 0, 2, 3];
    let textureCoordinates = [1, 0, 1, 1, 0, 1, 0, 0];

    let vertexBuffer = null;
    let indexBuffer = null;
    let texcoordBuffer = null;

    let createBuffers = function()
    {
        // Vertex buffer.
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined);

        // Index buffer.
        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, undefined);

        // Texture coordinate buffer.
        texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
    };

    let bindBuffers = function( shader )
    {
        // Vertex buffer.
        let positionAttribute = gl.getAttribLocation(shader.getProgram(), shader.getPositionAttribute());
        let size = 3;
        let type = gl.FLOAT;
        let normalized = false;
        let stride = 0;
        let offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionAttribute, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(positionAttribute);

        // Index buffer.
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // Texture coordinate buffer.
        let texcoordAttribute = gl.getAttribLocation(shader.getProgram(), shader.getTextureCoordinateAttribute());
        size = 2;
        type = gl.FLOAT;
        normalized = false;
        stride = 0;
        offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.vertexAttribPointer(texcoordAttribute, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(texcoordAttribute);
    };

    let draw = function()
    {
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };

    let deleteBuffers = function()
    {
        gl.deleteBuffer(vertexBuffer);
        gl.deleteBuffer(indexBuffer);
        gl.deleteBuffer(texcoordBuffer);
    };

    createBuffers();

    return {
        bindBuffers,
        draw,
        deleteBuffers
    };
}