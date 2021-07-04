import { Cell } from './cell';

export class CellList {

    constructor(private liveCells: Array<Cell>) {}

    getLiveCells() {
        return this.liveCells;
    }

    next() {

        const returnList = new Array<Cell>();

        const sweepArray = this.createSweepArray();

        sweepArray.forEach(point => {
            let pointNeighbors = this.getAmountLiveNeighbors(point);
            if (this.setCellStatus(point, pointNeighbors))
                returnList.push(new Cell(point.x, point.y));
        });

        this.liveCells = returnList;
    }

    createSweepArray() {
        const sweepArray = new Array<{ x: number, y: number }>();
        this.liveCells.forEach((cell: Cell) => {
            this.getNeighbors(cell).forEach(point => {
                sweepArray.push(point);
            });
            sweepArray.push({x: cell.getX(), y: cell.getY()})
        });

        return sweepArray.filter((point: { x: number, y: number }, idx) => {
            return sweepArray.findIndex(obj => obj.x === point.x && obj.y === point.y) === idx;
        });
    }

    getNeighbors(cell: Cell) {
        const neighborList: Array<{ x: number, y: number }> = []
        const x = cell.getX();
        const y = cell.getY();

        // check liveCells for a cell with coords
        // push cell if it exists

        // {x: x, y: y};
        neighborList.push({x, y: y + 1});
        neighborList.push({x: x + 1, y: y + 1});
        neighborList.push({x: x + 1, y});
        neighborList.push({x: x + 1, y: y - 1});
        neighborList.push({x, y: y - 1});
        neighborList.push({x: x - 1, y: y - 1});
        neighborList.push({x: x - 1, y});
        neighborList.push({x: x - 1, y: y + 1});

        return neighborList;
    }

    getAmountLiveNeighbors(point: { x: number, y: number }): number {
        const x = point.x;
        const y = point.y;
        let numNeighbors = 0;

        for (let i = 0; i < this.liveCells.length; i++) {
            const liveX = this.liveCells[i].getX();
            const liveY = this.liveCells[i].getY();
            if (liveX == x + 1 && liveY == y) {
                numNeighbors += 1;
            } else if (liveX == x + 1 && liveY == y + 1) {
                numNeighbors += 1;
            } else if (liveX == x + 1 && liveY == y - 1) {
                numNeighbors += 1;
            } else if (liveX == x && liveY == y + 1) {
                numNeighbors += 1;
            } else if (liveX == x && liveY == y - 1) {
                numNeighbors += 1;
            } else if (liveX == x - 1 && liveY == y + 1) {
                numNeighbors += 1;
            } else if (liveX == x - 1 && liveY == y) {
                numNeighbors += 1;
            } else if (liveX == x - 1 && liveY == y - 1) {
                numNeighbors += 1;
            }
        }
        return numNeighbors;
    }

    private setCellStatus(point: { x: number, y: number }, amountLiveNeighbors: number): boolean {
        let currentStatus = this.getCellStatus(point);

        if (currentStatus) {
            if (amountLiveNeighbors < 2)
                return false;
            return amountLiveNeighbors < 4;
        } else {
            return amountLiveNeighbors === 3;
        }
    }

    getCellStatus(point: { x: number; y: number }): boolean {
        return this.liveCells.filter(cell => {
            return cell.equals(new Cell(point.x, point.y));
        }).length > 0;
    }

}
