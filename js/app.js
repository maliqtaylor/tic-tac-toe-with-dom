/*-------------------------------- Constants --------------------------------*/
const game = {
    player: 'X',
    winner: null,
    message: `Click on a square to start the game!`,
}
/*------------------------ Cached Element References ------------------------*/
let board = document.querySelector('.board')
let message = document.querySelector('#message')
let reset = document.querySelector('#reset')
/*---------------------------- Variables (state) ----------------------------*/
let allSquares = listToMatrix(board.children, 3)
/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener('click', (e) => game.addUserPick(e))

reset.addEventListener('click', resetBoard)
/*-------------------------------- Functions --------------------------------*/
game.addUserPick = function (e) {
    if (this.winner) return

    let square = e.target;

    if (!square.innerText) {
        square.innerText = this.player
        this.checkWinnerHz()
        this.checkWinnerVt()
        this.checkWinnerDg()
        this.displayWinner()
        square.className += " " + this.player.toLocaleLowerCase()
        if (this.winner) return
        this.toggleUser()
    }
}

game.toggleUser = function () {
    this.player === 'X' ? this.player = 'O' : this.player = 'X'
    this.message = `Turn Player : ${this.player}`
    message.innerText = this.message
}

game.checkWinnerHz = function () {
    for (let i = 0; i < allSquares.length; i++) {
        let row = allSquares[i]
        let sum = 0

        for (let j = 1; j < row.length; j++) {
            let prev = row[j - 1].innerText
            let curr = row[j].innerText
            if (prev)
                if (curr === prev) sum++
        }
        if (sum === 2) this.winner = true
    }
}

game.checkWinnerVt = function () {
    let topRow = allSquares[0];
    for (let i = 0; i < topRow.length; i++) {
        let top = topRow[i].innerText
        let middle = allSquares[1][i].innerText
        let bottom = allSquares[2][i].innerText
        if (top)
            if (top === middle && middle === bottom) {
                this.winner = true
            }
    }
}

game.checkWinnerDg = function () {
    let topLeft = allSquares[0][0].innerText
    let topRight = allSquares[0][2].innerText
    let middle = allSquares[1][1].innerText
    let botLeft = allSquares[2][0].innerText
    let botRight = allSquares[2][2].innerText
    if (topLeft)
        if (topLeft === middle && middle === botRight) {
            this.winner = true
        }
    if (topRight)
        if (topRight === middle && middle === botLeft) {
            this.winner = true
        }
}

game.displayWinner = function () {
    if (this.winner === true) {
        this.message = `Player ${this.player} Wins !`
        confetti.start(1500);
        message.innerText = this.message
    }
}

function resetBoard() {
    for (let row of allSquares) {
        for (let square of row) {
            square.innerText = ''
            square.className = 'square'
        }
    }
    game.player = 'X'
    game.message = 'Player X click on a square to begin'
    message.innerText = game.message
    game.winner = false
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}