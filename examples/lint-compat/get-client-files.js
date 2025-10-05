const { globSync } = require('glob');
const fs = require('fs');
const path = require('path');
const dependencyTree = require('dependency-tree');

function getClientFileList() {
  try {
    const srcPath = path.resolve(__dirname, `./src/app`);
    /** @description root layout을 엔트리로 모든 tsx 파일리스트를 얻음 */
    const tsxFilePaths = globSync(`${srcPath}/**/*.tsx`, {
      ignore: 'node_modules/**'
    });

    /** 
     * @param {string[]} fileList
     * @return {string[]}
     */
    function getDependency(fileList) {
      return fileList.reduce((acc, fileItem) => {
        const d = dependencyTree.toList({
          filename: fileItem,
          directory: 'path/to/all/files',
          filter: (path) =>
            !(
              /node_modules/.test(path) ||
              /s?.css/.test(path) ||
              /constants/.test(path)
            ),
          tsConfig: require('./tsconfig.json'),
        });

        return [...acc, ...d];
      }, []);
    }

    /** @description tsx로부터 불러오는 모든 의존성을 파악 */
    const dependency = getDependency(tsxFilePaths);

    const clientFiles = dependency.filter((tsxFile) => {
      const content = fs.readFileSync(tsxFile, 'utf-8');
      return /['"]use client['"]\;?/.test(content);
    });

    /** @description tsx로부터 불러오는 모든 의존성을 파악 */
    const clintDependency = getDependency(clientFiles);

    const result = [...new Set(clintDependency)];
    return result;
  } catch (err) {
    console.error('get client file list error: ', err);
    return ['./src/**/*.{tsx,ts}'];
  }
}

module.exports = getClientFileList;

/** @desc 린트 파일 검사 경로를 위한 log 출력 */
console.log(getClientFileList().join(' '));