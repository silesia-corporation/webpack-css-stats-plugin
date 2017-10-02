const fs = require('fs-extra');
const path = require('path');
const cssstats = require('css-statistics');
const json2html = require('json2html');

class CssReportGeneratorPlugin {
    constructor(options) {
        this.options = Object.assign({
            reporters: ['html', 'json']
        }, options);
    }

    apply(compiler) {
        if (this.options.disabled) { return null; }
        return compiler.plugin('done',this.generateReports.bind(this));
    }

    generateReports() {
        this.options.inputFilesPrefixes.forEach(this.generateReport.bind(this));
    }

    generateReport(name) {
        let fileName = this.getCSSFileName(name),
            css = this.readFile(fileName),
            statsJSON = cssstats(css);
        this.writeFiles (name + this.options.outputSuffix, statsJSON);
    }

    getCSSFileName(name) {
        let files = fs.readdirSync(this.options.inputPath),
            fileName = files.find(file => {
                return path.join(file).includes(name);
            });
        if (fileName) { return fileName; }
        else { throw new Error("CSS files are missing!"); }
    }

    readFile(name) {
        return fs.readFileSync(path.join(this.options.inputPath, name), 'utf8')
    }

    writeFiles (name, json) {
        let reporters = this.options.reporters;

        if (reporters.includes('html')) {
            let html = json2html.render(json);
            this.writeFile(name, html, "html")
        }
        if (reporters.includes('json')) {
            this.writeFile(name, JSON.stringify(json), "json");
        }
    }

    writeFile(name, data, extension) {
        fs.writeFileSync(path.join(this.options.outputPath, name) + "." + extension, data);
    }
}

module.exports = CssReportGeneratorPlugin;
