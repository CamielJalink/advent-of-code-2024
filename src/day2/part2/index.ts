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
        if (checkRapport(rapport)) {
            safeReports++;
        } else {
            const rapportVariants: number[][] = [];
            for (let i = 0; i < rapport.length; i++) {
                const variant: number[] = [];
                for (let j = 0; j < rapport.length; j++) {
                    if (i !== j) {
                        variant.push(rapport[j]);
                    }
                }
                rapportVariants.push(variant);
            }
            let isSafe = false;

            rapportVariants.forEach((variant: number[]) => {
                if (checkRapport(variant)) {
                    isSafe = true;
                }
            });

            if (isSafe) {
                safeReports++;
            }
        }
    });
    return safeReports;
}

function checkRapport(rapport: number[]) {
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

    return isSafe;
}

function parseRapports(rapports: string[]) {
    const parsedRapports: number[][] = [];
    rapports.forEach((rapport: string) => {
        parsedRapports.push(rapport.split(" ").map((level) => parseInt(level)));
    });
    return parsedRapports;
}
