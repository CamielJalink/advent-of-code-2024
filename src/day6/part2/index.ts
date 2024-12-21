import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day6.txt", "utf-8");
    const input = stringInput.split(/\r\n/gm);
    console.log(countValidObsticlePositions(input));
}

class Guard {
    direction;
    startingDirection;
    position;
    startingPosition;
    areaMap: Map<string, string>;
    visitedPos: Set<string>;

    constructor(direction: string, position: string, areaMap: Map<string, string>) {
        this.direction = direction;
        this.startingDirection = direction;
        this.position = position;
        this.startingPosition = position;
        this.areaMap = areaMap;
        this.visitedPos = new Set();
        this.visitedPos.add(position + " top");
    }

    resetGuard() {
        this.direction = this.startingDirection;
        this.position = this.startingPosition;
        this.visitedPos = new Set();
        this.visitedPos.add(this.position + " top");
    }

    checkBlockadePositions() {
        const correctBlockadePositions = new Set();

        this.areaMap.forEach((value: string, key: string) => {
            if (value === "." || value === "^") {
                this.areaMap.set(key, "#"); // Try placing a barrel at that position.
                this.resetGuard();

                if (this.walk() === true) {
                    correctBlockadePositions.add(key);
                }

                this.areaMap.set(key, "."); // Change it back.
            }
        });

        return correctBlockadePositions.size;
    }

    // If the nextPos doesn't exist, we are done walking.
    outOfBounds(nextPos: string) {
        if (!this.areaMap.has(nextPos)) {
            return true;
        }
        return false;
    }

    walk(): boolean {
        const nextPos: string = this.determineNextPos();

        if (this.outOfBounds(nextPos)) {
            return false;
        } else {
            const nextPosValue = this.areaMap.get(nextPos);

            if (nextPosValue === "." || nextPosValue === "^") {
                if (this.visitedPos.has(nextPos + " " + this.direction)) {
                    return true;
                }
                this.visitedPos.add(nextPos + " " + this.direction);
                this.position = nextPos;
                return this.walk();
            } else if (nextPosValue === "#") {
                this.turnRight();
                return this.walk();
            } else {
                return false;
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

function countValidObsticlePositions(input: string[]) {
    const areaMap = new Map();
    const startDirection = "top";
    let startPosition = "";

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === "^") {
                startPosition = x + "," + y;
            }
            areaMap.set(x + "," + y, input[y][x]);
        }
    }

    const guard = new Guard(startDirection, startPosition, areaMap);
    return guard.checkBlockadePositions();
}
