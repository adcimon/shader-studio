// https://microsoft.github.io/monaco-editor/monarch.html

"use strict";

const keywords =
[
    'abs',
    'acos',
    'acosh',
    'all',
    'any',
    'asin',
    'asinh',
    'atan',
    'atanh',
    'bool',
    'break',
    'bvec2',
    'bvec3',
    'bvec4',
    'case',
    'ceil',
    'clamp',
    'const',
    'continue',
    'cos',
    'cosh',
    'cross ',
    'dFdx',
    'dFdy',
    'degrees',
    'determinant',
    'discard',
    'distance',
    'do',
    'dot',
    'else',
    'equal',
    'exp',
    'exp2',
    'faceforward',
    'false',
    'float',
    'floatBitsToInt',
    'floatBitsToUint',
    'floor',
    'for',
    'fract',
    'fwidth',
    'greaterThan',
    'greaterThanEqual',
    'if',
    'in',
    'inout',
    'int',
    'intBitsToFloat',
    'invariant',
    'inverse',
    'inversesqrt',
    'isinf',
    'isnan',
    'ivec2',
    'ivec3',
    'ivec4',
    'length',
    'lessThan ',
    'lessThanEqual',
    'log',
    'log2',
    'mat2',
    'mat2x2',
    'mat2x3',
    'mat2x4',
    'mat3',
    'mat3x2',
    'mat3x3',
    'mat3x4',
    'mat4',
    'mat4x2',
    'mat4x3',
    'mat4x4',
    'matrixCompMult',
    'max',
    'min',
    'mix',
    'mod',
    'modf',
    'normalize',
    'not',
    'notEqual',
    'out',
    'outerProduct',
    'packHalf2x16',
    'packSnorm2x16',
    'packUnorm2x16',
    'pow',
    'radians',
    'reflect',
    'refract',
    'return',
    'round',
    'roundEven',
    'sampler2D',
    'sampler3D',
    'samplerCube',
    'sign',
    'sin',
    'sinh',
    'smoothstep',
    'sqrt',
    'step',
    'struct',
    'switch',
    'tan',
    'tanh',
    'texelFetch',
    'texelFetchOffset',
    'texture',
    'textureGrad',
    'textureGradOffset',
    'textureLod',
    'textureLodOffset',
    'textureProj',
    'textureProjGrad',
    'textureProjLod',
    'textureProjLodOffset',
    'textureSize',
    'transpose',
    'true',
    'trunc',
    'uint',
    'uintBitsToFloat',
    'uniform',
    'unpackHalf2x16',
    'unpackSnorm2x16',
    'unpackUnorm2x16',
    'uvec2',
    'uvec3',
    'uvec4',
    'vec2',
    'vec3',
    'vec4',
    'void',
    'while',
];

const operators =
[
    '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>='
];

const language =
{
    tokenPostfix: '.glsl',
    defaultToken: 'invalid',
    keywords,
    operators,
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /([uU](ll|LL|l|L)|(ll|LL|l|L)?[uU]?)/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,

    tokenizer:
    {
        root:
        [
            // Identifiers and keywords.
            [
                /[a-zA-Z_]\w*/,
                {
                    cases:
                    {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }
            ],

            // Preprocessor directive (#define).
            [/^\s*#\s*\w+/, 'keyword.directive'],

            // Whitespace.
            { include: '@whitespace' },

            // Delimiters and operators.
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/,
            {
                cases:
                {
                    '@operators': 'operator',
                    '@default': ''
                }
            }],

            // Numbers.
            [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
            [/\d[\d']*\d(@integersuffix)/, 'number'],
            [/\d(@integersuffix)/, 'number'],

            // Delimiter: after number because of .\d floats.
            [/[;,.]/, 'delimiter']
        ],

        comment:
        [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ['\\*/', 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],

        // Does it have strings?
        string:
        [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/,
            {
                token: 'string.quote',
                bracket: '@close',
                next: '@pop'
            }]
        ],

        whitespace:
        [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment']
        ]
    }
};

monaco.languages.register({ id: "glsl" });
monaco.languages.setMonarchTokensProvider("glsl", language);