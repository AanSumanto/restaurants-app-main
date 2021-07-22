const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminMozJpeg = require('imagemin-mozjpeg');

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
        ],
      },
          {
            test: /\.(gif|png|jpe?g|svg|jpg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  disable: true,
                },
              },
            ],
          },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
     maxSize: 70000,
     minChunks: 1,
     maxAsyncRequests: 30,
     maxInitialRequests: 30,
     automaticNameDelimiter: '~',
     enforceSizeThreshold: 50000,
     cacheGroups: {
       defaultVendors: {
         test: /[\\/]node_modules[\\/]/,
         priority: -10
       },
       default: {
         minChunks: 2,
         priority: -20,
         reuseExistingChunk: true
       }
     }      
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/src/public/'),
          globOptions: {
            ignore: ['**/images/**'],
          },
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/sw.js'),
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozJpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50
          }
        }        
      ],
      overrideExtension: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", 
      openAnalyzer: false
})
  ],
};
