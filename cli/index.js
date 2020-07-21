const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let curFilename;
let curFileContent;
let saveOnClose = false;

readline.on('close', async () => {
    if (saveOnClose) await saveCurrentFile();
    process.exit(0);
});

const CONSOLE_LOG_COLOR_FG_RED   = "\x1b[31m";
const CONSOLE_LOG_COLOR_FG_GREEN = "\x1b[32m";
const CONSOLE_LOG_COLOR_RESET    = "\x1b[0m";
let asciiArt = `
  __                          __ _           _                       _ 
 / _|                        / _| |         | |                     | |
| |_ __ _ _ __   ___ _   _  | |_| | __ _ ___| |__   ___ __ _ _ __ __| |
|  _/ _\` | '_ \\ / __| | | | |  _| |/ _\` / __| '_ \\ / __/ _\` | '__/ _\` |
| || (_| | | | | (__| |_| | | | | | (_| \\__ \\ | | | (_| (_| | | | (_| |
|_| \\__,_|_| |_|\\___|\\__, | |_| |_|\\__,_|___/_| |_|\\___\\__,_|_|  \\__,_|
                      __/ |                                            
                     |___/                                             
`;

async function cli () {
    logWelcomeMessage();
    let cmd;
    while (true) {
        cmd = await readCommand(`Commands: new file <filename>, edit file <filename>, exit`);
        if (cmd.startsWith("new file ")) {
            curFilename = cmd.substring("new file ".length);
            if (!curFilename.endsWith(".json")) curFilename += ".json";
            if (await doesFileAlreadyExist(curFilename)) {
                console.log(`There is already a file ${curFilename}`);
            } else {
                const author = await readValue("Author");
                curFileContent = { meta: { author }, decks: {} };
                await saveCurrentFile(false);
                await cliEditFile(curFilename);
            }
        } else if (cmd.startsWith("edit file ")) {
            const filename = cmd.substring("edit file ".length)
            await cliEditFile(filename);
        } else if (cmd === "exit") {
            if (saveOnClose) await saveCurrentFile();
            break;
        } else {
            console.log("Your command was not understood...");
        }
        saveOnClose = false;
    }
    readline.close();
}
cli();

function logWelcomeMessage () {
    console.log(asciiArt);
    let msg = `Welcome to the CLI to create files, decks and cards for `
        + `${CONSOLE_LOG_COLOR_FG_GREEN}Fancy Flashcard${CONSOLE_LOG_COLOR_RESET}. `
        + `Everything is autosaved.`;
    console.log(msg);
}

async function cliEditFile (filename) {
    saveOnClose = true;
    curFilename = filename;
    if (!curFilename.endsWith(".json")) curFilename += ".json";
    curFileContent = await readJSONFromFile(curFilename);
    console.log(`now editing ${curFilename}`);
    addUUIDToFileIfItExistsNotYet();
    while (true) {
        const cmd = await readCommand(`Commands: new deck <name>, list decks, edit deck <name>, delete deck <name>, show meta, meta <attr> <value>, whereami, back`);
        if (cmd.startsWith("new deck ")) {
            let deckName = cmd.substring("new deck ".length);
            if (curFileContent.decks[deckName] === undefined) {
                const description = await readValue("Description");
                curFileContent.decks[deckName] = {
                    meta: { deck_name: deckName, next_card_id: 0, description },
                    cards: {}
                }
                await cliEditDeck(deckName);
            } else {
                console.log("There is already a deck with that name. You might want to edit it.");
            }
        } else if (cmd === "list decks") {
            for (let deckName of Object.keys(curFileContent.decks)) {
                console.log(deckName);
            }
        } else if (cmd.startsWith("edit deck ")) {
            const deckName = cmd.substring("edit deck ".length);
            if (deckName in curFileContent.decks) {
                await cliEditDeck(deckName);
            } else {
                console.log("There is no deck with that name. You might want to create it.");
            }
        } else if (cmd.startsWith("delete deck ")) {
            const deckName = cmd.substring("delete deck ".length);
            const conf = await readCommand(`Do you really want to delete the deck ${deckName}? (y/n)`);
            if (conf.toLowerCase() === "y") {
                delete curFileContent.decks[deckName];
                console.log(`Deleted deck ${deckName}`);
            }
        } else if (cmd === "show meta") {
            for (let attr in curFileContent.meta) {
                console.log(`${attr}: ${curFileContent.meta[attr]}`);
            }
        } else if (cmd.startsWith("meta ")) {
            const attr = cmd.split(" ")[1];
            const value = cmd.substring(`meta ${attr} `.length);
            curFileContent.meta[attr] = value;
        } else if (cmd === "whereami") {
            logWhereIAm(curFilename);
        } else if (cmd === "back") {
            await saveCurrentFile();
            break;
        } else {
            console.log("Your command was not understood...");
        }
    }
}

