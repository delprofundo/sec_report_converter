secsv
=====

basic tool to convert a json security report to csv and output to current folder

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/secsv.svg)](https://npmjs.org/package/secsv)
[![Downloads/week](https://img.shields.io/npm/dw/secsv.svg)](https://npmjs.org/package/secsv)
[![License](https://img.shields.io/npm/l/secsv.svg)](https://github.com/tools/secsv/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Flags](#flags)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g secsv
$ secsv COMMAND
running command...
$ secsv (-v|--version|version)
secsv/1.2.1 darwin-arm64 node-v14.15.5
$ secsv --help [COMMAND]
USAGE
  $ secsv COMMAND
...
```
<!-- usagestop -->
# Flags

```
if no flag is passed all json files in the current folder that are of one of the processable report types will be created in the same folder.

probably just use the default mode for now eh.

-f                : now same as no flag being passed
--file=FILENAME   : converts the given file only which must exist in the current folder. will ignore file that is not of a supported scan type
--folder=FILEPATH : converts all json files within the given folder, outputting them in the current folder

```

<!-- commands -->

<!-- commandsstop -->
