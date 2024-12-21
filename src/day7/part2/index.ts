import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day7.txt", "utf-8");
    const input = stringInput.split(/\r\n/gm);
    console.log(findTotalCalibrationResult(input));
}

function updateResults(oldResults: number[], newNumber: number, target: number) {
    const newResults: number[] = [];

    oldResults.forEach((oldResult: number) => {
        const add = oldResult + newNumber;
        const mult = oldResult * newNumber;
        const concat = parseInt(oldResult.toString() + newNumber.toString());
        if (add <= target) {
            newResults.push(add);
        }
        if (mult <= target) {
            newResults.push(mult);
        }
        if (concat <= target) {
            newResults.push(concat);
        }
    });
    return newResults;
}

function tryCalibration(target: number, numbers: number[]) {
    let results: number[] = [numbers[0]]; // start with the first number.

    for (let i = 1; i < numbers.length; i++) {
        results = updateResults(results, numbers[i], target);
        if (results.length === 0) {
            break;
        }
    }

    for (const result of results) {
        if (result === target) {
            return target;
        }
    }

    return 0;
}

function findTotalCalibrationResult(input: string[]) {
    let totalCalibrationResult = 0;

    input.forEach((stringEquation: string) => {
        const target = parseInt(stringEquation.split(": ")[0]);
        const numbers = stringEquation
            .split(": ")[1]
            .split(" ")
            .map((stringNum) => parseInt(stringNum));

        const result = tryCalibration(target, numbers);
        totalCalibrationResult += result;
    });

    return totalCalibrationResult;
}
