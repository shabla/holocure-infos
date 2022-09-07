const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const files = ['idols', 'items', 'upgrades'];

function loadYAMLFile(inputPath) {
  return yaml.load(fs.readFileSync(inputPath, 'utf8'));
}

try {
  // Load sprites offsets
  const sprites = loadYAMLFile(path.resolve(__dirname, `../data/sprites.yaml`));

  for (const filename of files) {
    const inputPath = path.resolve(__dirname, `../data/${filename}.yaml`);
    const outputPath = path.resolve(__dirname, `../public/${filename}.json`);

    console.log(`\nConverting ${filename}.yaml to ${filename}.json`);

    const data = loadYAMLFile(inputPath);

    // Check if all the items have a defined sprite and warn if missing
    for (const obj of data) {
      if (!sprites?.[filename]) {
        sprites[filename] = { width: 0, height: 0, offsets: [] };
      }

      if (!sprites[filename].offsets[obj.name]) {
        console.log(`[${filename}] sprite missing for "${obj.name}"`)
        // default for missing sprites
        sprites[filename][obj.name] = [0, 0]
      }
    }


    fs.writeFile(outputPath, JSON.stringify(data), null, err => err ? console.log(err) : undefined);
  }

  // Sprites
  const outputPath = path.resolve(__dirname, `../public/sprites.json`);
  fs.writeFile(outputPath, JSON.stringify(sprites), null, err => err ? console.log(err) : undefined);

} catch (e) {
  console.log(e);
}