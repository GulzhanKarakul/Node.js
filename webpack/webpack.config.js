import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: "development",
    entry: "./public/entry.js",
    module: {
        rules: [
          { test: /\.html$/i, 
          loader: 'html-loader' },
        ]
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(process.cwd(), './public/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
    ],
};