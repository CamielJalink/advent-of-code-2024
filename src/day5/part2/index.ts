import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day5.txt", "utf-8");
    const input = stringInput.split(/\n\n/gm);
    console.log(findMiddleOfIncorrectlyOrdered(input));
}

function findMiddleOfIncorrectlyOrdered(input: string[]) {
    const rules = input[0].split(/\n/gm);
    const updates = input[1].split(/\n/gm);
    const rulesSet = new Set<string>();
    rules.forEach((rule: string) => {
        rulesSet.add(rule);
    });

    let sumOfMiddleInputs = 0;

    updates.forEach((update: string) => {
        let pages = update.split(",");
        let brokenRules = checkValid(rulesSet, pages);

        if (brokenRules.length > 0) {
            // If the size is initially not 0, we have rules that need to be fixed.
            while (brokenRules.length > 0) {
                pages = fixBrokenRule(pages, brokenRules[0]); // fix broken rules by swapping those numbers.
                brokenRules = checkValid(rulesSet, pages); // check if any brokenrules remain.
            }
            sumOfMiddleInputs += parseInt(pages[(pages.length - 1) / 2]);
        }
    });
    return sumOfMiddleInputs;
}

function fixBrokenRule(pages: string[], brokenRule: string) {
    const fixedPages: string[] = JSON.parse(JSON.stringify(pages));
    const involvedPages = brokenRule.split("|");

    let index1 = 0;
    let index2 = 0;
    for (let i = 0; i < pages.length; i++) {
        if (pages[i] === involvedPages[0]) {
            index1 = i;
        }
        if (pages[i] === involvedPages[1]) {
            index2 = i;
        }
    }
    fixedPages[index1] = pages[index2];
    fixedPages[index2] = pages[index1];
    return fixedPages;
}

function checkValid(rulesSet: Set<string>, pages: string[]) {
    const rulesToCheck: string[] = [];
    const brokenRules: string[] = [];

    for (let i = 1; i < pages.length; i++) {
        const searchRule = pages[i] + "|" + pages[i - 1];
        rulesToCheck.push(searchRule);

        for (let j = 0; j < rulesToCheck.length; j++) {
            const stringRule = rulesToCheck[j];
            if (rulesSet.has(stringRule)) {
                brokenRules.push(stringRule);
            }
        }
    }

    return brokenRules;
}
