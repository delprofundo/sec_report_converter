const {Command, flags} = require('@oclif/command');
const { enumerateReportList } = require("./fileInterface");
const { processJsonReportArray } = require("./processToCsv");
class SecsvCommand extends Command {
  static flags = {
    file: flags.string()
  }
  async run() {
    const { flags } = this.parse(SecsvCommand)
    const listOfReportObjects = enumerateReportList(flags);
    console.log(listOfReportObjects.length);
    const response = processJsonReportArray( listOfReportObjects );
    console.log( 'response', response );
    console.log('eed');
  }
}



SecsvCommand.description = `Describe the command here
This command is a simple parser for the various security reports produced by gitlab, converting them from JSON into csv.

-f       : converts all json files within the current working folder (that are of a correct scan type)
--file   : converts the given file only which must exist in the current folder. will ignore file that is not of a supported scan type
--folder : converts all json files within the given folder, outputting them in the current folder
`

SecsvCommand.flags = {
  file: flags.string(),
  folder: flags.string(),
  f: flags.boolean({char: 'f'}),
}

module.exports = SecsvCommand
