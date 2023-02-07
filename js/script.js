// store the gameboard as an array inside a gameboard object
// players are stored in objects
// an object will control the flow of the game

const TicTacToe = (() => {

  const gameboard = {gameboard: ["X","0","X","0","X","0","X","0","X"],
  player1Turn: true,
  map: {0: ``}
  }
  
  function createGrid() {
    const gameboardDiv = document.querySelector(".gameboard-div");
    for (let i = 0; i < gameboard.gameboard.length; i++) {
      const gridBox = document.createElement('div');
      gameboardDiv.append(gridBox);
      gridBox.setAttribute("class", "box");
      gridBox.setAttribute("id", i);
    }
  } 
  

  function handleLetterChoice() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('click', () => {
    
        if (box.innerText === '' && gameboard.player1Turn === true) {
          box.innerText = 'x';
          gameboard.player1Turn = false;
          box.getAttribute('id');
          updateDisplay()
          // console.log(object);
        } else  if (box.innerText === '' && gameboard.player1Turn === false){
          box.innerText = 'o';
          gameboard.player1Turn = true;
          updateDisplay();
        }
      })
    }) 
    
  }

  function updateDisplay() {
    const display = document.querySelector(".display");
    if (gameboard.player1Turn === true) {
      display.innerText = `${player1.name}, it's your turn.`
    } else {
      display.innerText = `${player2.name}, it's your turn.`
    }
    
  }



  return {createGrid, updateDisplay, handleLetterChoice,
    
  }
})();


const Player = (name, letter) => {

  return {name, letter};
}


const player1 = Player('Player 1', 'x');
const player2 = Player('Player 2', 'o');

TicTacToe.createGrid();
TicTacToe.updateDisplay();
TicTacToe.handleLetterChoice();
