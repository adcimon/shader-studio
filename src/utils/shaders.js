"use strict";

const errorShader =
`
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}
`;

const defaultShader =
`// Reference: https://www.shadertoy.com/user/iq

void main()
{
    // Normalized pixel coordinates (from 0 to 1).
    vec2 uv = gl_FragCoord.xy / resolution;

    // Time varying pixel color.
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));

    // Output to screen.
    gl_FragColor = vec4(color, 1.0);
}
`;

export const Shaders =
{
    errorShader,
    defaultShader
};