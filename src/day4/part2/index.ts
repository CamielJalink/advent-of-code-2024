import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4-test2.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findXMas(input));
}

function findXMas(puzzel: string[]) {
    let xmasCount = 0;

    for (let y = 0; y < puzzel.length; y++) {
        const line = puzzel[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === "A") {
                // In these directions, see if the word is finished in that direction.
                if (checkXMas(puzzel, x, y)) {
                    xmasCount++;
                }
            }
        }
    }

    return xmasCount;
}

function checkXMas(puzzel: string[], x: number, y: number) {
    let isValidWord = false;
    const upperLeft = puzzel[y - 1]?.[x - 1];
    const upperRight = puzzel[y - 1]?.[x + 1];
    const lowerLeft = puzzel[y + 1]?.[x - 1];
    const lowerRight = puzzel[y + 1]?.[x + 1];

    if (
        ((upperLeft === "M" && lowerRight === "S") || (upperLeft === "S" && lowerRight === "M")) &&
        ((upperRight === "S" && lowerLeft === "M") || (upperRight === "M" && lowerLeft === "S"))
    ) {
        isValidWord = true;
    }

    return isValidWord;
}
