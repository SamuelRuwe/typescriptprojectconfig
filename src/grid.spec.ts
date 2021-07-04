import { Grid } from './grid';

let grid: Grid;

beforeEach(() => {
    grid = new Grid();
});

test('grid has cells', () => {
    expect(grid.cells).toBeTruthy();
});
