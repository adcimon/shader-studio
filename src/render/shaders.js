const HeaderComment = "// Thank you for using Shader Studio!\n";

const ScreenTexcoordShader =
`
void main()
{
    gl_FragColor = vec4(v_texcoord.x, v_texcoord.y, 0, 1);
}
`;

const SineTimeShader =
`
void main()
{
    gl_FragColor = vec4(abs(sin(u_time)), 0.5, 0.5, 1);
}
`;

const Shaders =
[
    ScreenTexcoordShader,
    SineTimeShader
];

//export const ShaderSource = HeaderComment + Shaders[Math.floor(Math.random() * Shaders.length)];
export const ShaderSource = HeaderComment + Shaders[0];