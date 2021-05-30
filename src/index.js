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
    const response = processJsonReportArray( listOfReportObjects );
    console.log( 'COMPLETE : file receipt array : \n', response );
  }
}



SecsvCommand.description = `Describe the command here
This command is a simple parser for the various security reports produced by gitlab, converting them from JSON into csv.

if no flag is passed all json files in the current folder that are of one of the processable report types will be created in the same folder.

probably just use the default mode for now eh.

-f                : now same as no flag being passed
--file=FILENAME   : converts the given file only which must exist in the current folder. will ignore file that is not of a supported scan type
--folder=FILEPATH : converts all json files within the given folder, outputting them in the current folder
`

SecsvCommand.flags = {
  file: flags.string(),
  folder: flags.string(),
  f: flags.boolean({char: 'f'}),
}

module.exports = SecsvCommand
