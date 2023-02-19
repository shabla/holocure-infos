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
  },
  {
    name: 'stamps',
    validate: validateStamps
  }
];

// Load sprites offsets
const inputBasePath = path.resolve(__dirname, '../data');
const outputBasePath = path.resolve(__dirname, '../packages/web/src/assets/data');
const sprites = loadYAMLFile(path.resolve(inputBasePath, 'sprites.yaml'));
const logs = [];

// Convert yaml data files to json files
for (const type of types) {
  const typeLogs = [`[${type.name}] Converting ${type.name}.yaml to ${type.name}.json`];
  const data = loadYAMLFile(path.resolve(inputBasePath, `${type.name}.yaml`));
  const validationLogs = type.validate(data, sprites).filter(line => !!line);

  if (validationLogs.length) {
    typeLogs.push(...validationLogs.map(line => `\t${line}`));
  } else {
    typeLogs.push('\tDone, everything looks good!');
  }

  const saveLog = saveJSONFile(path.resolve(outputBasePath, `${type.name}.json`), data);

  logs.push(...typeLogs, `\t${saveLog}\n`);
}

// Save sprites offsets
const outputPath = path.resolve(outputBasePath, 'sprites.json');
const saveSpriteLog = saveJSONFile(outputPath, sprites);

[...logs, '[sprites]', `\t${saveSpriteLog}`].forEach(line => console.log(line));


/**
 * Validation functions
 */
function validateIdols(idols, sprites) {
  const idolById = {};
  const output = [];

  for (const idol of idols) {
    output.push(checkDupeIds(idolById, idol.id, idol.name));
    output.push(checkMissingSprite(sprites, "idols", idol.name));

    // Special
    if (idol.special?.name) {
      output.push(checkMissingSprite(sprites, "skills", idol.special?.name));
    } else {
      output.push(`[${idol.name}] Special missing`);
    }

    // Attack
    if (idol.attack?.name) {
      output.push(checkMissingSprite(sprites, "skills", idol.attack?.name));
    } else {
      output.push(`[${idol.name}] Attack missing`);
    }

    // Number of skills
    const skillNames = (idol.skills || []).map(skill => skill.name);
    if (skillNames.length !== 3) {
      output.push(`[${idol.name}] Found ${skillNames.length} skills, that doesn't seem right.`);
    }

    // Skills offset
    for (const skillName of skillNames) {
      if (skillName) {
        output.push(checkMissingSprite(sprites, "skills", skillName));
      } else {
        output.push(`[${idol.name}] Skill missing`);
      }
    }
  }

  return output;
}

function validateItems(items, sprites) {
  const itemById = {};
  const output = [];

  for (const item of items) {
    output.push(checkMissingSprite(sprites, "items", item.name));
    output.push(checkDupeIds(itemById, item.id, item.name));
  }

  return output;
}

function validateUpgrades(upgrades, sprites) {
  const output = [];

  for (const upgrade of upgrades) {
    output.push(checkMissingSprite(sprites, "upgrades", upgrade.name));
  }

  return output;
}

function validateStamps(stamps, sprites) {
  const stampById = {};
  const output = [];

  for (const stamp of stamps) {
    output.push(checkMissingSprite(sprites, "stamps", stamp.name));
    output.push(checkDupeIds(stampById, stamp.id, stamp.name));
  }

  return output;
}

/**
 * Utility functions
 */
function checkMissingSprite(sprites, type, key) {
  if (!sprites[type].offsets[key]) {
    return `[${key}] Sprite offset missing`;
  }
}

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
    return `Saved file to ${outputPath}`;

  } catch (e) {
    console.log(e);
  }
}

// check for duplicate id
// ids will be mutated when adding new id
function checkDupeIds(ids, id, name) {
  if (id) {
    if (ids[id]) {
      // duplicate id
      return `[${name}] id ${id} already used by ${ids[id]}`;

    } else {
      // not duplicate id
      ids[id] = name;
    }
  } else {
    return `[${name}] id missing`;
  }
}