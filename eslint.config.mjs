import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
    js.configs.recommended,
    prettierConfig,
]);
