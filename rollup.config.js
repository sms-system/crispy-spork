import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './index.js',
  output: {
    file: './build/index.min.js',
    format: 'cjs',
    exports: 'named',
    name: 'bundle'
  },
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}