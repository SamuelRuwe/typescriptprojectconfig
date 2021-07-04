import { CellList } from './cellList';
import { Cell } from './cell';

describe('cellList class', () => {

    it('should be able to be instantiated', () => {
        const inputCells: Array<Cell> = [];
        const list = new CellList(inputCells);
        expect(list).toBeTruthy();
    });

    describe('next function', () => {

        let firstCell, secondCell, thirdCell, fourthCell, fifthCell, sixthCell, seventhCell, eighthCell, ninthCell;
        let cellArray: Array<Cell>;

        beforeEach(() => {
            cellArray = [];
            firstCell = new Cell(0, 0);
            secondCell = new Cell(0, 1);
            thirdCell = new Cell(0, 2);
            fourthCell = new Cell(1, 0);
            fifthCell = new Cell(1, 1);
            sixthCell = new Cell(1, 2);
            seventhCell = new Cell(2, 0);
            eighthCell = new Cell(2, 1);
            ninthCell = new Cell(2, 2);

            cellArray.push(firstCell);
            cellArray.push(secondCell);
            cellArray.push(thirdCell);
            cellArray.push(fourthCell);
            cellArray.push(fifthCell);
            cellArray.push(sixthCell);
            cellArray.push(seventhCell);
            cellArray.push(eighthCell);
            cellArray.push(ninthCell);
        });

        it('should return a new array when next is called', () => {
            const inputCells: Array<Cell> = [];
            const list = new CellList(inputCells);
            list.next();
            const result = list.getLiveCells();
            expect(result).not.toBe(inputCells);
        });

        it('should return an empty array when there are no live cells', () => {
            const inputCells: Array<Cell> = [];
            const list = new CellList(inputCells);
            list.next();
            const result = list.getLiveCells();
            expect(result.length).toEqual(0);
        });

        test('a cell with no neighbors should die on next cycle', () => {
            const singleCell = new Cell(0, 0);
            const inputCells: Array<Cell> = [];
            const list = new CellList(inputCells);
            list.next();
            const result = list.getLiveCells();
            expect(result.indexOf(singleCell)).toEqual(-1);
        });

        test('a cell with only one neighbor should die on next cycle', () => {
            const singleCell = new Cell(0, 0);
            const secondCell = new Cell(0, 1);
            const inputCells: Array<Cell> = [singleCell, secondCell];
            const list = new CellList(inputCells);
            list.next();
            const result = list.getLiveCells();
            expect(result.length).toEqual(0);
        });

        test('a cell with two or three neighbors lives on to the next cycle', () => {
            const testCell = new Cell(0, 1);
            const singleCell = new Cell(0, 0);
            const secondCell = new Cell(0, 2);
            const inputCells: Array<Cell> = [singleCell, testCell, secondCell];
            const list = new CellList(inputCells);
            list.next();
            const result = list.getLiveCells();
            expect(result.length).toEqual(3);
        });

        test('a dead cell with three neighbors becomes live on next cycle', () => {
            const singleCell = new Cell(0, 0);
            const secondCell = new Cell(1, 0);
            const thirdCell = new Cell(1, 1)
            const inputCells: Array<Cell> = [singleCell, secondCell, thirdCell];
            const list = new CellList(inputCells)
            list.next();
            const result = list.getCellStatus({x: 0, y: 1});
            expect(result).toBeTruthy();
        });

        test('a live cell with four or more neighbors dies on next cycle', () => {
            const list = new CellList(cellArray);
            list.next();
            const result = list.getCellStatus({x: 1, y: 1});
            expect(result).toBeFalsy();
        });

    });

    describe('createSweepMap method', () => {

        it('should be length nine when there is one cell', () => {
            const inputCell = new Cell(1, 1);
            const list = new CellList([inputCell]);
            const result = list.createSweepArray();
            expect(result.length).toEqual(9);
        });

        it('should be length twelve when there are only two cells and they are adjacent', () => {
            const inputCell = new Cell(1, 1);
            const secondInputCell = new Cell(1, 2);
            const list = new CellList([inputCell, secondInputCell]);
            const result = list.createSweepArray();
            expect(result.length).toEqual(12);
        });

    });

    describe('getNeighbors method', () => {

        test('getNeighbors should return eight neighbors when surrounded by valid grid points', () => {
            const inputCell = new Cell(1, 1);
            const list = new CellList([inputCell]);
            const result = list.getNeighbors(inputCell);
            expect(result.length).toEqual(8);
        });

    });

    describe('getAmountLiveNeighbors method', () => {

        it('should return 1 live neighbor', () => {
            const singleCell = new Cell(0, 0);
            const secondCell = new Cell(0, 1);
            const inputCells: Array<Cell> = [singleCell, secondCell];
            const list = new CellList(inputCells);
            const result = list.getAmountLiveNeighbors({x: singleCell.getX(), y: singleCell.getY()});
            expect(result).toEqual(1);
        });

        it('should return 3 live neighbors', () => {
            const singleCell = new Cell(0, 0);
            const secondCell = new Cell(0, 1);
            const thirdCell = new Cell(0, -1);
            const fourthCell = new Cell(1, 0);
            const inputCells: Array<Cell> = [singleCell, secondCell, thirdCell, fourthCell];
            const list = new CellList(inputCells);
            const result = list.getAmountLiveNeighbors({x: singleCell.getX(), y: singleCell.getY()});
            expect(result).toEqual((3));
        });

        it('should return 4 live neighbors', () => {
            const singleCell = new Cell(1, 1);
            const secondCell = new Cell(0, 1);
            const thirdCell = new Cell(0, 2);
            const fourthCell = new Cell(1, 0);
            const fifthCell = new Cell(1, 2);
            const inputCells: Array<Cell> = [singleCell, secondCell, thirdCell, fourthCell, fifthCell];
            const list = new CellList(inputCells);
            const result = list.getAmountLiveNeighbors({x: singleCell.getX(), y: singleCell.getY()});
            expect(result).toEqual(4);
        });

    });

});
