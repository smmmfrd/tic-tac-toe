const squares = [...document.querySelectorAll(".square")];

document.querySelector('#ng-button').addEventListener('click', () => {newGame();});

const playerX = document.querySelector("#x-score");
var xScore = 0;
const playerO = document.querySelector("#o-score");
var oScore = 0;
var currentValue = '';
var movesMade = 0;

const GameSquare = (element) => {
    let value;

    const checkValue = (against) => {
        return value === against;
    }

    const logElement = () => console.log(element);

    const changeValue = (input) => {
        if(element.textContent != '' || input === ''){
            return;
        }
        value = input.toUpperCase();
        element.textContent = input.toUpperCase();
        nextTurn();
    }

    const reset = () => {
        element.textContent = '';
        value = '';
    }

    return {logElement, changeValue, reset, checkValue};
}

var game = squares.map((element) => {
    var newSquare = GameSquare(element);
    
    element.addEventListener('click', function() {
        newSquare.changeValue(currentValue);
    });
    return newSquare;
});

function checkWin(value){

    // Diagonals
    if(game[0].checkValue(value) && game[4].checkValue(value) && game[8].checkValue(value)){
        return true;
    }

    if(game[2].checkValue(value) && game[4].checkValue(value) && game[6].checkValue(value)){
        return true;
    }

    // Verticals
    for(let i = 0; i < 3; i++){
        if(game[i].checkValue(value) && game[i+3].checkValue(value) && game[i+6].checkValue(value)){
            return true;
        }
    }

    // Horizontals
    for(let i = 0; i < 3; i++){
        let index = i * 3;
        if(game[index].checkValue(value) && game[index+1].checkValue(value) && game[index+2].checkValue(value)){
            return true;
        }
    }

    return false;
}

function nextTurn(){
    if(checkWin(currentValue)){
        if(currentValue === 'X'){
            xScore++;
        } else {
            oScore++;
        }
        updateScoreboard();
        displayWin(currentValue);
    } else {
        movesMade++;
        if(movesMade < 9){
            toggleTurn();
        } else {
            displayWin('');
        }
    }
}

function toggleTurn(){
    if(currentValue === 'X'){
        playerX.classList.remove('selected');
        playerO.classList.add('selected');
        currentValue = 'O';
    } else {
        playerX.classList.add('selected');
        playerO.classList.remove('selected');
        currentValue = 'X';
    }
}

function updateScoreboard(){
    playerX.textContent = `Player X Score: ${xScore}`;
    playerO.textContent = `Player O Score: ${oScore}`;
}

function newGame(){
    playerX.textContent = 'Player X Score: 0';
    playerO.textContent = 'Player O Score: 0';
    resetBoard();
}

function resetBoard(){
    game.forEach((square) =>{
        square.reset();
    });
    movesMade = 0;
    currentValue = 'O';
    toggleTurn();
}

function displayWin(winnerValue){
    currentValue = '';

    let message = 'It was a Tie!';
    if(winnerValue === 'X') {
        message = 'Player X Wins!';
    } else {
        message = 'Player O Wins!';
    }

    let holder = document.querySelector('#winner-message');

    let messageDisplay = document.createElement('div');
    messageDisplay.textContent = message;
    holder.appendChild(messageDisplay);
    
    let newGameButton = document.createElement('button');
    newGameButton.textContent = 'New Board';
    newGameButton.addEventListener('click', () => {
        currentValue = 'X';
        while(holder.firstChild){
            holder.removeChild(holder.firstChild);
        }

        resetBoard();
    });
    holder.appendChild(newGameButton);
}

toggleTurn();