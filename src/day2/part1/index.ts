import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day2.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSafeReports(input));
}

function findSafeReports(rapports: string[]) {
    const parsedRapports = parseRapports(rapports);
    let safeReports = 0;

    parsedRapports.forEach((rapport: number[]) => {
        let isSafe = true;

        const ascending = JSON.parse(JSON.stringify(rapport)).sort((a: number, b: number) => {
            if (a > b) {
                return 1;
            } else if (b > a) {
                return -1;
            } else {
                return 0;
            }
        });
        const descending = JSON.parse(JSON.stringify(rapport)).sort((a: number, b: number) => {
            if (a > b) {
                return -1;
            } else if (b > a) {
                return 1;
            } else {
                return 0;
            }
        });

        let isAscending = true;
        for (let i = 0; i < rapport.length; i++) {
            if (rapport[i] !== ascending[i]) {
                isAscending = false;
                break;
            }
        }

        let isDescending = true;
        for (let i = 0; i < rapport.length; i++) {
            if (rapport[i] !== descending[i]) {
                isDescending = false;
                break;
            }
        }

        if (!isAscending && !isDescending) {
            isSafe = false;
        } else {
            for (let i = 1; i < rapport.length; i++) {
                if (rapport[i] === rapport[i - 1]) {
                    // no same numbers
                    isSafe = false;
                    break;
                } else if (Math.abs(rapport[i] - rapport[i - 1]) > 3) {
                    isSafe = false;
                    break;
                }
            }
        }

        if (isSafe) {
            safeReports++;
        }
    });
    return safeReports;
}

function parseRapports(rapports: string[]) {
    const parsedRapports: number[][] = [];
    rapports.forEach((rapport: string) => {
        parsedRapports.push(rapport.split(" ").map((level) => parseInt(level)));
    });
    return parsedRapports;
}
