const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const types = [
  {
    name: 'idols',
    validate: validateIdols
  },
  {
    name: 'items',
    validate: validateItems
  },
  {
    name: 'upgrades',
    validate: validateUpgrades
  }
];

// Load sprites offsets
const sprites = loadYAMLFile(path.resolve(__dirname, `../data/sprites.yaml`));

// Convert yaml data files to json files
for (const type of types) {
  console.log(`\n[${type.name}] Converting ${type.name}.yaml to ${type.name}.json`);
  const data = loadYAMLFile(path.resolve(__dirname, `../data/${type.name}.yaml`));
  type.validate(data, sprites);
  saveJSONFile(path.resolve(__dirname, `../public/${type.name}.json`), data);
}

// Save sprites offsets
const outputPath = path.resolve(__dirname, `../public/sprites.json`);
saveJSONFile(outputPath, sprites);


function loadYAMLFile(inputPath) {
  try {
    return yaml.load(fs.readFileSync(inputPath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

function saveJSONFile(outputPath, data, callback = err => err && console.log(err)) {
  try {
    fs.writeFile(outputPath, JSON.stringify(data), null, callback);
  } catch (e) {
    console.log(e);
  }
}

function validateIdols(idols, sprites) {
  for (const idol of idols) {
    const idolName = idol.name;
    const specialName = idol.special.name;
    const attackName = idol.attack.name;
    const skillNames = idol.skills?.map(skill => skill.name) || [];

    // Idol offset
    if (!sprites['idols'].offsets[idolName]) {
      console.log(`  [${idolName}] Sprite offset missing for idol "${idolName}"`);
    }

    // Special offset
    if (!sprites['skills'].offsets[specialName]) {
      console.log(`  [${idolName}] Sprite offset missing for special "${specialName}"`);
    }

    // Attack offset
    if (!sprites['skills'].offsets[attackName]) {
      console.log(`  [${idolName}] Sprite offset missing for special "${attackName}"`);
    }

    // Number of skills
    if (skillNames.length !== 3) {
      console.log(`  [${idolName}] Found ${skillNames} skills, that doesn't seem right.`);
    }

    // Skills offset
    for (const skillName of skillNames) {
      if (!sprites['skills'].offsets[skillName]) {
        console.log(`  [${idolName}] Sprite offset missing for skill "${skillName}"`);
      }
    }
  }
}

function validateItems(items, sprites) {
  for (const item of items) {
    if (!sprites['items'].offsets[item.name]) {
      console.log(`  [${item.name}] Sprite offset missing`);
    }
  }
}

function validateUpgrades(upgrades, sprites) {
  for (const upgrade of upgrades) {
    if (!sprites['upgrades'].offsets[upgrade.name]) {
      console.log(`  [${upgrade.name}] Sprite offset missing`);
    }
  }
}