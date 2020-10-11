import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'packages/vue/dist/index.js',
  plugins: [
    resolve({ browser: true }),
    uglify(),
    commonjs()
  ],
  output: {
    name: 'Select2',
    file: 'packages/vue/dist/select2-vue-component.min.js',
    format: 'umd'
  },
  external: [
    'vue'
  ]
}
