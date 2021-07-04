export class Cell {

    constructor(private x: number, private y: number) {}

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    equals(cell: Cell) {
        return this.x === cell.getX() && this.y === cell.getY();
    }
}
