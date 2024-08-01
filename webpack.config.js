'use strict'

const path = require('path')
const fs = require("fs")
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const HandlebarsLayouts = require('handlebars-layouts');


module.exports = {
  mode: 'development',
  entry: './index2.html',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HandlebarsPlugin({
      // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
      entry: path.join(process.cwd(), "src", "*.hbs"),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "dist", "[name].html"),
      // you can also add a [path] variable, which will emit the files with their relative path, like
      // output: path.join(process.cwd(), "build", [path], "[name].html"),

      // data passed to main hbs template: `main-template(data)`
      data: require("./data/project.json"),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      data: path.join(__dirname, "data/project.json"),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "src", "**", "*.hbs")
      ],

      // register custom helpers. May be either a function or a glob-pattern
      // helpers: {
      //   nameOfHbsHelper: Function.prototype,
      //   projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      // },

      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      onBeforeSetup: function (Handlebars) {
        Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
      },
      onBeforeAddPartials: function (Handlebars, partialsMap) { },
      onBeforeCompile: function (Handlebars, templateContent) { },
      onBeforeRender: function (Handlebars, data, filename) { },
      onBeforeSave: function (Handlebars, resultHtml, filename) { },
      onDone: function (Handlebars, filename) { }
    })
    // new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new HtmlWebpackPlugin({
    //   title: "Generic Head Title",
    //   // the template you want to use
    //   template: path.join(__dirname, "src/views/partials", "head", "header.hbs"),
    //   // the output file name
    //   filename: path.join(__dirname, "dist", "partials", "head.hbs"),
    //   inject: "head"
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'assets', to: 'assets' }
    //   ]
    // }),
    // new HandlebarsPlugin({
    //   htmlWebpackPlugin: {
    //     enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
    //     prefix: "html", // where to look for htmlWebpackPlugin output. default is "html"
    //     HtmlWebpackPlugin: HtmlWebpackPlugin// optionally: pass in HtmlWebpackPlugin if it cannot be resolved
    //   },
    //   // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
    //   entry: path.join(process.cwd(), "src", "**", "*.hbs"),
    //   // output path and filename(s). This should lie within the webpacks output-folder
    //   // if ommited, the input filepath stripped of its extension will be used
    //   output: path.join(process.cwd(), "dist", "[name].html"),
    //   // you can also add a [path] variable, which will emit the files with their relative path, like
    //   // output: path.join(process.cwd(), "build", [path], "[name].html"),

    //   // data passed to main hbs template: `main-template(data)`
    //   // data: require("./src/data/project.json"),
    //   // or add it as filepath to rebuild data on change using webpack-dev-server
    //   data: path.join(__dirname, "data/project.json"),
    //   // data: data,
    //   // globbed path to partials, where folder/filename is unique
    //   partials: [
    //     path.join(process.cwd(), "src", "views", "**", "*.hbs")
    //   ],

    //   // register custom helpers. May be either a function or a glob-pattern
    //   // helpers: {
    //   //   nameOfHbsHelper: Function.prototype
    //   // },

    //   // hooks
    //   // getTargetFilepath: function (filepath, outputTemplate) {},
    //   // getPartialId: function (filePath) {}
    //   onBeforeSetup: function (Handlebars) {
    //     Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
    //     Handlebars.registerPartial('header', fs.readFileSync('src/views/partials/header.hbs', 'utf8'));
    //     Handlebars.registerPartial('main', fs.readFileSync('src/views/layouts/main.hbs', 'utf8'));
    //   },
    //   onBeforeAddPartials: function (Handlebars, partialsMap) { },
    //   onBeforeCompile: function (Handlebars, templateContent) { },
    //   onBeforeRender: function (Handlebars, data, filename) { },
    //   onBeforeSave: function (Handlebars, resultHtml, filename) { },
    //   onDone: function (Handlebars, filename) { }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
