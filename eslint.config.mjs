import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import importHelpersPlugin from 'eslint-plugin-import-helpers';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPerfPlugin from 'eslint-plugin-react-perf';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import babelParser from '@babel/eslint-parser';

export default [
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            '.next',
            '**/.next/**',
        ],
    },

    {

        files: ['**/*.js'],

        languageOptions: {
            parser: babelParser,
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },

                // ✅ O lugar CORRETO do plugin JSX
                babelOptions: {
                    plugins: ['@babel/plugin-syntax-jsx'],
                },
            },
        },


        plugins: {
            import: importPlugin,
            'import-helpers': importHelpersPlugin,
            'react-hooks': reactHooksPlugin,
            'react-perf': reactPerfPlugin,
            'jsx-a11y': jsxA11yPlugin,
            react: reactPlugin,
            '@next/next': nextPlugin,
            'unused-imports': unusedImportsPlugin,
        },

        rules: {
            // ----------- BASE STYLE -----------
            indent: ['error', 4],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', { before: false, after: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],

            // Consistência
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-template': 'error',

            'no-console': 'warn',
            'no-debugger': 'error',

            // ----------- IMPORTS -----------
            'no-duplicate-imports': 'error',
            'import/no-cycle': 'warn',

            'import-helpers/order-imports': [
                'warn',
                {
                    newlinesBetween: 'always',
                    groups: [
                        ['/^react$/'],
                        'module',
                        '/^~/',
                        ['parent', 'sibling', 'index'],
                    ],
                    alphabetize: {
                        order: 'asc',
                        ignoreCase: true,
                    },
                },
            ],

            // ----------- REACT -----------
            // JSX apenas em .js
            'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],

            'react/display-name': 'off',

            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/no-unescaped-entities': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useAsync)' }],

            // React Performance
            'react-perf/jsx-no-new-object-as-prop': 'error',
            'react-perf/jsx-no-new-array-as-prop': 'error',

            // Proíbe funções inline no JSX
            'react/jsx-no-bind': [
                'warn',
                {
                    ignoreDOMComponents: false,
                    ignoreRefs: false,
                    allowArrowFunctions: false,
                    allowFunctions: false,
                    allowBind: false,
                },
            ],

            // ----------- NEXT.JS -----------
            '@next/next/no-html-link-for-pages': 'off',
            '@next/next/no-head-element': 'warn',
            '@next/next/no-document-import-in-page': 'error',
            '@next/next/no-sync-scripts': 'warn',
            '@next/next/no-duplicate-head': 'error',

            // ----------- A11Y -----------
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        },
    },
];
