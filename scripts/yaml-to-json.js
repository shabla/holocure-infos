const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const files = ['idols', 'items', 'upgrades'];

try {
  for (const filename of files) {
    const inputPath = path.resolve(__dirname, `../data/${filename}.yaml`);
    const outputPath = path.resolve(__dirname, `../public/${filename}.json`);

    console.log(`Converting ${filename}.yaml to ${filename}.json`);

    const doc = yaml.load(fs.readFileSync(inputPath, 'utf8'));
    const data = JSON.stringify(doc);

    fs.writeFile(outputPath, data, null, err => err ? console.log(err) : undefined);
  }
} catch (e) {
  console.log(e);
}