const fs = require('fs-extra');
const path = require('path');
const cssstats = require('css-statistics');
const json2html = require('json2html');

class CssReportGeneratorPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        if (this.options.disabled) { return null; }
        compiler.plugin('done', () => {
            this.generateRaports();
        });
    }

    generateRaports() {
        this.options.inputFilesPrefixes.forEach(name => { this.generateRaport(name); });
    }

    generateRaport(name) {
        let fileName = this.getCSSFileName(name),
            css = this.getCSSFile(fileName),
            statsJSON = cssstats(css);
        this.createFiles(name + this.options.outputSuffix, statsJSON);
    }

    getCSSFileName(name) {
        let files = fs.readdirSync(this.options.inputPath),
            fileName;
        files.forEach(file => {
            let currFileName = path.join(file);
            if (currFileName.includes(name)) {
                fileName = currFileName;
            }
        });
        if (fileName) { return fileName; }
        else { throw new Error("CSS files are missing!"); }
    }

    getCSSFile(name) {
        return fs.readFileSync(this.options.inputPath + "/" + name, 'utf8')
    }

    createFiles(name, json) {
        let reporters = this.options.reporters ? this.options.reporters : ['html', 'json'];

        if (reporters.includes('html')) {
            let html = json2html.render(json);
            this.writeFile(name, html, ".html")
        }
        if (reporters.includes('json')) {
            this.writeFile(name, JSON.stringify(json), ".json");
        }
    }

    writeFile(name, data, extension) {
        fs.writeFileSync(this.options.outputPath + "/" + name + extension, data);
    }
}

module.exports = CssReportGeneratorPlugin;
