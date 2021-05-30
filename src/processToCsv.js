const { parse } = require( "json2csv" )
const { writeFile } = require( "./fileInterface" );
const { processVulnerabilityArray } = require( "./scanArrayProcessor" );
const processedReportTypes = [ "sast", /*"dast",*/ "dependency_scanning" ];
function processJsonReportArray(jsonReportArray, outputPath= process.cwd()){
  const reducedReports = jsonReportArray.map( report => reduceReport( report ))
  const csvReportsResponse = reducedReports.map( report => convertReportToCsv( report ))
  return writeOutput( csvReportsResponse, outputPath );
}

function writeOutput( reportCsvArray, outputPath ) {
  return reportCsvArray.map( reportCsv => {
    return writeReport( reportCsv, outputPath );
  })
}

function reduceReport( reportAssembly ) {
  const { report_filename, report } = reportAssembly;
  const { version, scan, vulnerabilities } = report;
  const { type, start_time, end_time, status } = scan;
  //if type not in list return invalid
  if( status !== "success" ) {
    return {
      version,
      status: "SCAN_FAILED",
      scanRanAt: start_time,
      scanEndedAt: end_time,
      description: `scanner reported failure to  scan`,
      report_filename
    }
  }
  if( !processedReportTypes.includes( type )) {
    return {
      version,
      status: "SCAN_TYPE_UNKNOWN",
      scanRanAt: start_time,
      scanEndedAt: end_time,
      description: `the report type ${type} is not currently supported`,
      report_filename
    }
  }
  // flatten reports that passed all the above.
  const resultArray = processVulnerabilityArray( report, report_filename );
  return resultArray;
}

function convertReportToCsv( report ) {
  //take reduced report
  let csvResponse;
  try {
    console.log("making csv", report[0].report_filename);
    csvResponse = parse(report)
  } catch( err ) {
    console.log("Inner Error SILENT : ", err );
    return null
  }
  return csvResponse;
}

function writeReport( report, outputPath ) {
  return writeFile( report, report.split(",").pop().slice(1,-1), outputPath)
}

module.exports.processJsonReportArray = processJsonReportArray;
