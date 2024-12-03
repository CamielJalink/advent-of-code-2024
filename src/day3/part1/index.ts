import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day3.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(doMultiplications(input));
}

function doMultiplications(input: string[]) {
    let sumOfMultiplications = 0;

    input.forEach((line: string) => {
        const matches = line.match(/(mul\()\d+,\d+\)/g);

        matches?.forEach((match: string) => {
            const stringNumbers = match.match(/\d+,\d+/g) as string[];
            const nums = stringNumbers[0].split(",").map((stringNum: string) => parseInt(stringNum));
            sumOfMultiplications += nums[0] * nums[1];
        });
    });

    return sumOfMultiplications;
}
