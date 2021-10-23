const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/service-worker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sw.js',
  },
};
