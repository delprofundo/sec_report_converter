secsv
=====

basic tool to convert a json security report to csv and output to current folder

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/secsv.svg)](https://npmjs.org/package/secsv)
[![Downloads/week](https://img.shields.io/npm/dw/secsv.svg)](https://npmjs.org/package/secsv)
[![License](https://img.shields.io/npm/l/secsv.svg)](https://github.com/tools/secsv/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g secsv
$ secsv COMMAND
running command...
$ secsv (-v|--version|version)
secsv/1.0.0 darwin-arm64 node-v14.15.5
$ secsv --help [COMMAND]
USAGE
  $ secsv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
```
-f       : converts all json files within the current working folder (that are of a correct scan type)
--file   : converts the given file only which must exist in the current folder. will ignore file that is not of a supported scan type
--folder : converts all json files within the given folder, outputting them in the current folder
```
<!-- commandsstop -->
