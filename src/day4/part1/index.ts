import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day4.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findWordCount(input, "XMAS"));
}

type Direction = {
    x: number;
    y: number;
};

function findWordCount(puzzel: string[], word: string) {
    let matches = 0;

    for (let y = 0; y < puzzel.length; y++) {
        const line = puzzel[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];

            if (char === word[0]) {
                const possibleDirections: Direction[] = checkDirections(word[1], puzzel, x, y);

                // In these directions, see if the word is finished in that direction.
                possibleDirections.forEach((direction: Direction) => {
                    if (findMatch(direction, word, puzzel, x, y)) {
                        matches++;
                    }
                });
            }
        }
    }

    return matches;
}

function findMatch(direction: Direction, word: string, puzzel: string[], startX: number, startY: number) {
    let isValidWord = true;

    for (let i = 1; i < word.length; i++) {
        if (puzzel[startY + direction.y * i]?.[startX + direction.x * i] !== word[i]) {
            isValidWord = false;
            break;
        }
    }

    return isValidWord;
}

// Check the directions in which the string is going.
function checkDirections(char: string, puzzel: string[], x: number, y: number) {
    const directions: Direction[] = [];
    if (puzzel[y]?.[x + 1] === char) {
        directions.push({ x: 1, y: 0 });
    }
    if (puzzel[y]?.[x - 1] === char) {
        directions.push({ x: -1, y: 0 });
    }
    if (puzzel[y + 1]?.[x + 1] === char) {
        directions.push({ x: 1, y: 1 });
    }
    if (puzzel[y + 1]?.[x] === char) {
        directions.push({ x: 0, y: 1 });
    }
    if (puzzel[y - 1]?.[x + 1] === char) {
        directions.push({ x: 1, y: -1 });
    }
    if (puzzel[y + 1]?.[x - 1] === char) {
        directions.push({ x: -1, y: 1 });
    }
    if (puzzel[y - 1]?.[x] === char) {
        directions.push({ x: 0, y: -1 });
    }
    if (puzzel[y - 1]?.[x - 1] === char) {
        directions.push({ x: -1, y: -1 });
    }

    return directions;
}