function addUUIDToFileIfItExistsNotYet () {
    if (!("uuid" in curFileContent.meta)) {
        curFileContent.meta.uuid = uuidv4();
    }
}

async function cliEditDeck (deckName) {
    console.log(`now editing ${deckName} in ${curFilename}`);
    while (true) {
        const cmd = await readCommand(`Commands: add cards, list cards, edit card <id>, delete card <id>, show meta, meta <attr> <value>, whereami, back`);
        if (cmd === "add cards") {
            await cliAddCards(deckName);
        } else if (cmd === "list cards") {
            for (let cardId in curFileContent.decks[deckName].cards) {
                const card = curFileContent.decks[deckName].cards[cardId];
                console.log(`id: ${cardId} q: ${card.q} a: ${card.a}`)
            }
        } else if (cmd.startsWith("edit card ")) {
            const cardId = cmd.substring("edit card ".length);
            const card = curFileContent.decks[deckName].cards[cardId];
            console.log(`q: ${card.q} a: ${card.a}`);
            console.log("If you leave a field blank, it will not be changed");
            const q = await readValue("Q");
            if (q) card.q = q;
            const a = await readValue("A");
            if (a) card.a = a;
            console.log(`q: ${card.q} a: ${card.a}`);
        } else if (cmd.startsWith("delete card ")) {
            const cardId = cmd.substring("delete card ".length);
            const card = curFileContent.decks[deckName].cards[cardId];
            console.log(`id: ${cardId} q: ${card.q} a: ${card.a}`);
            const conf = await readCommand(`Do you really want to delete the card ${cardId}? (y/n)`);
            if (conf.toLowerCase() === "y") {
                delete curFileContent.decks[deckName].cards[cardId];
                console.log(`Deleted card ${cardId}`);
            }
        } else if (cmd === "show meta") {
            for (let attr in curFileContent.decks[deckName].meta) {
                console.log(`${attr}: ${curFileContent.decks[deckName].meta[attr]}`);
            }
        } else if (cmd.startsWith("meta ")) {
            const attr = cmd.split(" ")[1];
            const value = cmd.substring(`meta ${attr} `.length);
            curFileContent.decks[deckName].meta[attr] = value;
        } else if (cmd === "whereami") {
            logWhereIAm(curFilename, deckName);
        } else if (cmd === "back") {
            await saveCurrentFile();
            break;
        } else {
            console.log("Your command was not understood...");
        }
    }
}

async function cliAddCards (deckName) {
    console.log("\nEnter questions and answers. When you leave the question blank, you can run commands: continue, back");
    while (true) {
        console.log("");
        const q = await readValue("Q");
        if (q === "") {
            const cmd = await readCommand(`Commands: continue, back`);
            if (cmd === "continue") {
                continue;
            } else if (cmd === "back") {
                await saveCurrentFile();
                return;
            } else {
                console.log("Your command was not understood...");
                continue;
            }
        } else if (["back", "quit", "exit"].includes(q)) {
            console.log("(If you want to go back, you need to leave the question blank.)");
        }
        const a = await readValue("A");

        const id = addCardToDeck(deckName, q, a);
        console.log(`id: ${id}\n`);
    }
}

function addCardToDeck (deckName, q, a) {
    const id = curFileContent.decks[deckName].meta.next_card_id;
    curFileContent.decks[deckName].cards[id] = { q, a };
    curFileContent.decks[deckName].meta.next_card_id = id + 1;
    return id;
}

function logWhereIAm (filename, deckName) {
    if (deckName) {
        return console.log(`Deck: ${filename} > ${deckName}`);
    }
    console.log(`File: ${filename}`);
}

async function readCommand (question) {
    return new Promise((resolve, reject) => {
        readline.question(`\n${question}\n>> `, answer => {
            resolve(answer);
        });
    });
}

async function readValue (text) {
    return new Promise((resolve, reject) => {
        readline.question(`${text}: `, input => {
            resolve(input);
        });
    });
}

async function saveCurrentFile (log=true) {
    await writeJSONToFile(curFilename, curFileContent);
    if (log) console.log(`\nSaved ${curFilename}`);
}

async function doesFileAlreadyExist (filepath) {
    return new Promise((resolve, reject) => {
        fs.exists(filepath, (exists) => {
            resolve(exists);
        });
    });
}

async function readJSONFromFile (filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, "utf8", function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

async function writeJSONToFile (filepath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(content, null, 2), "utf8", function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
