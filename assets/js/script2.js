let blockSize = 25;
let total_row = 10; //total row number
let total_col = 10; //total column number
let board;
let context;

// Sets the size of the individual snake blocks
let snakeX;
let snakeY;


let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

let gameInterval;

const gameOverModal = new bootstrap.Modal(document.getElementById("gameOverModal"))

const newGameButtons = document.querySelectorAll(".newGame");

for (let newGameButton of newGameButtons) {
    newGameButton.addEventListener("click", function(e){
    gameOverModal.hide();
    playSnake();
    })
}

function playSnake() {

    // sets the variables for a fresh games
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    gameOver = false;

    //sets the board dimension and context
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");


    // Place the first food and add a listener for movements
    placeFood();
    document.addEventListener("keyup", changeDirection); //for movements

    // set game interval here
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, 1000 / 10);

    // Draws the starting board
    drawBoard();
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
}

/**the main game running function, updates according to the interval set in playSnake() */
function update() {
    if (gameOver) {
        return;
    }

    drawBoard();

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

    // defines game over rules for hitting walls
    if (snakeX < 0 || snakeX > (total_col * blockSize) - blockSize|| snakeY < 0 || snakeY > (total_row * blockSize) - blockSize) {
            gameOver = true;
            gameOverModal.show();
        }

    // defines game rules for snake hitting snake body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            gameOverModal.show();
        }
    }
}
