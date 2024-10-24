let blockSize = 25;
let total_row = 25; //total row number
let total_col = 25; //total column number
let board;
let context;

// Sets the size of the individual snake blocks
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

const gameOverModal = new bootstrap.Modal(document.getElementById("gameOverModal"))

let gameOver = false;

window.onload = function () {
    // sets board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); //for movements

    // set snake speed
    setInterval(update, 1000 / 10);
}

function drawBoard() {
    for (let row = 0; row < total_row; row++) {
        for (let col = 0; col < total_col; col++) {

            let x = col * blockSize;
            let y = row * blockSize;

            context.fillStyle = "black";
            context.fillRect(x, y, blockSize, blockSize);

            context.strokeStyle = "blue";
            context.lineWidth = 2;
            context.strokeRect(x, y, blockSize, blockSize)
        }
    }
}

function update() {
    if (gameOver) {
        return;
    }

    drawBoard();

    // context.fillStyle = "black";
    // context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([...snakeBody[snakeBody.length - 1] || [snakeX, snakeY]]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {

        snakeBody[i] = snakeBody [i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Sets the body colour and border colour for the snake.
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.strokeRect(snakeX, snakeY, blockSize, blockSize);

    snakeX += speedX * blockSize; //updating Snake position in X
    
    snakeY += speedY * blockSize; //updating Snake position in Y

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        context.strokeRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 
        || snakeX > total_col *blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
            gameOver = true;
            gameOverModal.show();
        }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            gameOverModal.show();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;

    while ((foodX === snakeX) && (foodY === foodX)) {
        placeFood();
    }
}
