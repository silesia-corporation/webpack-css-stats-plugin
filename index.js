var fs = require('fs-extra'),
    path = require('path'),
    cssstats = require('css-statistics'),
    json2html = require('json2html');

module.exports = CssReportGeneratorPlugin;

function CssReportGeneratorPlugin(options) {
    this.options = options;
}

CssReportGeneratorPlugin.prototype.apply = function(compiler) {
    var that = this;
    if (!this.options.disabled) {
        compiler.plugin('done', function() {
            that.generateRaports();
            console.log("Generated CSS raports!");
        });
    }
};

CssReportGeneratorPlugin.prototype.generateRaports = function () {
    fs.emptyDir(this.options.outputPath, err => {
        if (err) {
            return console.log(err);
        }
        this.options.inputFilesPrefixes.forEach(function (name) {
            this.generateRaport(name);
        }.bind(this));
    });
}

CssReportGeneratorPlugin.prototype.generateRaport = function (name) {
    var fileName = this.getCSSFileName(name);
        css = this.getCSSFile(fileName);
        statsJSON = cssstats(css);
    this.createFiles(name + this.options.outputSuffix, statsJSON);
}

CssReportGeneratorPlugin.prototype.getCSSFileName = function (name) {
    var files = fs.readdirSync(this.options.inputPath);
    for (var i = 0 ; i < files.length ; i++) {
        var fileName = path.join(files[i]);
        if (fileName.includes(name)) {
            return fileName;
        }
    }
    console.log(name + " css file missing!")
    process.exit(-1);
}

CssReportGeneratorPlugin.prototype.getCSSFile = function (name) {
    return fs.readFileSync(this.options.inputPath + "/" + name, 'utf8')
}

CssReportGeneratorPlugin.prototype.createFiles = function (name, json) {
    var html = json2html.render(json);
    fs.outputFileSync(this.options.outputPath + "/" + name + ".html", html);
    fs.outputFileSync(this.options.outputPath + "/" + name + ".json", json);
}
