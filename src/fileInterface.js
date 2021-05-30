const fs = require('fs');
const path = require('path')
function enumList(flags){
  const { file, folder, f } = flags
  let files = [];
  try {
    if ( file ) {
      files.push(getFullFilePath( file ))
    }
    if ( folder ) {
      console.log( 'folder', folder )
      files = [ ...getFolderReports( folder )]
      console.log("x", files)
    }
    if ( f ) {
      files = [ ...getFolderReports( process.cwd())]
    }
  } catch( err ) {
    console.log( 'err', err );
    return( err );
  }
  return files;
} // end enumList

function enumerateList( flags ){
  const listOfFiles = enumList( flags );
  const filteredList = filterNonJson( listOfFiles );
  const reports = getReportObjects( filteredList );
  const cleanReports = filterNonReportObjects( reports );
  return cleanReports
}

const acceptableReports = [ 'sast', 'dependency_scanning', 'dast'];

function filterNonReportObjects( reportObjectArray ) {
  return reportObjectArray.filter( report => {
    if(report.report.scan && acceptableReports.includes( report.report.scan.type )) {
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
      report: JSON.parse(fs.readFileSync(p, 'utf8'))
    }
  })
  console.log(returnArr)
  return returnArr
}

function getFolderReports( folder ) {
  console.log('xxxxx', folder);
  const reports = [];
  const filenames = fs.readdirSync(folder)
  console.log('fnames', filenames)
  filenames.forEach( function( file ) {
    reports.push(`${ folder ? folder : process.cwd()}/${ file }`);
  })
  console.log('reps', reports)
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
  console.log('hai from writefile', filename, path)

  const outputPath = `${path}/${filename.split('.')[0]}.csv`;

  fs.writeFile(outputPath, object, function(err) {
    if(err) return console.log(err)
  })
  return { name: filename, status: "OK"}

}


module.exports = {
  writeFile,
  enumerateList
}
