const game = (function () {

    let gameBoard = {
        firstRow: ['', '', ''],
        secondRow: ['', '', ''],
        thirdRow: ['', '', '']
    };

    const players = {
        playerOne: '',
        playerTwo: ''
    };

    const turn = {
        player: '',
        counter: 1,
        gameOver: false
    }

    function resetGame () {
        turn.gameOver = false;
        turn.counter = 1;
        turn.player = '';
        players.playerOne = '';
        players.playerTwo = '';
        gameBoard.firstRow = ['', '', ''];
        gameBoard.secondRow = ['', '', ''];
        gameBoard.thirdRow = ['', '', ''];
        init();
    };

    // Writes X or O depending on player, 'row' or others and the index 0, 1 or 3. Example: writeBoard('player1', 'firstRow', 1)
    function writeBoard(row, index) {
        if (turn.gameOver) {
            return;
        }
        if (turn.player === players.playerOne && gameBoard[row][index] === '') {
            gameBoard[row][index] = 'X';
            checkWinner()
            if (turn.gameOver) {
                return;
            } else {
            turn.player = players.playerTwo;
            turn.counter += 1;
            console.table(gameBoard);
            console.log(`It's ${turn.player}'s turn!`);}
        } else if (turn.player === players.playerTwo && gameBoard[row][index] === '') {
            gameBoard[row][index] = 'O';
            checkWinner()
            if (turn.gameOver) {
                return;
            } else {
            turn.player = players.playerOne;
            turn.counter += 1;
            console.table(gameBoard);
            console.log(`It's ${turn.player}'s turn!`);}
        } else {
            console.table(gameBoard);
            console.log('That position is occupied! Try again');
            return;
        }
    };

    function checkWinner() {
        if ( //check rows
            gameBoard.firstRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
            gameBoard.secondRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
            gameBoard.thirdRow.every((element, index, arr) => element !== '' && element === arr[0])
        ) {
            console.log(`${turn.player} won!`);
            turn.gameOver = true;
        } else if ( //check columns
            (gameBoard.firstRow[0] !== '' &&
                gameBoard.firstRow[0] === gameBoard.secondRow[0] &&
                gameBoard.secondRow[0] === gameBoard.thirdRow[0]) ||
            (gameBoard.firstRow[1] !== '' &&
                gameBoard.firstRow[1] === gameBoard.secondRow[1] &&
                gameBoard.secondRow[1] === gameBoard.thirdRow[1]) ||
            (gameBoard.firstRow[2] !== '' &&
                gameBoard.firstRow[2] === gameBoard.secondRow[2] &&
                gameBoard.secondRow[2] === gameBoard.thirdRow[2])
        ) {
            console.log(`${turn.player} won!`);
            turn.gameOver = true;
        } else if (//check diagonals
            (gameBoard.firstRow[0] !== '' &&
                gameBoard.firstRow[0] === gameBoard.secondRow[1] &&
                gameBoard.secondRow[1] === gameBoard.thirdRow[2]) ||
            (gameBoard.firstRow[2] !== '' &&
                gameBoard.firstRow[2] === gameBoard.secondRow[1] &&
                gameBoard.secondRow[1] === gameBoard.thirdRow[0])
        ) {
            console.log(`${turn.player} won!`);
            turn.gameOver = true;
        } else if (turn.counter === 9) { //check draw
            console.log(`It's a draw!`);
            turn.gameOver = true;
        }

    };
    function init() {
        console.table(gameBoard);
        players.playerOne = prompt('Player 1:');
        turn.player = players.playerOne;
        console.log(`Player 1 is ${players.playerOne}`)
        players.playerTwo = prompt('Player 2:');  
        console.log(`Player 2 is ${players.playerTwo}`)
        console.log(`It's ${turn.player}'s turn!`);
    };

    init();
    return { writeBoard, resetGame }

})();


