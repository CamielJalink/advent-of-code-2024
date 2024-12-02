import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day1.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findSimilarityScore(input));
}

function findSimilarityScore(data: string[]) {
    const leftList: number[] = [];
    const rightList: number[] = [];
    data.forEach((stringPair: string) => {
        leftList.push(parseInt(stringPair.split("   ")[0]));
        rightList.push(parseInt(stringPair.split("   ")[1]));
    });

    let similarityScore = 0;

    leftList.forEach((num: number) => {
        let matches = 0;
        rightList.forEach((rightNum: number) => {
            if (num === rightNum) {
                matches++;
            }
        });
        similarityScore += num * matches;
    });

    return similarityScore;
}
