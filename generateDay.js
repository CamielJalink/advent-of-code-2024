const fs = require("fs");
const prompt = require("prompt-sync")();
let day = "day" + prompt("Which day do you wish to generate? Day:");

const indexBoilerPlate = `import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/${day}-test.txt", "utf-8");
    const input = stringInput.split(/\\n\\n/gm);
    console.log(input);
}`;

const startPart1Boilerplate = `import advent from "./${day}/part1";
advent();`;
const startPart2Boilerplate = `import advent from "./${day}/part2";
advent();`;

fs.writeFileSync("./src/part1.ts", startPart1Boilerplate);
fs.writeFileSync("./src/part2.ts", startPart2Boilerplate);

if (!fs.existsSync("./src/" + day)) {
    fs.mkdirSync("./src/" + day);
    const part1 = "./src/" + day + "/part1";
    const part2 = "./src/" + day + "/part2";
    createStructure(part1);
    createStructure(part2);
    fs.writeFileSync("./input/" + day + "-test.txt", "");
    fs.writeFileSync("./input/" + day + ".txt", "");
} else {
    console.log(day + " already exists!");
}

function createStructure(dirName) {
    fs.mkdirSync(dirName);
    fs.writeFileSync(dirName + "/index.ts", indexBoilerPlate);
}
