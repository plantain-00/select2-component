module.exports = {
  base: 'packages/vue/src/',
  files: [
    'packages/vue/src/*.template.html'
  ],
  /**
   * @argument {string} file
   */
  handler: file => {
    if (file.endsWith('select2.template.html')) {
      return {
        type: 'vue',
        name: 'Select2',
        path: './select2'
      }
    }
    if (file.endsWith('auto-complete.template.html')) {
      return {
        type: 'vue',
        name: 'AutoComplete',
        path: './auto-complete'
      }
    }
    return { type: 'text' }
  },
  out: 'packages/vue/src/variables.ts'
}
