class SudokuSolver {
    solve(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === "") {
                    for (let k = 1; k <= 9; k++) {
                        if (this.canPlace(String(k), i, j, board)) {
                            board[i][j] = String(k);
                            if (this.solve(board)) {
                                return true;
                            } else {
                                board[i][j] = "";
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    canPlace(num, row, col, board) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num || 
                board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
                return false;
            }
        }
        return true;
    }

    isValidSudoku(board) {
        for (let i = 0; i < 9; i++) {
            const rows = new Set();
            const cols = new Set();
            const box = new Set();

            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== "" && rows.has(board[i][j])) return false;
                if (board[j][i] !== "" && cols.has(board[j][i])) return false;

                const boxRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
                const boxCol = 3 * Math.floor(i % 3) + (j % 3);
                if (board[boxRow][boxCol] !== "" && box.has(board[boxRow][boxCol])) return false;

                rows.add(board[i][j]);
                cols.add(board[j][i]);
                box.add(board[boxRow][boxCol]);
            }
        }
        return true;
    }
}
