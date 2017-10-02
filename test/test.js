import test from 'ava';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackCSSStatsPlugin from '../index.js';
import path from 'path';
import os from 'os'

const pluginOptions = {
    outputSuffix: "-CSSRaport",
    outputPath: os.tmpdir(),
    inputFilesPrefixes: ["example"],
    inputPath: "./test/exampleCSS"
},
compilerOptions = {
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

test('plugin is defined', t => {
    t.truthy(WebpackCSSStatsPlugin);
});

test('webpack integrate with plugin', async t => {
    let compiler = webpack(compilerOptions);
    let result = await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        })
    });
    let testedFilesPrefixes = pluginOptions.outputPath + "/" + pluginOptions.inputFilesPrefixes + pluginOptions.outputSuffix
    if (fs.existsSync(testedFilesPrefixes + ".html", 'utf8') && fs.existsSync(testedFilesPrefixes + ".json", 'utf8')) {
        t.pass(result);
    } else {
        t.fail();
    }
});
