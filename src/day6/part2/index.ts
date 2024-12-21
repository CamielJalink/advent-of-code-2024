import { readFileSync } from "fs";

export default function advent() {
    const stringInput = readFileSync("input/day6-test.txt", "utf-8");
    const input = stringInput.split(/\n/gm);
    console.log(countValidObsticlePositions(input));
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
        this.visitedPos.add(position + " top");
    }

    walk() {
        const nextPos: string = this.determineNextPos();

        // If the nextPos doesn't exist, we are done walking.
        if (!this.areaMap.has(nextPos)) {
            return;
        } else {
            const nextPosValue = this.areaMap.get(nextPos);

            if (nextPosValue === "." || nextPosValue === "^") {
                this.visitedPos.add(nextPos + " " + this.direction);
                this.position = nextPos;
                this.walk();
            } else {
                this.turnRight();
                this.walk();
            }
        }
    }

    checkWalk(): boolean {
        const nextPos: string = this.determineNextPos();
        const nextPosWithDirection: string = nextPos + " " + this.direction;

        if (this.visitedPos.has(nextPosWithDirection)) {
            return true;
        }

        // If the nextPos doesn't exist, we are done walking.
        if (!this.areaMap.has(nextPos)) {
            return false;
        } else {
            const nextPosValue = this.areaMap.get(nextPos);

            if (nextPosValue === "." || nextPosValue === "^") {
                this.visitedPos.add(nextPos + " " + this.direction);
                this.position = nextPos;
                return this.checkWalk();
            } else {
                this.turnRight();
                this.visitedPos.add(nextPos + " " + this.direction);
                return this.checkWalk();
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
    let direction = "";
    let startPosition = "";

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === "^") {
                direction = "top";
                startPosition = x + "," + y;
            }
            areaMap.set(x + "," + y, input[y][x]);
        }
    }

    let guard = new Guard(direction, startPosition, areaMap);
    guard.walk();

    const relevantPositions: Set<string> = new Set(guard.visitedPos);
    relevantPositions.delete(startPosition + " top");

    const validObstaclePositions = new Set<string>();
    relevantPositions.forEach((position: string) => {
        guard = new Guard("top", startPosition, areaMap);

        const positionCoordinates = position.split(" ")[0];
        guard.areaMap.delete(positionCoordinates);
        guard.areaMap.set(positionCoordinates, "#");

        if (guard.checkWalk()) {
            // loop detected
            console.log(position);
            validObstaclePositions.add(position.split(" ")[0]);
        }

        guard.areaMap.delete(positionCoordinates);
        guard.areaMap.set(positionCoordinates, ".");
    });

    return validObstaclePositions.size;
}
