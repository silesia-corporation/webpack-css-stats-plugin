# webpack-css-stats-plugin
Plugin creates HTML and JSON files with CSS files stats.

# Usage 
1. Install `webpack-css-stats-plugin` as a dev-dependency:

```shell
npm install --save-dev @silesia-corporation/webpack-css-stats-plugin
```

2. Enable the plugin by adding it to your `.webpack.config.js`:

``` javascript
plugins: [
  new CssReportGeneratorPlugin({
      disabled: false // Optional: disable plugin
      outputSuffix: '-CSSRaport' // Required: suffix for generated files
      outputPath: 'path' // Required: output path
      inputFilesPrefixes: ['example', 'example2'], // Required: input files prefixes
      inputPath: 'path', // Required: input path
      reporters: ['html, 'json'] // Optional: report extensions default value ['html, 'json']
  })
]
``` 
