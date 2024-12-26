const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand("up", "move cursor up", this.cursor.up);
    Screen.addCommand("down", "move cursor down", this.cursor.down);
    Screen.addCommand("left", "move corsor left", this.cursor.left);
    Screen.addCommand("right", "move cursor right", this.cursor.right);
    Screen.addCommand("return", "place mark", this.placeMark.bind(this))

    Screen.render();
  }

  placeMark() {
    let player = this.playerTurn;
    
    let row = this.cursor.row;
    
    let col = this.cursor.col;
    
    let position = this.grid[row][col];

    if (position === " "){
      this.grid[row][col] = player;
      Screen.setGrid(row, col, player);

      Screen.render();

      if(TTT.checkWin(this.grid)) {
        TTT.endGame(player)
      }

      if (player === "O") {
        player = "X";
      }
      else{
        player = "O"
      }

      Screen.render();

    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let winner = false;

    let tieCheck = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (grid[i][j] === ' ') {
            tieCheck.push(grid[i][j]);
          }
      }

      // Horizontal
      if (grid[0][0] !== ' ' && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
        winner = grid[0][0]
      };
      if (grid[1][0] !== ' ' && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {
        winner = grid[1][0];
      }
      if (grid[2][0] !== ' ' && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {
        winner = grid[2][0];
      }
      // Vertical
      if (grid[0][0] !== ' ' && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {
        winner = grid[0][0];
      }
      if (grid[0][1] !== ' ' && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {
        winner = grid[0][1];
      }
      if (grid[0][2] !== ' ' && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) 
        {winner = grid[0][2];

        }
      // Diagonal
      if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        winner = grid[0][0];
      }
      if (grid[2][0] !== ' ' && grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) {
        winner = grid[2][0];
      }
      // Tie
      if (tieCheck.length === 0) {
        winner = 'T';
      }
      
  }

  return winner;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
