document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const solveBtn = document.getElementById("solveBtn");
    const resetBtn = document.getElementById("resetBtn");
    const checkBtn = document.getElementById("checkBtn");
    const message = document.getElementById("message");
    const solver = new SudokuSolver();

    // Fixed template with empty strings for blank cells
    const initialPuzzle = [
        ["5", "3", "", "", "7", "", "", "", ""],
        ["6", "", "", "1", "9", "5", "", "", ""],
        ["", "9", "8", "", "", "", "", "6", ""],
        ["8", "", "", "", "6", "", "", "", "3"],
        ["4", "", "", "8", "", "3", "", "", "1"],
        ["7", "", "", "", "2", "", "", "", "6"],
        ["", "6", "", "", "", "", "2", "8", ""],
        ["", "", "", "4", "1", "9", "", "", "5"],
        ["", "", "", "", "8", "", "", "7", "9"],
    ];

    // Create the grid
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";
        input.addEventListener("input", (e) => {
            if (!/^[1-9]$/.test(e.target.value) && e.target.value !== "") {
                e.target.value = ""; // Only allow digits 1-9
            }
        });
        board.appendChild(input);
    }

    const getBoardData = () => {
        const inputs = Array.from(board.querySelectorAll("input"));
        const boardData = [];

        // Create a 9x9 grid
        for (let i = 0; i < 9; i++) {
            boardData.push(inputs.slice(i * 9, i * 9 + 9).map((input) => input.value || ""));
        }
        return boardData;
    };

    const setBoardData = (boardData) => {
        const inputs = Array.from(board.querySelectorAll("input"));
        inputs.forEach((input, index) => {
            input.value = boardData[Math.floor(index / 9)][index % 9];
        });
    };

    // Initialize board with the fixed template
    setBoardData(initialPuzzle);

    // Solve the Sudoku puzzle
    solveBtn.addEventListener("click", () => {
        const boardData = getBoardData();

        if (solver.solve(boardData)) {
            setBoardData(boardData);
            message.textContent = "Solved!";
            message.style.color = "green";
        } else {
            message.textContent = "Unsolvable puzzle.";
            message.style.color = "red";
        }
    });

    // Reset the board to the initial template
    resetBtn.addEventListener("click", () => {
        setBoardData(initialPuzzle);
        message.textContent = "";
    });

    // Check if the Sudoku is solved
    checkBtn.addEventListener("click", () => {
        const boardData = getBoardData();

        if (solver.isValidSudoku(boardData)) {
            const isFullySolved = boardData.every((row) => row.every((cell) => cell !== ""));
            if (isFullySolved) {
                message.textContent = "Solved!";
                message.style.color = "green";
            } else {
                message.textContent = "The Sudoku is valid but incomplete.";
                message.style.color = "orange";
            }
        } else {
            message.textContent = "The Sudoku is invalid.";
            message.style.color = "red";
        }
    });
});
