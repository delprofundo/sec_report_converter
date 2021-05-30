const fs = require('fs');
const path = require('path');

const { processedReportTypes } = require( './config' );

function enumerateReportList( flags ){
  const listOfFiles = enumList( flags );
  const filteredList = filterNonJson( listOfFiles );
  return getReportObjects( filteredList );
  //return filterNonReportObjects( reports );
}

function enumList(flags){
  const { file, folder, f } = flags
  let files = [];
  try {
    if ( file ) {
      files.push(getFullFilePath( file ))
    }
    if ( folder ) {
      files = [ ...getFolderReports( folder )]
    }
    if ( f || (!file && !folder && !f)) {
      files = [ ...getFolderReports( process.cwd())]
    }
  } catch( err ) {
    console.log( 'err', err );
  }
  return files;
}

function filterNonReportObjects( reportObjectArray ) {
  return reportObjectArray.filter( report => {
    if(report.report.scan && processedReportTypes.includes( report.report.scan.type )) {
      return report;
    }
  })
}

function filterNonJson( files ) {
  return files.filter( file => {
    if(path.extname(file) === ".json")
      return file
  })
}

function getReportObjects( paths ) {
  const returnArr = paths.map( p => {
    return {
      report_filename: path.basename(p),
      report: JSON.parse( fs.readFileSync(p, 'utf8'))
    }
  })
  return returnArr
}

function getFolderReports( folder ) {
  const reports = [];
  const filenames = fs.readdirSync( folder )
  filenames.forEach( function( file ) {
    reports.push(`${ folder ? folder : process.cwd()}/${ file }`);
  })
  return reports;
}

function getFullFilePath( file ){
  try {
    return `${ process.cwd()}/${ file }`
  } catch( err ) {
    return err;
  }
}

function writeFile( object, filename, path ) {
  const outputPath = `${ path }/${ filename.split('.')[ 0 ]}.csv`;
  fs.writeFile(outputPath, object, function( err) {
    if( err ) return console.log( err )
  })
  return { name: filename, status: "OK" }
}

module.exports = {
  writeFile,
  enumerateReportList
}
