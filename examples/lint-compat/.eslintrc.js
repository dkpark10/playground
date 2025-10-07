const getClientFileList = require('./get-client-files');

/** 
 * @description lint overrides 파일 목록에는 상대 경로가 들어가야 한다
 *   'Users/mac/Desktop/playground/examples/lint-compat/src/components/non-use-client.tsx',
 *   '/src/components/non-use-client.tsx',
 */
const clientFileList = getClientFileList().map(
  /** @param {string} clientFile @returns {string} */
  (clientFile) => {
    return clientFile.replace(__dirname, '');
  }).map(
    /** @param {string} clientFile @returns {string} */
    (clientFile) => clientFile[0] === '/' ? clientFile.slice(1) : clientFile
  )

module.exports =
{
  root: true,
  // lint는 js만 해석 가능하기에 ts를 트랜스파일할 Parser가 필요
  parser: "@typescript-eslint/parser",

  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname, // tsconfig 파일을 현재 경로에서 찾도록 함
  },

  extends: [
    "plugin:react/recommended",
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],

  plugins: ["react", "import", "unused-imports"],

  ignorePatterns: [".eslintrc.js", "get-client-files.js"],

  "rules": {
    "import/no-unresolved": "off",

    /** @description react 17 이상부터 react import 불필요  */
    "react/react-in-jsx-scope": "off",
  },

  "overrides": [
    {
      "files": [...clientFileList, 'src/hooks/**'],
      "plugins": ["compat"],
      "extends": ["plugin:compat/recommended"],
      "settings": {
        // polyfills: ['IntersectionObserver'],
      },
    }
  ],
}
