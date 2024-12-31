const generateContentFile = require('./scripts/generateContentFile');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config options...
}

// Wrap the config in a function that runs our script first
module.exports = () => {
  // Generate the content file before building
  generateContentFile();
  return withNextra(nextConfig);
}
