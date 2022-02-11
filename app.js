import { readdirSync, rename } from 'fs';
import { resolve, parse }  from 'path';
import chalk from 'chalk';

// Get path to image directory
// TODO pull from Google Drive API 
const imageDirPath = resolve('.', './employer-logos/'); 

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

function changeNames(fileName) {
  fileName = (parse(fileName).name + '_color' + parse(fileName).ext).toLowerCase();
  var whitespaces = fileName.replace(/\s+/g, '_');
  var dash = whitespaces.replace(/-/g, '_');
  var periodash = dash.replace('._', '_');  
  console.log((parse(periodash).ext == '.svg') 
    ? parse(periodash).name + chalk.bold.blue(parse(periodash).ext) 
    : parse(periodash).name + chalk.bold.green(parse(periodash).ext) 
  );
  return periodash;
}

// Loop through each file that was retrieved
files.forEach(file => rename(
  imageDirPath + `/${file}`,
  imageDirPath + `/${changeNames(file)}`,
  err => console.log('already renamed 👋')
));
console.log();
console.log(chalk.magenta('Logos amount: ') + chalk.green.bold(files.length));