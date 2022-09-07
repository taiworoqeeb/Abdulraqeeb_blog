const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s|css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" })
  ],
  configureWebpack:{
    optimization: {
    nodeEnv: 'production',
    minimize: true,
    runtimeChunk: 'single',
    splitChunks:{
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    }
  }
  }
  
};