(function () {
  const gameboard = {
    gameboard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    player1Turn: true,
    xIsWinner: undefined,
    init: function () {
      this.cacheDom();
      this.render();
      // this.bindEvents();
    },

    cacheDom: function () {
      this.gameboardDiv = document.querySelector(".gameboard-div");
      this.display = document.querySelector(".display");
      this.resetBtn = document.querySelector(".reset-btn");
    },

    bindEvents: function () {},

    render: function () {
      this.createGrid();
      this.handleLetterChoice();
      this.resetGame();
      // this.bindEvents();
    },

    createGrid: function () {
      for (let i = 0; i < this.gameboard[0].length; i++) {
        for (let j = 0; j < this.gameboard[i].length; j++) {
          const gridBox = document.createElement("div");
          this.gameboardDiv.append(gridBox);
          gridBox.setAttribute("class", "box");
          gridBox.setAttribute("id", i + "" + j);
        }
      }
    },

    handleLetterChoice: function () {
      boxes = document.querySelectorAll(".box");
      // console.log(gameboard.boxes);
      boxes.forEach((box) => {
        box.addEventListener(
          "click",
          (box.fn = function fn() {
            if (box.innerText === "" && gameboard.player1Turn === true) {
              box.innerText = "x";
              let row = Number(box.getAttribute("id")[0]);
              let col = Number(box.getAttribute("id")[1]);
              gameboard.gameboard[row][col] = box.innerText;
              gameboard.player1Turn = false;
              console.log(gameboard.gameboard);
              gameboard.checkForColMatch();
              gameboard.checkForRowMatch();
              gameboard.checkForDiagonalMatch();
              gameboard.updateDisplay();
              gameboard.checkForTie();
            } else if (
              box.innerText === "" &&
              gameboard.player1Turn === false
            ) {
              box.innerText = "o";
              let row = Number(box.getAttribute("id")[0]);
              let col = Number(box.getAttribute("id")[1]);
              gameboard.gameboard[row][col] = box.innerText;
              gameboard.player1Turn = true;
              gameboard.checkForColMatch();
              gameboard.checkForRowMatch();
              gameboard.checkForDiagonalMatch();
              gameboard.updateDisplay();
              gameboard.checkForTie();
            }
          }),
          false
        );
      });
    },

    checkForRowMatch: function () {
      let x = ["x", "x", "x"];
      let o = ["o", "o", "o"];
      for (let i = 0; i < this.gameboard.length; i++) {
        const element = this.gameboard[i];

        if (
          JSON.stringify(element) === JSON.stringify(x) ||
          JSON.stringify(element) === JSON.stringify(o)
        ) {
          this.disableButtons();
          return true;
        }
      }
    },


    checkForColMatch: function () {
      let x = ["x", "x", "x"];
      let o = ["o", "o", "o"];

      for (let row = 0; row < this.gameboard.length; row++) {
        let column = [];
        for (let col = 0; col < this.gameboard.length; col++) {
          column.push(this.gameboard[col][row]);
          console.log(`[col][row] ${this.gameboard[col][row]}`);
          console.log(`column: ${column}`);
        }
        const element = this.gameboard[row];

        if (
          JSON.stringify(column) === JSON.stringify(x) ||
          JSON.stringify(column) === JSON.stringify(o)
        ) {
          this.disableButtons();
          return true;
        }
      }
    },

    checkForDiagonalMatch: function () {
      const XMatch = (item) => item === "x";
      const OMatch = (item) => item === "o";

      let leftToRight = [];
      let rightToLeft = [];
      for (let i = 0; i < this.gameboard.length; i++) {
        //  console.log(this.gameboard[i][i]);
        leftToRight.push(this.gameboard[i][i]);
        // console.log(leftToRight);
        rightToLeft.push(this.gameboard[i][this.gameboard.length - i - 1]);
      }
      if (leftToRight.every(XMatch) || leftToRight.every(OMatch)) {
        console.log("Left to right diagonal match");
        this.disableButtons();
        return true;
      }
      if (rightToLeft.every(XMatch) || rightToLeft.every(OMatch)) {
        console.log("Right to left diagonal match");
        this.disableButtons();
        return true;
      }
    },

    isBoardFull: function () {
      for (let i = 0; i < this.gameboard.length; i++) {
        for (let j = 0; j < this.gameboard[i].length; j++) {
          if (this.gameboard[i][j] === "") {
            return false;
          }
        }
      }
      return true;
    },

    checkForTie: function () {
      if (this.isBoardFull()) {
        this.display.innerText = "It's a tie!";
      }
    },

    disableButtons: function () {
      boxes = document.querySelectorAll(".box");
      console.log(boxes);
      boxes.forEach((box) => {
        box.removeEventListener("click", box.fn, false);
        console.log("buttons disabled");
      });
    },

    updateDisplay: function () {
      if (gameboard.player1Turn === true) {
        this.display.innerText = `${player1.name}, it's your turn.`;
      }
      if (gameboard.player1Turn === false) {
        this.display.innerText = `${player2.name}, it's your turn.`;
      }
      if (this.checkForRowMatch() && gameboard.player1Turn === false) {
        this.display.innerText = `${player1.name}, You have won the game!`;
      }
      if (this.checkForRowMatch() && gameboard.player1Turn === true) {
        this.display.innerText = `${player2.name}, You have won the game!`;
      }
      if (this.checkForColMatch() && gameboard.player1Turn === false) {
        this.display.innerText = `${player1.name}, You have won the game!`
      }
      if (this.checkForColMatch() && gameboard.player1Turn === true) {
        this.display.innerText = `${player2.name}, You have won the game!`;
      }
      if (this.checkForDiagonalMatch() && gameboard.player1Turn === false) {
        this.display.innerText = `${player1.name}, You have won the game!`
      }
      if (this.checkForDiagonalMatch() && gameboard.player1Turn === true) {
        this.display.innerText = `${player2.name}, You have won the game!`;
      }
    },

    clearGameboardArray: function () {
      for (let i = 0; i < this.gameboard.length; i++) {
        this.gameboard[i] = new Array(this.gameboard[i].length).fill("");
      }
      console.log(this.gameboard);
    },

    announceWinner: function () {},

    resetGame: function () {
      boxes = document.querySelectorAll(".box");
      this.resetBtn.addEventListener("click", function () {
        boxes.forEach((box) => {
          box.innerText = "";
        });
        gameboard.player1Turn = true;
        gameboard.disableButtons();
        gameboard.handleLetterChoice();
        gameboard.clearGameboardArray();
      });
    },
  };

  // return {createGrid, updateDisplay, handleLetterChoice,}
  gameboard.init();
})();

const Player = (name, letter) => {
  return { name, letter };
};

const player1 = Player("Player 1", "x");
const player2 = Player("Player 2", "o");
