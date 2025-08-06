/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/*.wasm',
            to: 'static/chunks/pages/[name][ext]',
          },
          {
            from: './node_modules/onnxruntime-web/dist/*.mjs',
            to: 'static/chunks/pages/[name][ext]',
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
