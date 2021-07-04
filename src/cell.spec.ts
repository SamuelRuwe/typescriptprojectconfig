import { Cell } from './cell';

describe('Cell class', () => {

    test('cell can be created', () => {
        const cell = new Cell(1, 1);
        expect(cell).toBeTruthy();
    });

});
