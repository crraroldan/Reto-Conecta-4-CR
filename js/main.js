//Selectors
var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

//add click events to each cell of the game
for (let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`);
    })
}


//Players name assignation prompts
while (!player1) {
    var player1 = prompt('Jugador 1: Escribe tu nombre, serás el color rojo');
}

player1Color = 'red';

while (!player2) {
    var player2 = prompt('Jugador 2: Escribe tu nombre, serás el color amarillo');
}

player2Color = 'yellow';

//Initial turn variables
var currentPlayer = 1;
playerTurn.textContent = `Es el turno de: ${player1}!`;


//Player select column logic with their respective colors
Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (let i = 5; i > -1; i--) {
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `Ganó ${player1}!!`;
                    playerTurn.style.color = player1Color;
                    return (alert(`Ganó ${player1}!!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = `Es un empate!!`;
                    return (alert(`Es un empate!!`));
                } else {
                    playerTurn.textContent = `Es el turno de: ${player2}!`;
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = player2Color;
                if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    playerTurn.textContent = `Ganó ${player2}!!`;
                    playerTurn.style.color = player2Color;
                    return (alert(`Ganó ${player2}!!`));
                } else if (drawCheck()) {
                    playerTurn.textContent = `Es un empate!!`;
                    return (alert(`Es un empate!!`));
                } else {
                    playerTurn.textContent = `Es el turno de: ${player1}!`;
                    return currentPlayer = 1;
                }
            }
        }
    }
}


//Win validation methods
function colorMatchCheck(one, two, three, four) {
    return (one == two && one === three && one === four && one !== 'white')
}

function horizontalCheck() {
    for (let r = 0; r < tableRow.length; r++) {
        for (let c = 0; c < 4; c++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r].children[c + 1].style.backgroundColor,
                tableRow[r].children[c + 2].style.backgroundColor, tableRow[r].children[c + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};

function verticalCheck() {
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            if (colorMatchCheck(tableRow[r].children[c].style.backgroundColor, tableRow[r + 1].children[c].style.backgroundColor,
                tableRow[r + 2].children[c].style.backgroundColor, tableRow[r + 3].children[c].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck1() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck2() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function drawCheck() {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++) {
        if (tableCell[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCell[i]);
        }
        if (fullSlot.length === tableCell.length) {
            return true;
        }
    }
}

reset.addEventListener('click', () => {
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = 'white';

    });
    playerTurn.style.Color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `Es el turno de: ${player1}!` : playerTurn.textContent = `Es el turno de: ${player2}!`)
})