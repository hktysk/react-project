const fs = require('fs');
const fsExtra = require('fs-extra');

const isProduction = (process.env.NODE_ENV === 'production');

// production の場合は build ディレクトリを作成
if (isProduction) {
  const publicDirPath = `${__dirname}/public`;
  const buildDirPath = `${__dirname}/build`;

  // すでに存在する場合は削除して作り直す
  if (fs.existsSync(buildDirPath)) {
    fsExtra.removeSync(buildDirPath);
  }

  fs.mkdirSync(buildDirPath);
  fsExtra.copySync(publicDirPath, buildDirPath);
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: `${__dirname}/${isProduction ? 'build' : 'public'}`
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.(jpg|png)$/,
        use: 'url-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules']
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    watchContentBase: true,
    historyApiFallback: true, // react-router のため
    disableHostCheck: true, // 0.0.0.0 のアクセスを許可するため
    hot: true,
    inline: true,
    open: true
  },
  plugins: []
}
