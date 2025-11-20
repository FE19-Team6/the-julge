import next from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  next.configs['core-web-vitals'],
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
    },
  },
];
