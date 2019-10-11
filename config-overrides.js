const { override, fixBabelImports, addWebpackResolve, useEslintRc, addLessLoader } = require('customize-cra');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包结果分析
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度显示
const resolve = dir => path.join(__dirname, '.', dir);

// 打包结果处理优化，打包进度条优化
const webpackPlugins = (config) => {
    if (config.mode === 'production') {
        config.plugins.push(new ProgressBarPlugin());
        if (process.env.ANALYZE_REPORT) {
            config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 9001 }));
        }
    }
    return config;
};
// 输出的文件名添加构建时间
const addChunkBuildTime = (config) => {
    if (config.mode === 'production') {
        config.output.chunkFilename = `static/js/[name].[contenthash:8].chunk.${new Date().getTime()}.js`;
    }
    return config;
};

module.exports = override(
    addChunkBuildTime,
    fixBabelImports('import', { // antd按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({ // 自定义antd主题 二者见antd文档
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#DC312A' }
    }),
    addWebpackResolve({ // 别名配置
        alias: {
            'src': resolve('src'),
            'api': resolve('src/api'),
            'pages': resolve('src/pages'),
            'commons': resolve('src/commons'),
            'components': resolve('src/components'),
            'router': resolve('src/router')
        },
        extensions: ['.js', '.jsx', '.scss']
    }),
    webpackPlugins,
    useEslintRc('./.eslintrc.json') // 使用指定的eslint配置
);