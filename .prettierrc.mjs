import alloyConfig from 'eslint-config-alloy/.prettierrc.js';

export default {
  ...alloyConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@api/(.*)$',
    '^@entities/(.*)$',
    '^@features/(.*)$',
    '^@shared/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  tailwindConfig: './tailwind.config.js',
};
