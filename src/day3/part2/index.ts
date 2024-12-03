import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day3.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(doMultiplications(input));
}

function doMultiplications(input: string[]) {
    let sumOfMultiplications = 0;
    let isCounting = true;
    console.log(input);
    input.forEach((line: string) => {
        for (let i = 0; i < line.length; i++) {
            if (line.substring(i, i + 4) === "do()") {
                isCounting = true;
                console.log("switched to isCounting true");
            }

            if (line.substring(i, i + 7) === "don't()") {
                isCounting = false;
                console.log("switched to isCounting false");
            }

            if (isCounting) {
                const match = line.substring(i, line.length).match(/(mul\()\d+,\d+\)/) as string[];
                if (!match) {
                    break;
                }

                const length = match[0].length;
                if (line.substring(i, i + length) === match[0]) {
                    const stringNums = match[0].match(/\d+,\d+/) as string[];
                    const nums = stringNums[0].split(",").map((stringNum: string) => parseInt(stringNum));
                    console.log(nums);
                    sumOfMultiplications += nums[0] * nums[1];
                }
            }
        }
    });

    return sumOfMultiplications;
}
