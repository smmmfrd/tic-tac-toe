const squares = [...document.querySelectorAll(".square")];

const resetButton = document.querySelector('#reset-button');

const playerX = document.querySelector("#x-score");
const playerO = document.querySelector("#o-score");
var currentValue = '';

const GameSquare = (element) => {
    const logElement = () => console.log(element);

    const changeValue = (input) => {
        element.textContent = input.toUpperCase();
        ToggleTurn();
    }

    const reset = () => element.textContent = '';

    return {logElement, changeValue, reset};
}

var game = squares.map((element) => {
    var newSquare = GameSquare(element);
    element.addEventListener('click', function() {
        newSquare.changeValue(currentValue);
    });
    return newSquare;
});

function ToggleTurn(){
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

function resetBoard(){
    game.forEach((square) =>{
        square.reset();
    });
}
resetButton.addEventListener('click', () => resetBoard());

ToggleTurn();