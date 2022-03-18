module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        environment: process?.env?.NODE_ENV,
      },
    },
  },
};
