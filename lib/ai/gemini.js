const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../../config/config');

let genAI = null;
let geminiModel = null;

function initializeGemini() {
  if (!config.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not found in environment variables. AI features will be disabled.');
    return false;
  }
  
  try {
    genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    geminiModel = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
      systemInstruction: `hey ai you have to create a readme.md file content in the form of markdown i will provide you my project folder sturcture which will have all the files and directories in the proper hierarchy you have to read the structure you have to give short description about the project like what it does, what dependencies it has for dependency you can check package.json. you have to give information about the environment variables as we don't have any .env file you should track where ever you get pocess.env there is an environment variable like process.env.PORT here PORT is my environment variable. Also give instruction for cloning the project. And give all the information that are required in a general readme.md file. I will pass project structure as a prompt
      Very Important: follow the format i provided for folder structure in the markdown in following example use "-" in markdown as shown in example 
      Examples:

      <example>
      project structure= [
  {
    name: '.gitignore',
    path: '.gitignore',
    type: 'file',
    extension: '',
    content: '# Logs\n' +
      'logs\n' +
      '*.log\n' +
      'npm-debug.log*\n' +
      'yarn-debug.log*\n' +
      'yarn-error.log*\n' +
      'pnpm-debug.log*\n' +
      'lerna-debug.log*\n' +
      '\n' +
      'node_modules\n' +
      'dist\n' +
      'dist-ssr\n' +
      '*.local\n' +
      '\n' +
      '# Editor directories and files\n' +
      '.vscode/*\n' +
      '!.vscode/extensions.json\n' +
      '.idea\n' +
      '.DS_Store\n' +
      '*.suo\n' +
      '*.ntvs*\n' +
      '*.njsproj\n' +
      '*.sln\n' +
      '*.sw?\n'
  },
  {
    name: 'eslint.config.js',
    path: 'eslint.config.js',
    type: 'file',
    extension: '.js',
    content: "import js from '@eslint/js'\n" +
      "import globals from 'globals'\n" +
      "import reactHooks from 'eslint-plugin-react-hooks'\n" +
      "import reactRefresh from 'eslint-plugin-react-refresh'\n" +
      '\n' +
      'export default [\n' +
      "  { ignores: ['dist'] },\n" +
      '  {\n' +
      "    files: ['**/*.{js,jsx}'],\n" +
      '    languageOptions: {\n' +
      '      ecmaVersion: 2020,\n' +
      '      globals: globals.browser,\n' +
      '      parserOptions: {\n' +
      "        ecmaVersion: 'latest',\n" +
      '        ecmaFeatures: { jsx: true },\n' +
      "        sourceType: 'module',\n" +
      '      },\n' +
      '    },\n' +
      '    plugins: {\n' +
      "      'react-hooks': reactHooks,\n" +
      "      'react-refresh': reactRefresh,\n" +
      '    },\n' +
      '    rules: {\n' +
      '      ...js.configs.recommended.rules,\n' +
      '      ...reactHooks.configs.recommended.rules,\n' +
      "      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],\n" +
      "      'react-refresh/only-export-components': [\n" +
      "        'warn',\n" +
      '        { allowConstantExport: true },\n' +
      '      ],\n' +
      '    },\n' +
      '  },\n' +
      ']\n'
  },
  {
    name: 'index.html',
    path: 'index.html',
    type: 'file',
    extension: '.html',
    content: '<!doctype html>\n' +
      '<html lang="en">\n' +
      '  <head>\n' +
      '    <meta charset="UTF-8" />\n' +
      '    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
      '    <title>Vite + React</title>\n' +
      '  </head>\n' +
      '  <body>\n' +
      '    <div id="root"></div>\n' +
      '    <script type="module" src="/src/main.jsx"></script>\n' +
      '  </body>\n' +
      '</html>\n'
  },
  {
    name: 'package-lock.json',
    path: 'package-lock.json',
    type: 'file',
    extension: '.json',
    content: '{\n' +
      '  "name": "car-details",\n' +
      '  "version": "0.0.0",\n' +
      '  "lockfileVersion": 3,\n' +
      '  "requires": true,\n' +
      '  "packages": {\n' +
      '    "": {\n' +
      '      "name": "car-details",\n' +
      '      "version": "0.0.0",\n' +
      '      "dependencies": {\n' +
      '        "@tailwindcss/vite": "^4.1.3",\n' +
      '        "lucide-react": "^0.487.0",\n' +
      '        "react": "^19.0.0",\n' +
      '        "react-dom": "^19.0.0",\n' +
      '        "tailwindcss": "^4.1.3"\n' +
      '      },\n' +
      '      "devDependencies": {\n' +
      '        "@eslint/js": "^9.21.0",\n' +
      '        "@types/react": "^19.0.10",\n' +
      '        "@types/react-dom": "^19.0.4",\n' +
      '        "@vitejs/plugin-react": "^4.3.4",\n' +
      '        "eslint": "^9.21.0",\n' +
      '        "eslint-plugin-react-hooks": "^5.1.0",\n' +
      '        "eslint-plugin-react-refresh": "^0.4.19",\n' +
      '        "globals": "^15.15.0",\n' +
      '        "vite": "^6.2.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@ampproject/remapping": {\n' +
      '      "version": "2.3.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",\n' +
      '      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@jridgewell/gen-mapping": "^0.3.5",\n' +
      '        "@jridgewell/trace-mapping": "^0.3.24"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.0.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/code-frame": {\n' +
      '      "version": "7.26.2",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.26.2.tgz",\n' +
      '      "integrity": "sha512-RJlIHRueQgwWitWgF8OdFYGZX328Ax5BCemNGlqHfplnRT9ESi8JkFlvaVYbS+UubVY6dpv87Fs2u5M29iNFVQ==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/helper-validator-identifier": "^7.25.9",\n' +
      '        "js-tokens": "^4.0.0",\n' +
      '        "picocolors": "^1.0.0"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/compat-data": {\n' +
      '      "version": "7.26.8",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.26.8.tgz",\n' +
      '      "integrity": "sha512-oH5UPLMWR3L2wEFLnFJ1TZXqHufiTKAiLfqw5zkhS4dKXLJ10yVztfil/twG8EDTA4F/tvVNw9nOl4ZMslB8rQ==",\n' +
      '      "dev": true,\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/core": {\n' +
      '      "version": "7.26.10",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.26.10.tgz",\n' +
      '      "integrity": "sha512-vMqyb7XCDMPvJFFOaT9kxtiRh42GwlZEg1/uIgtZshS5a/8OaduUfCi7kynKgc3Tw/6Uo2D+db9qBttghhmxwQ==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@ampproject/remapping": "^2.2.0",\n' +
      '        "@babel/code-frame": "^7.26.2",\n' +
      '        "@babel/generator": "^7.26.10",\n' +
      '        "@babel/helper-compilation-targets": "^7.26.5",\n' +
      '        "@babel/helper-module-transforms": "^7.26.0",\n' +
      '        "@babel/helpers": "^7.26.10",\n' +
      '        "@babel/parser": "^7.26.10",\n' +
      '        "@babel/template": "^7.26.9",\n' +
      '        "@babel/traverse": "^7.26.10",\n' +
      '        "@babel/types": "^7.26.10",\n' +
      '        "convert-source-map": "^2.0.0",\n' +
      '        "debug": "^4.1.0",\n' +
      '        "gensync": "^1.0.0-beta.2",\n' +
      '        "json5": "^2.2.3",\n' +
      '        "semver": "^6.3.1"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      },\n' +
      '      "funding": {\n' +
      '        "type": "opencollective",\n' +
      '        "url": "https://opencollective.com/babel"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/generator": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.27.0.tgz",\n' +
      '      "integrity": "sha512-VybsKvpiN1gU1sdMZIp7FcqphVVKEwcuj02x73uvcHE0PTihx1nlBcowYWhDwjpoAXRv43+gDzyggGnn1XZhVw==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/parser": "^7.27.0",\n' +
      '        "@babel/types": "^7.27.0",\n' +
      '        "@jridgewell/gen-mapping": "^0.3.5",\n' +
      '        "@jridgewell/trace-mapping": "^0.3.25",\n' +
      '        "jsesc": "^3.0.2"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-compilation-targets": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.0.tgz",\n' +
      '      "integrity": "sha512-LVk7fbXml0H2xH34dFzKQ7TDZ2G4/rVTOrq9V+icbbadjbVxxeFeDsNHv2SrZeWoA+6ZiTyWYWtScEIW07EAcA==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/compat-data": "^7.26.8",\n' +
      '        "@babel/helper-validator-option": "^7.25.9",\n' +
      '        "browserslist": "^4.24.0",\n' +
      '        "lru-cache": "^5.1.1",\n' +
      '        "semver": "^6.3.1"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-module-imports": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.25.9.tgz",\n' +
      '      "integrity": "sha512-tnUA4RsrmflIM6W6RFTLFSXITtl0wKjgpnLgXyowocVPrbYrLUXSBXDgTs8BlbmIzIdlBySRQjINYs2BAkiLtw==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/traverse": "^7.25.9",\n' +
      '        "@babel/types": "^7.25.9"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-module-transforms": {\n' +
      '      "version": "7.26.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.26.0.tgz",\n' +
      '      "integrity": "sha512-xO+xu6B5K2czEnQye6BHA7DolFFmS3LB7stHZFaOLb1pAwO1HWLS8fXA+eh0A2yIvltPVmx3eNNDBJA2SLHXFw==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/helper-module-imports": "^7.25.9",\n' +
      '        "@babel/helper-validator-identifier": "^7.25.9",\n' +
      '        "@babel/traverse": "^7.25.9"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      },\n' +
      '      "peerDependencies": {\n' +
      '        "@babel/core": "^7.0.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-plugin-utils": {\n' +
      '      "version": "7.26.5",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.26.5.tgz",\n' +
      '      "integrity": "sha512-RS+jZcRdZdRFzMyr+wcsaqOmld1/EqTghfaBGQQd/WnRdzdlvSZ//kF7U8VQTxf1ynZ4cjUcYgjVGx13ewNPMg==",\n' +
      '      "dev": true,\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-string-parser": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.25.9.tgz",\n' +
      '      "integrity": "sha512-4A/SCr/2KLd5jrtOMFzaKjVtAei3+2r/NChoBNoZ3EyP/+GlhoaEGoWOZUmFmoITP7zOJyHIMm+DYRd8o3PvHA==",\n' +
      '      "dev": true,\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-validator-identifier": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.25.9.tgz",\n' +
      '      "integrity": "sha512-Ed61U6XJc3CVRfkERJWDz4dJwKe7iLmmJsbOGu9wSloNSFttHV0I8g6UAgb7qnK5ly5bGLPd4oXZlxCdANBOWQ==",\n' +
      '      "dev": true,\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helper-validator-option": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.25.9.tgz",\n' +
      '      "integrity": "sha512-e/zv1co8pp55dNdEcCynfj9X7nyUKUXoUEwfXqaZt0omVOmDe9oOTdKStH4GmAw6zxMFs50ZayuMfHDKlO7Tfw==",\n' +
      '      "dev": true,\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/helpers": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.27.0.tgz",\n' +
      '      "integrity": "sha512-U5eyP/CTFPuNE3qk+WZMxFkp/4zUzdceQlfzf7DdGdhp+Fezd7HD+i8Y24ZuTMKX3wQBld449jijbGq6OdGNQg==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/template": "^7.27.0",\n' +
      '        "@babel/types": "^7.27.0"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/parser": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.27.0.tgz",\n' +
      '      "integrity": "sha512-iaepho73/2Pz7w2eMS0Q5f83+0RKI7i4xmiYeBmDzfRVbQtTOG7Ts0S4HzJVsTMGI9keU8rNfuZr8DKfSt7Yyg==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/types": "^7.27.0"\n' +
      '      },\n' +
      '      "bin": {\n' +
      '        "parser": "bin/babel-parser.js"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.0.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/plugin-transform-react-jsx-self": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.25.9.tgz",\n' +
      '      "integrity": "sha512-y8quW6p0WHkEhmErnfe58r7x0A70uKphQm8Sp8cV7tjNQwK56sNVK0M73LK3WuYmsuyrftut4xAkjjgU0twaMg==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/helper-plugin-utils": "^7.25.9"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      },\n' +
      '      "peerDependencies": {\n' +
      '        "@babel/core": "^7.0.0-0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/plugin-transform-react-jsx-source": {\n' +
      '      "version": "7.25.9",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.25.9.tgz",\n' +
      '      "integrity": "sha512-+iqjT8xmXhhYv4/uiYd8FNQsraMFZIfxVSqxxVSZP0WbbSAWvBXAul0m/zu+7Vv4O/3WtApy9pmaTMiumEZgfg==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/helper-plugin-utils": "^7.25.9"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      },\n' +
      '      "peerDependencies": {\n' +
      '        "@babel/core": "^7.0.0-0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/template": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.0.tgz",\n' +
      '      "integrity": "sha512-2ncevenBqXI6qRMukPlXwHKHchC7RyMuu4xv5JBXRfOGVcTy1mXCD12qrp7Jsoxll1EV3+9sE4GugBVRjT2jFA==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/code-frame": "^7.26.2",\n' +
      '        "@babel/parser": "^7.27.0",\n' +
      '        "@babel/types": "^7.27.0"\n' +
      '      },\n' +
      '      "engines": {\n' +
      '        "node": ">=6.9.0"\n' +
      '      }\n' +
      '    },\n' +
      '    "node_modules/@babel/traverse": {\n' +
      '      "version": "7.27.0",\n' +
      '      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.27.0.tgz",\n' +
      '      "integrity": "sha512-19lYZFzYVQkkHkl4Cy4WrAVcqBkgvV2YM2TU3xG6DIwO7O3ecbDPfW3yM3bjAGcqcQHi+CCtjMR3dIEHxsd6bA==",\n' +
      '      "dev": true,\n' +
      '      "dependencies": {\n' +
      '        "@babel/code-frame": "^7.26.2",\n' +
      '        "@babel/generator": "^7.27.0",\n' +
      ' '... 94544 more characters
  },
  {
    name: 'package.json',
    path: 'package.json',
    type: 'file',
    extension: '.json',
    content: '{\n' +
      '  "name": "car-details",\n' +
      '  "private": true,\n' +
      '  "version": "0.0.0",\n' +
      '  "type": "module",\n' +
      '  "scripts": {\n' +
      '    "dev": "vite",\n' +
      '    "build": "vite build",\n' +
      '    "lint": "eslint .",\n' +
      '    "preview": "vite preview"\n' +
      '  },\n' +
      '  "dependencies": {\n' +
      '    "@tailwindcss/vite": "^4.1.3",\n' +
      '    "lucide-react": "^0.487.0",\n' +
      '    "react": "^19.0.0",\n' +
      '    "react-dom": "^19.0.0",\n' +
      '    "tailwindcss": "^4.1.3"\n' +
      '  },\n' +
      '  "devDependencies": {\n' +
      '    "@eslint/js": "^9.21.0",\n' +
      '    "@types/react": "^19.0.10",\n' +
      '    "@types/react-dom": "^19.0.4",\n' +
      '    "@vitejs/plugin-react": "^4.3.4",\n' +
      '    "eslint": "^9.21.0",\n' +
      '    "eslint-plugin-react-hooks": "^5.1.0",\n' +
      '    "eslint-plugin-react-refresh": "^0.4.19",\n' +
      '    "globals": "^15.15.0",\n' +
      '    "vite": "^6.2.0"\n' +
      '  }\n' +
      '}\n'
  },
  {
    name: 'public',
    path: 'public',
    type: 'directory',
    children: [ [Object] ]
  },
  {
    name: 'src',
    path: 'src',
    type: 'directory',
    children: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  {
    name: 'vercel.json',
    path: 'vercel.json',
    type: 'file',
    extension: '.json',
    content: '{\r\n' +
      '    "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]\r\n' +
      '}'
  },
  {
    name: 'vite.config.js',
    path: 'vite.config.js',
    type: 'file',
    extension: '.js',
    content: "import { defineConfig } from 'vite'\n" +
      "import react from '@vitejs/plugin-react'\n" +
      "import tailwindcss from '@tailwindcss/vite'\n" +
      '\n' +
      '// https://vite.dev/config/\n' +
      'export default defineConfig({\n' +
      '  \n' +
      '  plugins: [\n' +
      '    tailwindcss(),\n' +
      '    react()\n' +
      '  ],\n' +
      '})\n'
  }
] 

response = "# car-details

The \`car-details\` project is a React application for browsing, searching, and filtering car information. It allows users to view car details based on mock data and offers filtering capabilities.

This application provides a user interface for exploring car specifications such as make, model, and fuel type. It uses React for the frontend, Tailwind CSS for styling, and Lucide React for icons. Key features include browsing car details from mock data, filtering cars by various criteria, and a responsive design suitable for different devices. The application structure includes components like \`CarDetails\`, \`CarList\`, \`FilterPanel\`, and \`Navbar\` for a structured user experience.

## Key Features

The project utilizes React 19 with Vite as a build tool. Tailwind CSS 4 is used for styling, and Lucide React provides icons. The frontend architecture comprises reusable React components and utilizes mock data stored in \`mockData.js\`. The project leverages modern JavaScript features and ESLint for code quality.

## Project Structure

This is a frontend project.

Key directories and files include:

## Project Structure

\`\`\`
car-details/
├── public/
├── src/
│   ├── components/
│   │   ├── CarDetails.jsx
│   │   ├── CarList.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Navbar.jsx
│   │   └── WishlistPanel.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── mockData.js
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
\`\`\`

## Technologies Used

### Frontend

- **@vitejs/plugin-react**
- **eslint-plugin-react-hooks**
- **eslint-plugin-react-refresh**
- **lucide-react**
- **react**
- **react-dom**
- **@eslint/js**
- **@tailwindcss/vite**
- **eslint**
- **globals**
- **tailwindcss**
- **vite**

## Getting Started

### Prerequisites

- Node.js (recommended version: 18.x or later)
- npm or yarn

### Installation

1. Clone the repository

   \`\`\`bash
   git clone https://github.com/yourusername/car-details.git
   cd car-details
   \`\`\`

2. Setup the frontend

   \`\`\`bash
   cd car-details
   npm install
   npm run dev
   \`\`\`

## Usage

After starting the frontend server:

The application will be available at: \`http://localhost:3000\`

> Note: The actual port may vary based on project configuration."

</example>

Important: here all objects you see in children are the subfolder or sub files for example src has one of its children name: 'App.jsx',
    path: 'src\\App.jsx',
    type: 'file',
    extension: '.jsx',
    content: '\n' +
      "import React, { useState, useEffect } from 'react';\n" +
      "import Navbar from './components/Navbar';\n" +
      "import CarList from './components/CarList';\n" +
      "import WishlistPanel from './components/WishlistPanel';\n" +
      "import FilterPanel from './components/FilterPanel';\n" +
      "import { ThemeProvider } from './contexts/ThemeContext';\n" +
      "import { fetchCars } from './api';\n" +
      '\n' +
      'function App() {\n' +
      '  const [cars, setCars] = useState([]);\n' +
      '  const [filteredCars, setFilteredCars] = useState([]);\n' +
      '  const [wishlist, setWishlist] = useState([]);\n' +
      '  const [loading, setLoading] = useState(true);\n' +
      '  const [error, setError] = useState(null);\n' +
      '  const [currentPage, setCurrentPage] = useState(1);\n' +
      '  const [showWishlist, setShowWishlist] = useState(false);\n' +
      '  const [filters, setFilters] = useState({\n' +
      "    brand: '',\n" +
      "    minPrice: '',\n" +
      "    maxPrice: '',\n" +
      "    fuelType: '',\n" +
      "    seats: ''\n" +
      '  });\n' +
      "  const [searchQuery, setSearchQuery] = useState('');\n" +
      "  const [sortType, setSortType] = useState('');\n" +
      '\n' +
      '  const carsPerPage = 10;\n' +
      '\n' +
      '  // Fetch cars from API\n' +
      '  useEffect(() => {\n' +
      '    const loadCars = async () => {\n' +
      '      try {\n' +
      '        setLoading(true);\n' +
      '        const data = await fetchCars();\n' +
      '        setCars(data.cars || []);\n' +
      '        setFilteredCars(data.cars || []);\n' +
      '      } catch (err) {\n' +
      "        setError('Failed to load cars. Please try again later.');\n" +
      '        console.error("Error fetching cars:", err);\n' +
      '      } finally {\n' +
      '        setLoading(false);\n' +
      '      }\n' +
      '    };\n' +
      '\n' +
      '    loadCars();\n' +
      '  }, []);\n' +
      '\n' +
      '  // Load wishlist from localStorage\n' +
      '  useEffect(() => {\n' +
      "    const savedWishlist = localStorage.getItem('carFinderWishlist');\n" +
      '    if (savedWishlist) {\n' +
      '      try {\n' +
      '        setWishlist(JSON.parse(savedWishlist));\n' +
      '      } catch (e) {\n' +
      '        console.error("Error parsing wishlist from localStorage:", e);\n' +
      "        localStorage.removeItem('carFinderWishlist');\n" +
      '      }\n' +
      '    }\n' +
      '  }, []);\n' +
      '\n' +
      '  // Save wishlist to localStorage when it changes\n' +
      '  useEffect(() => {\n' +
      "    localStorage.setItem('carFinderWishlist', JSON.stringify(wishlist));\n" +
      '  }, [wishlist]);\n' +
      '\n' +
      '  // Filter cars based on selected filters and search query\n' +
      '  useEffect(() => {\n' +
      '    if (!cars.length) return;\n' +
      '\n' +
      '    let result = [...cars];\n' +
      '\n' +
      '    // Apply search query\n' +
      '    if (searchQuery) {\n' +
      '      const query = searchQuery.toLowerCase();\n' +
      '      result = result.filter(car => \n' +
      '        car.name.toLowerCase().includes(query) || \n' +
      '        car.brand.toLowerCase().includes(query) ||\n' +
      '        car.fuelType.toLowerCase().includes(query)\n' +
      '      );\n' +
      '    }\n' +
      '\n' +
      '    // Apply filters\n' +
      '    if (filters.brand) {\n' +
      '      result = result.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());\n' +
      '    }\n' +
      '    \n' +
      '    if (filters.minPrice) {\n' +
      '      result = result.filter(car => car.price >= Number(filters.minPrice));\n' +
      '    }\n' +
      '    \n' +
      '    if (filters.maxPrice) {\n' +
      '      result = result.filter(car => car.price <= Number(filters.maxPrice));\n' +
      '    }\n' +
      '    \n' +
      '    if (filters.fuelType) {\n' +
      '      result = result.filter(car => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase());\n' +
      '    }\n' +
      '    \n' +
      '    if (filters.seats) {\n' +
      '      result = result.filter(car => car.seats === Number(filters.seats));\n' +
      '    }\n' +
      '\n' +
      '    // Apply sorting\n' +
      "    if (sortType === 'price-asc') {\n" +
      '      result.sort((a, b) => a.price - b.price);\n' +
      "    } else if (sortType === 'price-desc') {\n" +
      '      result.sort((a, b) => b.price - a.price);\n' +
      '    }\n' +
      '\n' +
      '    setFilteredCars(result);\n' +
      '    setCurrentPage(1); // Reset to first page on filter change\n' +
      '  }, [cars, filters, searchQuery, sortType]);\n' +
      '\n' +
      '  // Pagination logic\n' +
      '  const indexOfLastCar = currentPage * carsPerPage;\n' +
      '  const indexOfFirstCar = indexOfLastCar - carsPerPage;\n' +
      '  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);\n' +
      '  const totalPages = Math.ceil(filteredCars.length / carsPerPage);\n' +
      '\n' +
      '  // Wishlist functions\n' +
      '  const toggleWishlist = (car) => {\n' +
      '    const isInWishlist = wishlist.some(item => item.id === car.id);\n' +
      '    \n' +
      '    if (isInWishlist) {\n' +
      '      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== car.id));\n' +
      '    } else {\n' +
      '      setWishlist(prevWishlist => [...prevWishlist, car]);\n' +
      '    }\n' +
      '  };\n' +
      '\n' +
      '  const isInWishlist = (carId) => {\n' +
      '    return wishlist.some(item => item.id === carId);\n' +
      '  };\n' +
      '\n' +
      '  // Function to handle search query changes\n' +
      '  const handleSearch = (query) => {\n' +
      '    setSearchQuery(query);\n' +
      '  };\n' +
      '\n' +
      '  // Function to handle filter changes\n' +
      '  const handleFilterChange = (newFilters) => {\n' +
      '    setFilters(newFilters);\n' +
      '  };\n' +
      '\n' +
      '  return (\n' +
      '    <ThemeProvider>\n' +
      '      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ">\n' +
      '        <Navbar \n' +
      '          onSearch={handleSearch} \n' +
      '          wishlistCount={wishlist.length} \n' +
      '          toggleWishlist={() => setShowWishlist(!showWishlist)}\n' +
      '          showingWishlist={showWishlist}\n' +
      '        />\n' +
      '        \n' +
      '        <div className="container mx-auto px-4 py-8">\n' +
      '          <div className="flex flex-col md:flex-row gap-6">\n' +
      '            <FilterPanel \n' +
      '              filters={filters} \n' +
      '              onFilterChange={handleFilterChange}\n' +
      '              onSortChange={(type) => setSortType(type)}\n' +
      '              sortType={sortType}\n' +
      '            />\n' +
      '            \n' +
      '            <div className="flex-1">\n' +
      '              {showWishlist ? (\n' +
      '                <WishlistPanel \n' +
      '                  wishlist={wishlist} \n' +
      '                  removeFromWishlist={(carId) => {\n' +
      '                    const carToRemove = wishlist.find(car => car.id === carId);\n' +
      '                    if (carToRemove) {\n' +
      '                      toggleWishlist(carToRemove);\n' +
      '                    }\n' +
      '                  }}\n' +
      '                />\n' +
      '              ) : (\n' +
      '                <CarList \n' +
      '                  cars={currentCars} \n' +
      '                  loading={loading}\n' +
      '                  error={error}\n' +
      '                  toggleWishlist={toggleWishlist}\n' +
      '                  isInWishlist={isInWishlist}\n' +
      '                  currentPage={currentPage}\n' +
      '                  totalPages={totalPages}\n' +
      '                  onPageChange={setCurrentPage}\n' +
      '                />\n' +
      '              )}\n' +
      '            </div>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </ThemeProvider>\n' +
      '  );\n' +
      '}\n' +
      '\n' +
      'export default App;'
  },
you can add some extra things if necessary in readme file

      `
    });
    console.log('Gemini AI initialized successfully.');
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
    return false;
  }
}

async function enhanceWithAI(project, rootDir) {
  if (!geminiModel) {
    console.warn('Gemini AI not initialized. Skipping AI enhancement.');
    return;
  }
  
  console.log('Enhancing project analysis with Gemini AI...');
  
  try {
      const prompt = `This is my project folder structure:\n${JSON.stringify(project.structure, null, 2)}\n\nPlease generate a README.md based on the instructions in the system prompt.`;

      const result = await geminiModel.generateContent(prompt);
      const readmeContent = await result.response.text();

      const cleanMarkdown = readmeContent
      .replace(/^```markdown\s*/, '')  // remove starting ```markdown
      .replace(/```$/, '')             // remove ending ```
      .trim();  
    return cleanMarkdown;
  } catch (error) {
    console.error('Error using Gemini AI:', error);
  }
}

module.exports = {
  initializeGemini,
  enhanceWithAI
};