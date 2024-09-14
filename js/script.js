const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const winnerDisplay = document.getElementById('winnerMessage');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // declare a variable of current player
let gameActive = true; // declare a varieable
let boardState = ['', '', '', '', '', '', '', '', '']; // collection 

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];

function handleCellClick(e){
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    if(boardState[cellIndex] !== '' || !gameActive){
        return;
    }
    updateCell(cell, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    cell.classList.add('disabled');
}
function checkWinner(){
    let roudWon = false;
    let winnigCells = [];
    for(let i = 0; i < winningCombinations.length; i++){
        const winCondition = winningCombinations[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c){
            roudWon = true;
            winnigCells = winCondition;
            break;
        }
    }
    if(roudWon){
        winnerDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        highlightCells(winnigCells); // highlight winning cells
        gameActive = false;
        return;
    }
    if(!boardState.includes('')){
        winnerDisplay.textContent = 'Empate!';
        highlightTieCells(); // highlight all cells
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusDisplay();
}

function highlightCells(winnigCells){
    winnigCells.forEach(index => {
        cells[index].classList.add('winner-cell');
    });
}

function highlightTieCells(){
    cells.forEach(cell => {
        cell.classList.add('tie-cell');
    });
}

function updateStatusDisplay(){
    statusDisplay.textContent = `Jogador ${currentPlayer} é a sua vez`;
    statusDisplay.classList.remove('x', 'o');
    statusDisplay.classList.add(currentPlayer === 'X' ? 'x' : 'o');
}

function resetGame(){
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    winnerDisplay.textContent = `Jogador ${currentPlayer} é a sua vez`;
    winnerDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'disabled', 'winner-cell', 'tie-cell');
    });
    updateStatusDisplay();
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetButton.addEventListener('click', resetGame);

updateStatusDisplay();