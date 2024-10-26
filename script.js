const gameBoard = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Combinazioni vincenti
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Crea la griglia di gioco
function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-index", index);
        cellElement.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

// Gestione click sulla cella
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute("data-index");

    if (board[cellIndex] !== "" || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Vince ${currentPlayer}!`;
        isGameActive = false;
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Turno di: ${currentPlayer}`;
    } else {
        statusDisplay.textContent = "Pareggio!";
        isGameActive = false;
    }
}

// Controllo della vittoria
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset del gioco
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.textContent = `Turno di: ${currentPlayer}`;
    createBoard();
}

// Eventi per il pulsante reset
resetButton.addEventListener("click", resetGame);

// Inizializzazione della griglia
createBoard();