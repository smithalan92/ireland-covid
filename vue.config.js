const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  outputDir: 'docs',
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'));

    // auto resolve directory imports
    config.resolve
      .plugin('directory-named-webpack-plugin')
      .use(DirectoryNamedWebpackPlugin)
      .init((Plugin) => new Plugin({ exclude: /node_modules/ }));

    // when file not specified try to load vue files 1st
    config.resolve.extensions.prepend('.vue');

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            'removeTitle',
            'removeDesc',
            'removeComments',
            'removeDoctype',
            { removeViewBox: false },
          ],
        },
      });
  },
};
