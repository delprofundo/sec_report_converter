const { parse } = require("json2csv")
const { writeFile } = require('./fileInterface');
const { processVulnerabilityArray } = require("./scanArrayProcessor");
const processedReportTypes = [ "sast", "dast", "dependency_scanning"];
function processJsonReportArray(jsonReportArray, outputPath= process.cwd()){
  // for each object in the array
  console.log('hson repoara', jsonReportArray)
  const reducedReports = jsonReportArray.map( report => reduceReport( report ))
  console.log( "redyced!", reducedReports[0] );
  const csvReportsResponse = reducedReports.map( report => convertReportToCsv( report ))
  console.log( "csvd" );
  const recieptArray = writeOutput( csvReportsResponse, outputPath )
  console.log( "fin" );
}

function writeOutput( reportCsvArray, outputPath ) {
  console.log(reportCsvArray);
  return reportCsvArray.map( reportCsv => writeReport( reportCsv, outputPath ))
}


function reduceReport( reportAssembly ) {
  console.log( "in reduceReport" );
  const { report_filename, report } = reportAssembly;
  const { version, scan, vulnerabilities, remediations } = report;
  const { type, start_time, end_time, status } = scan;
  //if type not in list return invalid
  if( status !== "success" ) {
    return {
      version,
      status: "SCAN_FAILED",
      scanRanAt: start_time,
      description: `scanner reported failure to  scan`,
      report_filename
    }
  }
  if( !processedReportTypes.includes( type )) {
    return {
      version,
      status: "SCAN_TYPE_UNKNOWN",
      scanRanAt: start_time,
      description: `the report type ${type} is not currently supported`,
      report_filename
    }
  }
  //if no vulns return clean report
  if( !vulnerabilities ){
    console.log("no vunls!");
    return {
      version,
      status: "NO_VULNERABILITIES PRESENT",
      scanRanAt: start_time,
      description: "no vulnerabilities found in scan results",
      report_filename
    }
  }
  //now we have vulnerabilities, time to assemble a flat file
  const resultArray = processVulnerabilityArray( report, report_filename );
  console.log(`${resultArray.length} results in arr`)
  console.log( "made a response: ");
  return resultArray;
}

function convertReportToCsv( report ) {
  console.log("inside convertReportToCsv", report.count);
  //take reduced report
  let csvResponse;
  try {
    console.log("making csv");
    csvResponse = parse(report)
    console.log('made csv')
  } catch( err ) {
    console.log("Inner Error SILENT : ", err );
    return null
  }
  return csvResponse;
}

function writeReport( report, outputPath ) {
  //write report to disk
  //with format startDate-type-response
  writeFile( report, report.split(",").pop().slice(1,-1), outputPath)
}

module.exports.processJsonReportArray = processJsonReportArray;
