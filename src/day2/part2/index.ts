import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day2-test.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(input);
}