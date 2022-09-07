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
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    runtimeChunk: 'single'
  }
};