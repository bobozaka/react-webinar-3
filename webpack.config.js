process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require("path");

let config = {
  context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
  entry: 'index.js', // Главный файл приложения
  output: {
    path: path.join(__dirname, 'dist'), // Куда делать оброку
    filename: '[name].js', // Шаблон для названия файлов
    clean: true, // Очистить ./dist перед сборкой
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', 'jsx'], // расширения по умолчанию если не указаны в import
    modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей (пакетов)
  },
  module: {
    rules: [
      // Транспиляция JS/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Adds CSS to the DOM by injecting a <style> tag
          'css-loader', // Translates CSS into CommonJS modules
          'sass-loader' // Compiles Sass to CSS
        ]
      },
      // Правила обработки подключаемых файлов
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader, options: {}},
          {loader: 'css-loader', options: {url: true, import: true}},
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // Плагин для вытаскивания собранных стилей в отдельный файл
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      title: 'Simple SPA',
      base: '/',
    }),
  ],
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8010,
    historyApiFallback: true,
  };
}

module.exports = config;
