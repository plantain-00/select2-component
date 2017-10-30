const { Service, execAsync } = require('clean-scripts')

const tsFiles = `"src/**/*.ts" "src/**/*.tsx" "spec/**/*.ts" "demo/**/*.ts" "demo/**/*.tsx" "screenshots/**/*.ts"`
const lessFiles = `"src/**/*.less"`
const jsFiles = `"*.config.js" "demo/*.config.js" "spec/**/*.config.js"`

const vueTemplateCommand = `file2variable-cli src/vue.template.html -o src/vue-variables.ts --html-minify --base src`
const angularTemplateCommand = `file2variable-cli src/angular.template.html -o src/angular-variables.ts --html-minify --base src`
const ngcSrcCommand = `ngc -p src`
const tscDemoCommand = `tsc -p demo`
const webpackCommand = `webpack --display-modules --config demo/webpack.config.js`
const revStaticCommand = `rev-static --config demo/rev-static.config.js`

module.exports = {
  build: [
    `rimraf dist`,
    `mkdirp dist`,
    {
      js: [
        {
          vue: vueTemplateCommand,
          angular: angularTemplateCommand
        },
        ngcSrcCommand,
        tscDemoCommand,
        webpackCommand
      ],
      css: [
        `lessc src/select2.less -sm=on > src/select2.css`,
        `postcss src/select2.css -o dist/select2.css`,
        `cleancss -o dist/select2.min.css dist/select2.css`,
        `cleancss -o demo/index.bundle.css dist/select2.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css`
      ],
      clean: [
        `rimraf demo/**/index.bundle-*.js`,
        `rimraf demo/*.bundle-*.css`
      ]
    },
    revStaticCommand
  ],
  lint: {
    ts: `tslint ${tsFiles}`,
    js: `standard ${jsFiles}`,
    less: `stylelint ${lessFiles}`,
    export: `no-unused-export ${tsFiles} ${lessFiles} --exclude "src/compiled/**/*"`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    async () => {
      const { stdout } = await execAsync('git status -s')
      if (stdout) {
        console.log(stdout)
        throw new Error(`generated files doesn't match.`)
      }
    }
  ],
  fix: {
    ts: `tslint --fix ${tsFiles}`,
    js: `standard --fix ${jsFiles}`,
    less: `stylelint --fix ${lessFiles}`
  },
  release: `clean-release`,
  watch: {
    vue: `${vueTemplateCommand} --watch`,
    angular: `${angularTemplateCommand} --watch`,
    src: `${ngcSrcCommand} --watch`,
    demo: `${tscDemoCommand} --watch`,
    webpack: `${webpackCommand} --watch`,
    less: `watch-then-execute ${lessFiles} --script "clean-scripts build[2].css"`,
    rev: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
