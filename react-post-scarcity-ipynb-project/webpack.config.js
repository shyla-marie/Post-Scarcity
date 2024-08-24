// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of the application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output file name
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Regex to match .css files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Interprets @import and url() like import/require()
        ],
      },
      {
        test: /\.js$/, // Regex to match .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpiles ES6+ code to ES5
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for the src directory
      '@components/ui/slider': path.resolve(__dirname, 'src/components/ui/slider'),
      '@components/ui/button': path.resolve(__dirname, 'src/components/ui/button'),
      '@components/ui/select': path.resolve(__dirname, 'src/components/ui/select'),
      '@components/ui/card': path.resolve(__dirname, 'src/components/ui/card')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from the dist directory
    compress: true, // Enable gzip compression
    port: 9000 // Port to run the dev server
  }
};