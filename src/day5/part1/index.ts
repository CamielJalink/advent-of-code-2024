import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(findMiddleOfCorrectlyOrdered(input));
}

function findMiddleOfCorrectlyOrdered(input: string[]) {
    const rules = input[0].split(/\n/gm);
    const updates = input[1].split(/\n/gm);
    const rulesSet = new Set<string>();
    rules.forEach((rule: string) => {
        rulesSet.add(rule);
    });

    let sumOfMiddleInputs = 0;

    updates.forEach((update: string) => {
        const pages = update.split(",");
        const rulesToCheck: string[] = [];
        let validUpdate = true;

        loopName: for (let i = 1; i < pages.length; i++) {
            const searchRule = pages[i] + "|" + pages[i - 1];
            rulesToCheck.push(searchRule);

            for (let j = 0; j < rulesToCheck.length; j++) {
                const stringRule = rulesToCheck[j];
                if (rulesSet.has(stringRule)) {
                    validUpdate = false;
                    break loopName;
                }
            }
        }

        if (validUpdate) {
            sumOfMiddleInputs += parseInt(pages[(pages.length - 1) / 2]);
        }
    });

    return sumOfMiddleInputs;
}
