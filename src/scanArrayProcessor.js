
function processVulnerabilityArray( report, report_filename ) {
  console.log("filenaaaaaam", report_filename)
  const { vulnerabilities, dependency_files, scan } = report;
  switch( scan.type ) {
  case "dependency_scanning":
    console.log("dep swish")
    return processDependencyScanning( vulnerabilities, dependency_files, scan, report_filename );
  case "sast":
    console.log("sast swish")
    return processSast( vulnerabilities, scan, report_filename );
  default:
    console.log(`scan type ${scan.type} not handled in processVulnerabilityArray`);
    return {}
  }
}

function processSast( vulnerabilities, scan, report_filename ) {
  const { type, start_time, end_time, status } = scan;
  const resultArray = vulnerabilities.map(vulnerability => {
    const {location, scanner, identifiers, ...vuln_remain} = vulnerability;
    return {
      status,
      ...vuln_remain,
      scannerId: scanner.id,
      scannerName: scanner.name,
      location: location.file,
      start_line: location.start_line.toString(),
      end_line: location.end_line.toString(),
      type,
      scanRanAt: start_time,
      scanEndedAt: end_time,
      report_filename
    }
  })
  console.log('done sast');
  return resultArray
}

function processDependencyScanning( vulnerabilities, dependency_files, scan, report_filename ) {
  const { type, start_time, end_time, status, scanner } = scan;
  const resultArray = vulnerabilities.map( vulnerability => {
    const { location, identifiers, links, scanner: scanner_dnu, ...vuln_remain} = vulnerability;
    return {
      status,
      location: location.file,
      ...vuln_remain,
      type,
      scannerId: scanner.id,
      scannerName: scanner.name,
      scannerVersion: scanner.version,
      scannerVendor: scanner.vendor.name,
      scanRanAt: start_time,
      scanEndedAt: end_time,
      urls: joinUrls(links),
      report_filename
    }
  })
  console.log('done deps');
  return resultArray
}

function joinUrls(urlsArray) {
  let result = "";
  urlsArray.forEach(urlObj => {
    result = `${urlObj.url}, ${result}`
  })
  return result;
}

module.exports.processVulnerabilityArray = processVulnerabilityArray;


