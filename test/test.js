import test from 'ava';
import fs from 'fs-extra';
import webpack from 'webpack';
import CSSStatsPlugin from '../index.js';
import path from 'path';
var pluginOptions = {
    outputSuffix: "-CSSRaport",
    outputPath: "./test/output",
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
        new CSSStatsPlugin(pluginOptions)
    ]
};

test('plugin is defined', t => {
    t.truthy(CSSStatsPlugin);
});

test('webpack integrate with plugin', t => {
    var compiler = webpack(compilerOptions);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        })
    })
    .catch(err => {
        t.fail(err);
    })
    .then(result => {
        var testedFilesPrefix = pluginOptions.outputPath + "/" + pluginOptions.inputFilesPrefixes + pluginOptions.outputSuffix;
        if (fs.exists(testedFilesPrefix + ".html") && fs.exists(testedFilesPrefix + ".json")) {
            fs.removeSync(testedFilesPrefix + ".html");
            fs.removeSync(testedFilesPrefix + ".json");
            t.pass(result);
        } else {
            fs.removeSync(testedFilesPrefix + ".html");
            fs.removeSync(testedFilesPrefix + ".json");
            t.fail();
        }
    });
});
