import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day8.txt", "utf-8");
    const input = stringInput.split(/\r\n/gm);
    console.log(findAntiNodes(input));
}

function findAntiNodes(input: string[]) {
    const towers: Map<string, string> = new Map();
    const maxY = input.length - 1;
    const maxX = input[0].length - 1;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const symbol = input[y][x];

            if (symbol !== ".") {
                towers.set(x + "," + y, symbol);
            }
        }
    }

    const antiNodes: Set<string> = new Set();

    towers.forEach((type1: string, coord1Str: string) => {
        towers.forEach((type2: string, coord2Str: string) => {
            // If the type is the same, but it isn't the exact same tower
            if (type1 === type2 && coord1Str !== coord2Str) {
                const coord1: number[] = getNumberCoord(coord1Str);
                const coord2: number[] = getNumberCoord(coord2Str);
                const diff: number[] = findDiff(coord1, coord2);
                findAndAddAntinodes(antiNodes, coord1, coord2, diff, maxX, maxY);
            }
        });
    });

    return antiNodes.size;
}

function findAndAddAntinodes(
    antiNodes: Set<string>,
    coord1: number[],
    coord2: number[],
    diff: number[],
    maxX: number,
    maxY: number,
) {
    let x = coord1[0],
        y = coord1[1];
    while (x >= 0 && y >= 0 && x <= maxX && y <= maxY) {
        antiNodes.add(x + "," + y);
        x += diff[0];
        y += diff[1];
    }

    x = coord2[0];
    y = coord2[1];
    while (x >= 0 && y >= 0 && x <= maxX && y <= maxY) {
        antiNodes.add(x + "," + y);
        x -= diff[0];
        y -= diff[1];
    }
}

function getNumberCoord(coordStr: string) {
    return coordStr.split(",").map((coord: string) => parseInt(coord));
}

function findDiff(coord1: number[], coord2: number[]) {
    return [coord1[0] - coord2[0], coord1[1] - coord2[1]];
}
