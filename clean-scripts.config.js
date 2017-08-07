module.exports = {
  build: [
    `rimraf dist`,
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
    less: `stylelint "src/**/*.less"`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js'
  ],
  fix: `standard --fix "**/*.config.js"`,
  release: `clean-release`
}
