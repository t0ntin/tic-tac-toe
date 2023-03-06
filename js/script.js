const ticTacToe = (function () {
  const gameboard = {
    gameboard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],

    p1Name: "",
    p2Name: "",
    player1: "",
    player2: "",
    player1Turn: true,
    init: function () {
      this.cacheDom();
      this.render();
    },

    cacheDom: function () {
      this.gameboardDiv = document.querySelector(".gameboard-div");
      this.display = document.querySelector(".display");
      this.resetBtn = document.querySelector(".reset-btn");
      this.p1El = document.querySelector(".player1-el");
      this.p2El = document.querySelector(".player2-el");
      this.startBtn = document.querySelector(".start-btn");
    },

    render: function () {
      this.start();
      this.Player();
      this.createPlayers();
      this.createGrid();
      this.changeP2Color();
      this.handleLetterChoice();
      this.resetGame();
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

    start: function () {
      this.startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.p1Name = gameboard.p1El.value;
        this.p2Name = gameboard.p2El.value;
        console.log(this.p2El);
        console.log(this.p1Name);
        this.createPlayers();
        this.display.innerText = `${this.p1Name}, place an 'x' on the board.`;
      });
    },

    Player: function (name, letter) {
      return { name, letter };
    },

    createPlayers: function () {
      this.player1 = this.Player(this.p1Name, "x");
      this.player2 = this.Player(this.p2Name, "o");
    },

    handleLetterChoice: function () {
      boxes = document.querySelectorAll(".box");
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
          }),{once: true}


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
          // console.log(`[col][row] ${this.gameboard[col][row]}`);
          // console.log(`column: ${column}`);
        }
        // const element = this.gameboard[row];

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
         console.log(this.gameboard[i][i]);
        leftToRight.push(this.gameboard[i][i]);
        console.log(leftToRight);
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
      // console.log(boxes);
      boxes.forEach((box) => {
        box.removeEventListener("click", box.fn);
        console.log("buttons disabled");
      });
    },

    updateDisplay: function () {
      if (!this.p1Name) {
        return;
      }
      if (gameboard.player1Turn === true) {
        this.display.innerText = `${this.player1.name}, it's your turn.`;
      }
      if (gameboard.player1Turn === false) {
        this.display.innerText = `${this.player2.name}, it's your turn.`;
      }
      if (
        (this.checkForRowMatch() ||
          this.checkForColMatch() ||
          this.checkForDiagonalMatch()) &&
        gameboard.player1Turn === false
      ) {
        this.display.innerText = `${this.player1.name}, you have won the game! Press the reset button to play again.`;
      }
      if (
        (this.checkForRowMatch() ||
          this.checkForColMatch() ||
          this.checkForDiagonalMatch()) &&
        gameboard.player1Turn === true
      ) {
        this.display.innerText = `${this.player2.name}, you have won the game! Press the reset button to play again.`;
      }
    },

    clearGameboardArray: function () {
      for (let i = 0; i < this.gameboard.length; i++) {
        this.gameboard[i] = new Array(this.gameboard[i].length).fill("");
      }
    },

    changeP2Color: function () {
      boxes = document.querySelectorAll(".box");
      boxes.forEach((box) => {
        box.addEventListener("click", function () {
          if (gameboard.player1Turn === false && box.innerText !== 'x') {
            box.style.color = "#df0202";
          }
          
        });
      });
    },

    resetGame: function () {
      boxes = document.querySelectorAll(".box");
      this.resetBtn.addEventListener("click", function () {
        boxes.forEach((box) => {
          box.innerText = "";
          box.style.color = "black";
        });
        gameboard.player1Turn = true;
        gameboard.disableButtons();
        gameboard.handleLetterChoice();
        gameboard.clearGameboardArray();
      });
    },
  };

  gameboard.init();
})();
