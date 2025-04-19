let gameState = {
  turn: 'X',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  sizes: [1, 2, 3, 4, 5, 6, 7],
  usedSizesX: [],
  usedSizesO: [],
  scores: { X: 0, O: 0 }
};

let gameOver = false;
let xUsedSizes = [];
let oUsedSizes = [];

window.setup = function setup() {
  createCanvas(700, 700);
}

window.draw = function draw() {
  background(50);
  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Tic Tac Toe', 10, 20);

  // grid
  stroke(0);
  strokeWeight(2);
  let gridSize = 133;
  let gridOffsetX = (450 - gridSize * 3) / 2;
  let gridOffsetY = (700 - gridSize * 3) / 2;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = gridOffsetX + j * gridSize;
      let y = gridOffsetY + i * gridSize;
      fill(150);
      rect(x, y, gridSize, gridSize);

      // X & O gamestate
      textSize(100)
      textAlign(CENTER, CENTER)
      if (gameState.board[i][j] !== '') {
        let size = gameState.board[i][j].size;
        let symbol = gameState.board[i][j].symbol;
        fill(symbol === 'X' ? 255 : 0, symbol === 'X' ? 0 : 255, 0);
        textSize(size * 20);
        textAlign(CENTER, CENTER);
        text(symbol, x + gridSize / 2, y + gridSize / 2);
      }
    }
  }

  // UI
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(255);
  text(`X: ${gameState.scores.X}`, 20, 50);
  text(`O: ${gameState.scores.O}`, 20, 75);
  let usedSizesX = gameState.board.flat().filter(cell => cell !== '' && cell.symbol === 'X').map(cell => cell.size);
  let usedSizesO = gameState.board.flat().filter(cell => cell !== '' && cell.symbol === 'O').map(cell => cell.size);
  usedSizesX.forEach(size => {
    if (!xUsedSizes.includes(size)) {
      xUsedSizes.push(size);
    }
  });
  usedSizesO.forEach(size => {
    if (!oUsedSizes.includes(size)) {
      oUsedSizes.push(size);
    }
  });

  text(`X used sizes: ${xUsedSizes.join(', ')}`, 20, 100);
  text(`O used sizes: ${oUsedSizes.join(', ')}`, 20, 125);

  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text('Press space to play again', width / 2, height / 2);
  }
}

window.mouseClicked = function mouseClicked() {
  let gridSize = 133;
  let gridOffsetX = (450 - gridSize * 3) / 2;
  let gridOffsetY = (700 - gridSize * 3) / 2;
  let x = mouseX - gridOffsetX;
  let y = mouseY - gridOffsetY;
  let cellX = Math.floor(x / gridSize);
  let cellY = Math.floor(y / gridSize);

  // occupation check
  if (gameState.board[cellY][cellX] !== '') {
    if (gameState.board[cellY][cellX] !== '') {
      // size check
      let existingSize = gameState.board[cellY][cellX].size;
      let availableSizes = gameState.sizes.filter(size => size > existingSize && !(gameState.turn === 'X' ? gameState.usedSizesO : gameState.usedSizesX).includes(size) && !(gameState.turn === 'X' ? gameState.usedSizesX : gameState.usedSizesO).includes(size));
      // size choosing
      if (availableSizes.length > 0) {
        let newSize = prompt(`Choose a size greater than ${existingSize} (available: ${availableSizes.join(', ')}):`);
        //  size validation & gamestate update
        if (availableSizes.includes(parseInt(newSize)) && !(gameState.turn === 'X' ? gameState.usedSizesX : gameState.usedSizesO).includes(newSize)) {
          if (gameState.turn === 'X') {
            gameState.usedSizesX.push(newSize);
          } else {
            gameState.usedSizesO.push(newSize);
          }
          gameState.board[cellY][cellX] = { symbol: gameState.turn, size: newSize };
          gameState.turn = gameState.turn === 'X' ? 'O' : 'X'

          // win/lose/draw messages & alerts
          if (checkForWin()) {
            alert(`Player ${gameState.turn === 'X' ? 'O' : 'X'} wins!`);
            resetGame();
          }

          if (checkForDraw()) {
            alert('It\'s a draw!');
            resetGame();
          }
        } else {
          alert("Invalid size or size already used!");
        }
      } else {
        alert("No available sizes to override!");
      }
    } else {
      alert("No available sizes to override!");
    }
  } else {
    // size
    let size = prompt("Choose a size (1-7):");
    if (size > 0 && size <= 7) {
      if (gameState.turn === 'X' && !gameState.usedSizesX.includes(size)) {
        gameState.usedSizesX.push(size);
        console.log('checkX');
      } else if (gameState.turn === 'O' && !gameState.usedSizesO.includes(size)) {
        gameState.usedSizesO.push(size);
        console.log('checkO')
      } else {
        return alert('Size is already used');
      };
      // gamestate update
      gameState.board[cellY][cellX] = { symbol: gameState.turn, size: size };
      gameState.turn = gameState.turn === 'X' ? 'O' : 'X';

      // check for win
      if (checkForWin()) {
        gameState.scores[gameState.turn === 'X' ? 'O' : 'X']++;
        alert(`Player ${gameState.turn === 'X' ? 'O' : 'X'} wins!`);
        gameOver = true;
        return true;
      }

      // check for draw
      if (checkForDraw()) {
        alert('It\'s a draw!');
        gameOver = true;
        return true;
      }
    } else {
      alert("Invalid size!");
    }
  }
  if (gameOver) return;
}

// keypressed
window.keyPressed = function keyPressed() {
  if (key === ' ') {
    if (gameOver) {
      resetGame();
      gameOver = false;
    }
  }
}

// check for win
function checkForWin() {
  for (let i = 0; i < 3; i++) {
    if (gameState.board[i][0] !== '' && gameState.board[i][0].symbol === gameState.board[i][1].symbol && gameState.board[i][1].symbol === gameState.board[i][2].symbol) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (gameState.board[0][i] !== '' && gameState.board[0][i].symbol === gameState.board[1][i].symbol && gameState.board[1][i].symbol === gameState.board[2][i].symbol) {
      return true;
    }
  }

  if (gameState.board[0][0] !== '' && gameState.board[0][0].symbol === gameState.board[1][1].symbol && gameState.board[1][1].symbol === gameState.board[2][2].symbol) {
    return true;
  }
  if (gameState.board[0][2] !== '' && gameState.board[0][2].symbol === gameState.board[1][1].symbol && gameState.board[1][1].symbol === gameState.board[2][0].symbol) {
    return true;
  }

  return false;
}

// check for draw
function checkForDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

// reset game
function resetGame() {
  gameState = {
    turn: 'X',
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    sizes: [1, 2, 3, 4, 5, 6, 7],
    usedSizesX: [],
    usedSizesO: [],
    scores: { X: gameState.scores.X, O: gameState.scores.O }
  };
  xUsedSizes = [];
  oUsedSizes = [];
}