const { Service, checkGitStatus, executeScriptAsync } = require('clean-scripts')
const { watch } = require('watch-then-execute')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const lessFiles = `"packages/core/src/**/*.less"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`
const excludeTsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.d.ts"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.js`
const angularTemplateCommand = `file2variable-cli packages/angular/src/index.template.html -o packages/angular/src/variables.ts --html-minify --base packages/angular/src`
const ngcSrcCommand = [
  `ngc -p packages/core/src`,
  `tsc -p packages/vue/src`,
  `tsc -p packages/react/src`,
  `ngc -p packages/angular/src`
]
const tscDemoCommand = [
  `ngc -p packages/core/demo`,
  `tsc -p packages/vue/demo`,
  `tsc -p packages/react/demo`,
  `ngc -p packages/angular/demo`
]
const webpackCommand = `webpack`
const revStaticCommand = `rev-static`
const cssCommand = [
  `lessc packages/core/src/select2.less -sm=on > packages/core/src/select2.css`,
  `postcss packages/core/src/select2.css -o packages/core/dist/select2.css`,
  `cleancss packages/core/dist/select2.css -o packages/core/dist/select2.min.css`,
  `cleancss packages/core/dist/select2.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css -o packages/core/demo/index.bundle.css`
]

module.exports = {
  build: [
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
      css: cssCommand,
      clean: `rimraf "packages/@(core|vue|react|angular)/demo/**/@(*.bundle-*.js|*.bundle-*.css)"`
    },
    revStaticCommand
  ],
  lint: {
    ts: `tslint ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard ${jsFiles}`,
    less: `stylelint ${lessFiles}`,
    export: `no-unused-export ${tsFiles} ${lessFiles} --exclude ${excludeTsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    () => checkGitStatus()
  ],
  fix: {
    ts: `tslint --fix ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard --fix ${jsFiles}`,
    less: `stylelint --fix ${lessFiles}`
  },
  watch: {
    vue: `${vueTemplateCommand} --watch`,
    angular: `${angularTemplateCommand} --watch`,
    src: `${ngcSrcCommand} --watch`,
    demo: `${tscDemoCommand} --watch`,
    webpack: `${webpackCommand} --watch`,
    less: () => watch(['src/**/*.less'], [], () => executeScriptAsync(cssCommand)),
    rev: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
