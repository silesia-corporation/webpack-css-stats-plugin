import os from 'os';
import path from 'path';
import WebpackCSSStatsPlugin from '../..';

export default {
    getCompilerOptions: function (pluginOptions) {
        return {
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
    },
    getPluginOptions: function () {
        return {
            outputSuffix: "-CSSRaport" + Math.random().toString(36).substring(4),
            outputPath: os.tmpdir(),
            inputFilesPrefixes: ["example"],
            inputPath: path.join("test/fixtures")
        };
    }
};
