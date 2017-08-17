const childProcess = require('child_process')

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
        `lessc src/select2.less -sm=on > dist/select2.css`,
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
    export: `no-unused-export "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx" --exclude "src/compiled/**/*"`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    'git checkout package-lock.json',
    () => new Promise((resolve, reject) => {
      childProcess.exec('git status -s', (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          if (stdout) {
            reject(new Error(`generated files doesn't match.`))
          } else {
            resolve()
          }
        }
      }).stdout.pipe(process.stdout)
    })
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    js: `standard --fix "**/*.config.js"`,
    less: `stylelint --fix "src/**/*.less"`
  },
  release: `clean-release`,
  watch: `watch-then-execute "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx" "src/**/*.template.html" --exclude "src/compiled/**/*,src/*-variables.ts" --script "npm run build"`
}
