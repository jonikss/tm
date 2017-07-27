//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require("util");
const path = require("path");

function rewireStylus(config, env, stylusLoaderOptions = {}) {
    const stylExtension = /\.styl$/;
    //console.log(util.inspect(config.module.rules, {showHidden: false, depth: null}))
    const fileLoader = config.module.rules.find(
        //rule => rule.loader && rule.loader.endsWith("\\file-loader\\index.js")
        rule => {
            //console.log(path.join('file-loader','index.js'))
            return rule.loader && rule.loader.endsWith(path.join('file-loader','index.js'));
        }
    );
    fileLoader.exclude.push(stylExtension);

    const cssRules = config.module.rules.find(
        rule => String(rule.test) === String(/\.css$/)
    );

    let stylusRules;
    if (env === "production") {
        stylusRules = {
            test: stylExtension,
            loader: [
                // TODO: originally this part is wrapper in extract-text-webpack-plugin
                //       which we cannot do, so some things like relative publicPath
                //       will not work.
                //       https://github.com/timarney/react-app-rewired/issues/33
                ...cssRules.loader,
                {
                    loader: "stylus-loader",
                    options: stylusLoaderOptions
                }
            ]
        };
    } else {
        stylusRules = {
            test: stylExtension,
            use: [
                ...cssRules.use,
                {
                    loader: "stylus-loader",
                    options: stylusLoaderOptions
                }
            ]
        };
    }

    config.module.rules.push(stylusRules);

    return config;
}

const babelLoader = function(conf) {
    if(conf.loader) {
        return conf.loader.includes("babel-loader");
    } else {
        return false;
    }
};

function rewireDecorators(config, env) {

    const babelrc = config.module.rules.find(babelLoader).options;
    babelrc.plugins = ["transform-decorators-legacy"].concat(
        babelrc.plugins || []
    );
    return config;
}

module.exports = function override(config, env) {
    config = rewireStylus(config, env);
    config = rewireDecorators(config, env);
    return config;
};
