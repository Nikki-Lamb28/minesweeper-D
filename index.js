document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 10;
    const mineCount = 20;
    const board = document.getElementById('board');
    const cells = [];
    let mines = [];

    function initBoard() {
        for (let i = 0; i < boardSize; i++) {
            cells[i] = [];
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => revealCell(i, j));
                board.appendChild(cell);
                cells[i][j] = cell;
            }
        }
        placeMines();
    }

    function placeMines() {
        mines = Array(boardSize).fill().map(() => Array(boardSize).fill(false));
        let placedMines = 0;
        while (placedMines < mineCount) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (!mines[row][col]) {
                mines[row][col] = true;
                placedMines++;
            }
        }
    }

    function revealCell(row, col) {
        const cell = cells[row][col];
        if (mines[row][col]) {
            cell.classList.add('mine');
            alert('Game Over!');
            revealAllMines();
        } else {
            cell.classList.add('revealed');
            const mineCount = countAdjacentMines(row, col);
            if (mineCount > 0) {
                cell.textContent = mineCount;
            } else {
                revealAdjacentCells(row, col);
            }
        }
    }

    function countAdjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                    if (mines[newRow][newCol]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    function revealAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                    const cell = cells[newRow][newCol];
                    if (!cell.classList.contains('revealed') && !cell.classList.contains('mine')) {
                        revealCell(newRow, newCol);
                    }
                }
            }
        }
    }

    function revealAllMines() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (mines[i][j]) {
                    cells[i][j].classList.add('mine');
                }
            }
        }
