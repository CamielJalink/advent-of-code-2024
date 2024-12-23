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

                const antiNode1: number[] = [coord1[0] + diff[0], coord1[1] + diff[1]];
                const antiNode2: number[] = [coord2[0] - diff[0], coord2[1] - diff[1]];

                if (withinBounds(antiNode1, maxX, maxY)) {
                    antiNodes.add(antiNode1[0] + "," + antiNode1[1]);
                }
                if (withinBounds(antiNode2, maxX, maxY)) {
                    antiNodes.add(antiNode2[0] + "," + antiNode2[1]);
                }
            }
        });
    });

    return antiNodes.size;
}

function withinBounds(antiNode: number[], maxX: number, maxY: number) {
    if (antiNode[0] >= 0 && antiNode[1] >= 0 && antiNode[0] <= maxX && antiNode[1] <= maxY) {
        return true;
    }
    return false;
}

function getNumberCoord(coordStr: string) {
    return coordStr.split(",").map((coord: string) => parseInt(coord));
}

function findDiff(coord1: number[], coord2: number[]) {
    return [coord1[0] - coord2[0], coord1[1] - coord2[1]];
}
