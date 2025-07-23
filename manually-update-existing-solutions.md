# How to update an existing SPFx solution

Please follow the instructions below in order to update an existing SPFx solution based on an older Hands-On blueprint version.

## Update webpack minifier

Due to the used package versions and targeted JavaScript module format (ES5), the standard webpack configuration is not able to compress the artefacts properly: the UglifyJS minifier plugin is not able to handle ES5 modules. 

This results in an error message during the Gulp webpack task processing and in a unminified package size of 1056 KYbytes, which need to be downloaded by the client every time.

For that reason, the replacement minifier plugin Terser should be confgured in the gulp configuration.

### Install the minifier replacement related dependencies

```shell
npm install -D terser-webpack-plugin-legacy fancy-log
```

### Replace the UglifyJS minifier with Terser

Edit the `gulpfile.js` file:

```JavaScript
//...
const log = require('fancy-log');
const TerserPlugin = require('terser-webpack-plugin-legacy');

/** Terser "ESBUILD" minifier */
const ESBUILD_TerserOptions = {
  minify: TerserPlugin.esbuildMinify,
  // `terserOptions` options will be passed to `esbuild` -  Link to options - https://esbuild.github.io/api/#minify  
  terserOptions: {},  
}


build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        // use installed React version
        generatedConfiguration.externals = generatedConfiguration.externals.filter(
            (name) => !['react', 'react-dom'].includes(name)
        );
        // Look for the minifier plugin (currently: UglifyJS) in the plugin list and replace it with a Terser plugin
        generatedConfiguration.plugins.forEach((plugin, i) => {
          if (plugin.options && plugin.options.mangle) {
            // use the Terser plugin with the "ESBUILD" minifier instead of the standard minifier for maximized size reduction
            const tersePlugin = new TerserPlugin(ESBUILD_TerserOptions);
            log.info(`Replace webpack minifier [${plugin.constructor.name}] with [${tersePlugin.constructor.name}]`);
            generatedConfiguration.plugins.splice(i, 1, tersePlugin);
          }
        });
        return generatedConfiguration;
    }
});

//...

```

Note: the "ESBUILD" minifier engine is used here instead of the standard engine in order to maximize the size reduction (~50% instead of <10% size reduction).


## Install "rimraf" to replace the `gulp clean` task

The reason is that microsoft specific gul task "clean" is using the npm package "del" in version 2.2.2, which is > 8 years old and not able to handle with file locks and other OS constraints.
(See: `node_modules\@microsoft\gulp-core-build\lib\utilities\FileDeletionUtility.js` and `node_modules\@microsoft\gulp-core-build\package.json`)

### install rimraf

```shell
npm install -D rimraf@3.0.2
```

**IMPORTANT**: the rimraf **version** used here is **v3.0.2**, which is *the last rimraf version supporting node v10.x*. Consider to update rimraf when node >10.x can be used for SPFx solutions builds.

### add the rimraf script to the solution

edit the "package.json" of the solution to include the following script:

```javascript
{
    ...
    scripts: {
        ...
        "clean": "rimraf -rf dist lib temp sharepoint",
        ...
    }
}
```

### use the "clean" script

Instead of using the "gulp clean" task, use the "rimraf" utility as available per npm script "clean" as described above.

```
npm run clean
```
## improve the scripts of the solution

consider replacing/combining the scripts in the "package.json" of the solution with the following:

```javascript
{
    ...
    scripts: {
        ...
        "serve:de": "gulp serve --nobrowser --locale=de-de",
        "serve:us": "gulp serve --nobrowser --locale=en-us",
        "build:dev": "gulp bundle",
        "build:prod": "gulp bundle --ship",
        "clean": "rimraf -rf dist lib temp sharepoint",
        "build": "npm run build:prod",
        "package": "gulp package-solution --ship",
        "test": "jest --transformIgnorePatterns \"node_modules/(?!spfx-template)/\" --env=jsdom",
        "serve": "npm run serve:de",
        "release": "npm run clean && npm run build && npm run package"
        ...
    }
}
```

You may then generate a full release package of the solution using: 

```shell
npm run release
```
