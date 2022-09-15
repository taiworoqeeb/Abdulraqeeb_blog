const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(400000)
      .maxAssetSize(400000);
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions = { 
    //       whitespace: 'condense',
    //       isCustomElement: (tag) => ['vue-awesome-paginate'].includes(tag)
    //      };
    //     return options;
    //   });
  },
  pluginOptions: {
    vite: {
      /**
       * Plugin[]
       * @default []
       */
      plugins: [], // other vite plugins list, will be merge into this plugin\'s underlying vite.config.ts
      /**
       * Vite UserConfig.optimizeDeps options
       * recommended set `include` for speedup page-loaded time, e.g. include: ['vue', 'vue-router', '@scope/xxx']
       * @default {}
       */
      optimizeDeps: {},
      /**
       * type-checker, recommended disabled for large-scale old project.
       * @default false
       */
      disabledTypeChecker: true,
      /**
       * lint code by eslint
       * @default false
       */
      disabledLint: true,
    }
  },
})
