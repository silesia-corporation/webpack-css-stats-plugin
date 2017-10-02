import test from 'ava';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackCSSStatsPlugin from '..';
import optionsHelper from './helpers/compiler-options';

test('plugin is defined', t => {
    t.truthy(WebpackCSSStatsPlugin);
});

test('webpack integrate with plugin', async t => {
    let pluginOptions = optionsHelper.getPluginOptions();
    let compilerOptions = optionsHelper.getCompilerOptions(pluginOptions);
    let compiler = webpack(compilerOptions);
    let result = await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            resolve(stats);
        })
    });
    let testedFilesPrefixes = pluginOptions.outputPath + "/" + pluginOptions.inputFilesPrefixes + pluginOptions.outputSuffix;
    const filesExists = fs.existsSync(testedFilesPrefixes + ".html", 'utf8') && fs.existsSync(testedFilesPrefixes + ".json", 'utf8');
    t.truthy(filesExists)
});
