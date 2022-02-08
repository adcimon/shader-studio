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

const WebcamShader =
`
void main()
{
    vec4 c = texture2D(u_frame, v_texcoord);
    gl_FragColor = c;
}
`;

const WebcamMixShader =
`
void main()
{
    vec4 c1 = texture2D(u_frame1, v_texcoord);
    vec4 c2 = texture2D(u_frame2, v_texcoord);

    gl_FragColor = mix(c1, c2, x);
}
`;

const Shaders =
[
    ScreenTexcoordShader,
    SineTimeShader,
    WebcamShader,
    WebcamMixShader,
];

//export const ShaderSource = HeaderComment + Shaders[Math.floor(Math.random() * Shaders.length)];
export const ShaderSource = HeaderComment + Shaders[0];