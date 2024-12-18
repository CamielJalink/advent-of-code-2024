import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day6-test.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countDistinctPositions(input));
}

class Guard {
    direction;
    position;
    areaMap: Map<string, string>;
    visitedPos: Set<string>;

    constructor(direction: string, position: string, areaMap: Map<string, string>) {
        this.direction = direction;
        this.position = position;
        this.areaMap = areaMap;
        this.visitedPos = new Set();
        this.visitedPos.add(position);
    }

    walk() {
        const nextPos: string = this.determineNextPos();

        // If the nextPos doesn't exist, we are done walking.
        if (!this.areaMap.has(nextPos)) {
            return;
        } else {
            const nextPosValue = this.areaMap.get(nextPos);

            if (nextPosValue === ".") {
                this.visitedPos.add(nextPos);
                this.position = nextPos;
                this.walk();
            } else {
                this.turnRight();
                this.walk();
            }
        }
    }

    turnRight() {
        if (this.direction === "top") {
            this.direction = "right";
        } else if (this.direction === "right") {
            this.direction = "bottom";
        } else if (this.direction === "bottom") {
            this.direction = "left";
        } else if (this.direction === "left") {
            this.direction = "top";
        }
    }

    determineNextPos() {
        const currentX = parseInt(this.position.split(",")[0]);
        const currentY = parseInt(this.position.split(",")[1]);
        let nextPos = "";

        if (this.direction === "top") {
            nextPos = currentX + "," + (currentY - 1);
        } else if (this.direction === "right") {
            nextPos = currentX + 1 + "," + currentY;
        } else if (this.direction === "bottom") {
            nextPos = currentX + "," + (currentY + 1);
        } else if (this.direction === "left") {
            nextPos = currentX - 1 + "," + currentY;
        }

        return nextPos;
    }
}

function countDistinctPositions(input: string[]) {
    const areaMap = new Map();
    let direction = "";
    let position = "";

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === "^") {
                direction = "top";
                position = x + "," + y;
            }
            areaMap.set(x + "," + y, input[y][x]);
        }
    }

    const guard = new Guard(direction, position, areaMap);
    guard.walk();
    console.log(guard.visitedPos);
    return guard.visitedPos.size;
}
