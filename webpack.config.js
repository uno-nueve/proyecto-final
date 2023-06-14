const path = require('path');

// PLUGINS Y MINIFICADORES DE CSS Y SASS
// Para reducir el tamaño de las hojas de estilo de nuestro proyecto
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para el template del HTML que va a usar Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Para reducir las CSS
const { SourceMapDevToolPlugin } = require('webpack'); // Para conocer el Source Map de nuestro proyecto
const ESLintPlugin = require('eslint-webpack-plugin');

// Configuración del puerto
const port = process.env.PORT || 3000;

// Exportar configuración de webpack
module.exports = {

    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // Reglas para archivos JS y JSX
            // Tienen que pasar el LINTING para poder devolverse
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'source-map-loader',
                },
            },
            // Reglas para archivos JS y JSX
            // Reglas de Babel ES y JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          '@babel/env',
                          '@babel/react',
                        ],
                    },
                },
            },
            // Reglas para archivos CSS, SCSS y SASS para unificarlos y cargarlos
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader',
                ],
            },
            // Reglas para los archivos de imágenes
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        // Template HTML
        new HtmlWebpackPlugin(
            {
                template: './public/index.html',
            },
        ),
        new MiniCssExtractPlugin(
            {
                filename: './css/styles.css',
            },
        ),
        new SourceMapDevToolPlugin(
            {
                filename: '[file].map',
            },
        ),
        new ESLintPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [
            'node_modules',
        ],
        alias: {
          'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
        },
    },
};
