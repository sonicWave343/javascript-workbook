'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let moveCount = 0; // this will be used to prevent a win event on an empty board.

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const pos1 = board[0][0];
const pos2 = board[0][1];
const pos3 = board[0][2];
const pos4 = board[1][0];
const pos5 = board[1][1];
const pos6 = board[1][2];
const pos7 = board[2][0];
const pos8 = board[2][1];
const pos9 = board[2][2];

function horizontalWin() {
  if ((pos1 === pos2 && pos2 === pos3) ||
  (pos4 === pos5 && pos5 === pos6) ||
  (pos7 === pos8 && pos8 === pos9)){
    return true;
  }
}

function verticalWin() {
  if ((pos1 === pos4 && pos4 === pos7) ||
  (pos2 === pos5 && pos5 === pos8) ||
  (pos3 === pos6 && pos6 === pos9)){
    return true;
  }
}

function diagonalWin() {
  if ((pos1 === pos5 && pos5 === pos9) ||
  (pos3 === pos5 && pos5 === pos9)){
    return true;
  }
}

function checkForWin() {
  if (horizontalWin() || verticalWin() || diagonalWin()){
    console.log('Player '+playerTurn+' wins!');
    return true;
  }
}

function ticTacToe(row, column) {
  board[row][column] = playerTurn;
  if (moveCount > 0){
    checkForWin();
  }
  moveCount ++;
  playerTurn = (playerTurn === "X" ? "O" : "X");
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
