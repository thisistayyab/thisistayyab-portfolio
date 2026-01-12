export default {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        minifyFontValues: true,
        minifySelectors: true,
        minifyParams: true,
        reduceIdents: false, // Keep animation names
        zindex: false, // Don't optimize z-index
      }],
    },
  },
};
