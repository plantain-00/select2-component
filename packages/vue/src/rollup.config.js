import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'packages/vue/dist/index.js',
  name: 'Select2',
  plugins: [
    resolve(),
    uglify(),
    commonjs()
  ],
  output: {
    file: 'packages/vue/dist/select2-vue-component.min.js',
    format: 'umd'
  },
  external: [
    'vue',
    'vue-class-component'
  ],
  globals: {
    'vue-class-component': 'VueClassComponent'
  }
}
