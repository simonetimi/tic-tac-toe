const game = (function () {

    let gameBoard = {
        firstRow: ['', '', ''],
        secondRow: ['', '', ''],
        thirdRow: ['', '', '']
    };

    const score = {
        playerOne: 0,
        playerTwo: 0,
    };

    const settings = {
        playerOne: '',
        playerTwo: '',
        gameMode: ''
    };

    const turn = {
        player: '',
        counter: 1,
        gameOver: false,
        randomIndex: 0,
        randomRow: ''
    };

    function resetGame() {
        turn.gameOver = false;
        turn.counter = 1;
        turn.player = '';
        score.playerOne = 0;
        score.playerTwo = 0;
        settings.playerOne = '';
        settings.playerTwo = '';
        settings.computerScore = 0;
        settings.gameMode = '';
        gameBoard.firstRow = ['', '', ''];
        gameBoard.secondRow = ['', '', ''];
        gameBoard.thirdRow = ['', '', ''];
        init();
    };

    function randomMove() {
        turn.randomIndex = Math.floor(Math.random() * 3);
        (() => {
            const temp = Math.floor(Math.random() * 3);
            if (temp === 0) {
                turn.randomRow = 'firstRow';
            } else if (temp === 1) {
                turn.randomRow = 'secondRow';
            } else {
                turn.randomRow = 'thirdRow';
            };
        })();
    };

    // Writes X or O depending on player, 'row' or others and the index 0, 1 or 3. Example: writeBoard('player1', 'firstRow', 1)
    function writeBoard(row, index) {
        if (turn.gameOver) {
            return;
        }
        if (settings.gameMode === 'pvp') {
            if (turn.player === settings.playerOne && gameBoard[row][index] === '') {
                gameBoard[row][index] = 'X';
                checkWinner();
                if (turn.gameOver) {
                    return;
                } else {
                    turn.player = settings.playerTwo;
                    turn.counter += 1;
                    console.table(gameBoard);
                    console.log(`It's ${turn.player}'s turn!`);
                }
            } else if (turn.player === settings.playerTwo && gameBoard[row][index] === '') {
                gameBoard[row][index] = 'O';
                checkWinner();
                if (turn.gameOver) {
                    return;
                } else {
                    turn.player = settings.playerOne;
                    turn.counter += 1;
                    console.table(gameBoard);
                    console.log(`It's ${turn.player}'s turn!`);
                }
            } else {
                console.table(gameBoard);
                console.log('That position is occupied! Try a different move');
                return;
            }
        } else if (settings.gameMode === 'pve') { //computer game functions
            gameBoard[row][index] = 'X';
            checkWinner()
            if (turn.gameOver) {
                return;
            } else {       //fix, doesn't work
                turn.player = settings.playerTwo;
                turn.counter += 1;
                console.table(gameBoard);
                console.log(`It's ${settings.playerTwo}'s turn!`);
                randomMove();
                setTimeout(() => {
                    while (gameBoard[turn.randomRow][turn.randomIndex] !== '') {
                        randomMove();
                    };
                    gameBoard[turn.randomRow][turn.randomIndex] = 'O';
                    if (turn.gameOver) {
                        return;
                    } else {
                        turn.player = settings.playerOne;
                        turn.counter += 1;
                        console.table(gameBoard);
                        console.log(`It's ${turn.player}'s turn!`);
                    }
                }, 2000);
            }
        };
    };
        function checkWinner() {
            if ( //check rows
                gameBoard.firstRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
                gameBoard.secondRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
                gameBoard.thirdRow.every((element, index, arr) => element !== '' && element === arr[0])
            ) {
                console.log(`${turn.player} won!`);
                console.table(gameBoard);
                turn.player === settings.playerOne ? score.playerOne += 1 : score.playerTwo += 1;
                console.log(`${settings.playerOne}'s score: ${score.playerOne}`);
                console.log(`${settings.playerTwo}'s score: ${score.playerTwo}`);
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
                console.table(gameBoard);
                turn.player === settings.playerOne ? score.playerOne += 1 : score.playerTwo += 1;
                console.log(`${settings.playerOne}'s score: ${score.playerOne}`);
                console.log(`${settings.playerTwo}'s score: ${score.playerTwo}`);
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
                console.table(gameBoard);
                turn.player === settings.playerOne ? score.playerOne += 1 : score.playerTwo += 1;
                console.log(`${settings.playerOne}'s score: ${score.playerOne}`);
                console.log(`${settings.playerTwo}'s score: ${score.playerTwo}`);
                turn.gameOver = true;
            } else if (turn.counter === 9) { //check draw
                console.log(`It's a draw!`);
                console.table(gameBoard);
                turn.gameOver = true;
            }

        };
        function init() {
            console.table(gameBoard);
            settings.gameMode = prompt('Game Mode: select pvp or pve');
            if (settings.gameMode === 'pvp') {
                settings.playerOne = prompt('Player 1:');
                turn.player = settings.playerOne;
                console.log(`Player 1 is ${settings.playerOne}`)
                settings.playerTwo = prompt('Player 2:');
                console.log(`Player 2 is ${settings.playerTwo}`)
            } else if (settings.gameMode === 'pve') {
                settings.playerOne = prompt('Player:');
                turn.player = settings.playerOne;
                settings.playerTwo = 'Computer';
                console.log(`You are ${settings.playerOne}`)
            }
            console.log(`It's ${turn.player}'s turn!`);
        };


        init();
        return { writeBoard, resetGame }

    }) ();