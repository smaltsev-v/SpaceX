const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FileIncludeWebpackPlugin = require('file-include-webpack-plugin')
// const HtmlWebpackPartialsInjectorPlugin = require('html-webpack-partials-injector-plugin')


const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};
// module.exports = {
//   plugins: [
//       new HtmlWebpackPartialsInjectorPlugin(), // <-- has to be added once before all html-webpack-plugin(s)
//       new HtmlWebpackPlugin({
//           template: './src/pages/layout/layout.ejs',
//           'title': 'Index-Page',
//           partials: [{
//               path: path.resolve('./src/partials/navigation.html'),
//               location: 'main'
//           }],
//           inject: true,
//           chunks: ['index'],
//           filename: 'index.html'
//       }),
//   ]
// }
// module.exports = {
//   plugins: [
//     new FileIncludeWebpackPlugin(
//       {
//         source: './src/templates', // relative path to your templates
//         replace: [{
//           regex: /\[\[FILE_VERSION]]/, // additional things to replace
//           to: 'v=1.0.0',
//         }],
//       },
//     )
//   ]
// }
module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
          filename: './styles/main.css'
      })
  ],
  module: {
      rules: [
          {
              test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
              type: 'asset/inline'
          },
          {
              test: /\.html$/i,
              loader: 'html-loader'
          },
          {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader'
              ]
          },
          {
              test: /\.scss$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
              ]
          }
      ]
  },
  ...devServer(develop),
});