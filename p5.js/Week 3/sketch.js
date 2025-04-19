let gameState = {
  turn: 'X',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
};

window.setup = function setup() {
  createCanvas(700, 700);
}

window.draw = function draw() {
  background(50);
  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);

  text('Tic Tac Toe', 10, 20);

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

      textSize(100)
      textAlign(CENTER, CENTER)
      if (gameState.board[i][j] === 'X') {
        fill(255, 0, 0);
        text('X', x + gridSize / 2, y + gridSize / 2);
      } else if (gameState.board[i][j] === 'O') {
        fill(0, 0, 255);
        text('O', x + gridSize / 2, y + gridSize / 2);
      }
    }
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

  if (cellX >= 0 && cellX < 3 && cellY >= 0 && cellY < 3) {
    if (gameState.board[cellY][cellX] === '') {
      gameState.board[cellY][cellX] = gameState.turn;
      gameState.turn = gameState.turn === 'X' ? 'O' : 'X';

      if (checkForWin()) {
        alert(`Player ${gameState.turn === 'X' ? 'O' : 'X'} wins!`);
        resetGame();
      }

      if (checkForDraw()) {
        alert('It\'s a draw!');
        resetGame();
      }
    }
  }
}

function checkForWin() {
  for (let i = 0; i < 3; i++) {
    if (gameState.board[i][0] === gameState.board[i][1] && gameState.board[i][1] === gameState.board[i][2] && gameState.board[i][0] !== '') {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i] && gameState.board[0][i] !== '') {
      return true;
    }
  }

  if (gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2] && gameState.board[0][0] !== '') {
    return true;
  }
  if (gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0] && gameState.board[0][2] !== '') {
    return true;
  }

  return false;
}

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

function resetGame() {
  gameState = {
    turn: 'X',
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  };
}