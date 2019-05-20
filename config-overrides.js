const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = function override(config, env) {
    config.resolve = {
        alias: {
            'api': resolve('src/api'),
            'base': resolve('src/base'),
            'common': resolve('src/common'),
            'components': resolve('src/components'),
            'router': resolve('src/router')
        },
        extensions: ['.js', '.jsx', '.scss']
    };
    return config;
};