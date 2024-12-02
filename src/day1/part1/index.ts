import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day1.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(findTotalDistance(input));
}

function findTotalDistance(data: string[]) {
    const leftList: number[] = [];
    const rightList: number[] = [];
    data.forEach((stringPair: string) => {
        leftList.push(parseInt(stringPair.split("   ")[0]));
        rightList.push(parseInt(stringPair.split("   ")[1]));
    });
    leftList.sort();
    rightList.sort();

    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }
    return totalDistance;
}
