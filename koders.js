const fs = require("node:fs");
const dbName = "koders.json";

function init() {
  const dbExists = fs.existsSync(dbName);

  if (!dbExists) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf-8");
  }
}

function getKoders() {
  const fileContent = fs.readFileSync(dbName, "utf-8");
  const kodersList = JSON.parse(fileContent);
  return kodersList;
}

function saveKoders(list) {
  fs.writeFileSync(dbName, JSON.stringify(list), "utf-8");
}

function ls() {
  const koders = getKoders();
  if (koders.length === 0) {
    console.info("No koders found");
    process.exit(0);
  }
  koders.forEach((koder) => {
    console.log(koder);
  });
}
function add() {
  const koders = getKoders();
  const newKoder = process.argv[3];
  if (!newKoder) {
    console.error("Please provide a name");
    process.exit(2);
  }
  koders.push(newKoder);
  saveKoders(koders);
  console.log("Koder added succesfully");
  ls();
}

function rm() {
  const koders = getKoders();
  const koderToRemove = process.argv[3];
  if (!koderToRemove) {
    console.error("Please provide a name to remove");
    process.exit(3);
  }
  const exists = koders.find(
    (koder) => koder.toLowerCase() === koderToRemove.toLowerCase()
  );

  if (!exists) {
    console.error("Koder not found");
    process.exit(4);
  }
  const kodersListFilter = koders.filter(
    (koder) => koder.toLowerCase() != koderToRemove.toLowerCase()
  );
  saveKoders(kodersListFilter);

  console.log("Koder removed");
  ls();
}

function reset() {
  saveKoders([]);
  console.info("Reset successful");
}
function help() {
  console.log(`
            Usage: koders [command]
            Commands:
            ls      List all koders
            add     Add a new koder
            rm      Remove a koder
            reset   Remove all koders`);
}

const command = process.argv[2];

init();

const commands = {
  ls,
  add,
  rm,
  reset,
  help,
};

commands[command] ? commands[command]() : help();
