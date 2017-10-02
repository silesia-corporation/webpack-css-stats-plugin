import os from 'os';
import path from 'path';
import WebpackCSSStatsPlugin from '../..';

const pluginOptions = {
    outputSuffix: "-CSSRaport",
    outputPath: os.tmpdir(),
    inputFilesPrefixes: ["example"],
    inputPath: path.join("test/fixtures")
};

const compilerOptions = {
    entry: {
        test: './index.js'
    },
    output: {
        path: path.resolve(process.cwd(), 'test/output'),
        filename: 'test'
    },
    plugins: [
        new WebpackCSSStatsPlugin(pluginOptions)
    ]
};

export default {
    getCompilerOptions: function () {
        return compilerOptions;
    },
    getPluginOptions: function () {
        return pluginOptions;
    }
};
