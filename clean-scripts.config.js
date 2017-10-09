const childProcess = require('child_process')
const util = require('util')
const { Service } = require('clean-scripts')

const execAsync = util.promisify(childProcess.exec)

module.exports = {
  build: [
    `rimraf dist`,
    `mkdirp dist`,
    {
      js: [
        {
          vue: `file2variable-cli src/vue.template.html -o src/vue-variables.ts --html-minify --base src`,
          angular: `file2variable-cli src/angular.template.html -o src/angular-variables.ts --html-minify --base src`
        },
        `ngc -p src`,
        `tsc -p demo`,
        `webpack --display-modules --config demo/webpack.config.js`
      ],
      css: [
        `lessc src/select2.less > src/select2.css`,
        `postcss src/select2.css -o dist/select2.css`,
        `cleancss -o dist/select2.min.css dist/select2.css`,
        `cleancss -o demo/index.bundle.css dist/select2.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css`
      ],
      clean: [
        `rimraf demo/**/index.bundle-*.js`,
        `rimraf demo/*.bundle-*.css`
      ]
    },
    `rev-static --config demo/rev-static.config.js`
  ],
  lint: {
    ts: `tslint "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    js: `standard "**/*.config.js"`,
    less: `stylelint "src/**/*.less"`,
    export: `no-unused-export "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx" "src/**/*.less" --exclude "src/compiled/**/*"`
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
    ts: `tslint --fix "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    js: `standard --fix "**/*.config.js"`,
    less: `stylelint --fix "src/**/*.less"`
  },
  release: `clean-release`,
  watch: {
    vue: `file2variable-cli src/vue.template.html -o src/vue-variables.ts --html-minify --base src --watch`,
    angular: `file2variable-cli src/angular.template.html -o src/angular-variables.ts --html-minify --base src --watch`,
    src: `tsc -p src --watch`,
    demo: `tsc -p demo --watch`,
    webpack: `webpack --config demo/webpack.config.js --watch`,
    less: `watch-then-execute "src/select2.less" --script "clean-scripts build[2].css"`,
    rev: `rev-static --config demo/rev-static.config.js --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
