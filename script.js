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

    const checkBoard = {
        lastClick: '',
        read: () => {
            if (turn.randomRow === 'firstRow' && turn.randomIndex === 0) {
                checkBoard.lastClick = 1;
            } else if (turn.randomRow === 'firstRow' && turn.randomIndex === 1) {
                checkBoard.lastClick = 2;
            } else if (turn.randomRow === 'firstRow' && turn.randomIndex === 2) {
                checkBoard.lastClick = 3;
            } else if (turn.randomRow === 'secondRow' && turn.randomIndex === 0) {
                checkBoard.lastClick = 4;
            } else if (turn.randomRow === 'secondRow' && turn.randomIndex === 1) {
                checkBoard.lastClick = 5;
            } else if (turn.randomRow === 'secondRow' && turn.randomIndex === 2) {
                checkBoard.lastClick = 6;
            } else if (turn.randomRow === 'thirdRow' && turn.randomIndex === 0) {
                checkBoard.lastClick = 7;
            } else if (turn.randomRow === 'thirdRow' && turn.randomIndex === 1) {
                checkBoard.lastClick = 8;
            } else if (turn.randomRow === 'thirdRow' && turn.randomIndex === 2) {
                checkBoard.lastClick = 9;
            }
        }
    };
            
    const ui = {
        slot1: document.getElementById('1'),
        slot2: document.getElementById('2'),
        slot3: document.getElementById('3'),
        slot4: document.getElementById('4'),
        slot5: document.getElementById('5'),
        slot6: document.getElementById('6'),
        slot7: document.getElementById('7'),
        slot8: document.getElementById('8'),
        slot9: document.getElementById('9')
    };

    function clickEvent(event) {
        checkBoard.lastClick = this.id;
        switch (this.id) {
            case '1':
                writeBoard('firstRow', '0');
                break;
            case '2':
                writeBoard('firstRow', '1');
                break;
            case '3':
                writeBoard('firstRow', '2');
                break;
            case '4':
                writeBoard('secondRow', '0');
                break;
            case '5':
                writeBoard('secondRow', '1');
                break;
            case '6':
                writeBoard('secondRow', '2');
                break;
            case '7':
                writeBoard('thirdRow', '0');
                break;
            case '8':
                writeBoard('thirdRow', '1');
                break;
            case '9':
                writeBoard('thirdRow', '2');
                break;
        };
    };

    function renderSlot() {
        if (turn.player === settings.playerOne) {
            const xImage = document.createElement('img');
            xImage.src = 'images/cross.png';
            xImage.classList.add("icon");
            document.getElementById(checkBoard.lastClick).appendChild(xImage);
        } else if (turn.player === settings.playerTwo) {
            const oImage = document.createElement('img');
            oImage.src = 'images/circle.png';
            oImage.classList.add("icon");
            document.getElementById(checkBoard.lastClick).appendChild(oImage);
        }
    };

    const addClick = (function () {
        for (const slot in ui) {
            if (ui.hasOwnProperty(slot)) {
                ui[slot].addEventListener('click', clickEvent);
            };
        };
    })();


    function nextRound() { //da collegare alla funzione checkWinner (con delay)
        turn.gameOver = false;
        turn.counter = 1;
        turn.player = settings.playerOne;
        gameBoard.firstRow = ['', '', ''];
        gameBoard.secondRow = ['', '', ''];
        gameBoard.thirdRow = ['', '', ''];
    };

    function resetGame() {
        turn.gameOver = false;
        turn.counter = 1;
        turn.player = '';
        score.playerOne = 0;
        score.playerTwo = 0;
        settings.playerOne = '';
        settings.playerTwo = '';
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
                renderSlot();
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
                renderSlot();
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
            renderSlot()
            checkWinner()
            if (turn.gameOver) {
                return;
            } else {
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
                    checkBoard.read();
                    renderSlot()
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
            updateScores();
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
            updateScores();
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
            updateScores();
            turn.gameOver = true;
        } else if (turn.counter === 9) { //check draw
            console.log(`It's a draw!`);
            console.table(gameBoard);
            turn.gameOver = true;
        }
        function updateScores() {
            turn.player === settings.playerOne ? score.playerOne += 1 : score.playerTwo += 1;
            console.log(`${settings.playerOne}'s score: ${score.playerOne}`);
            console.log(`${settings.playerTwo}'s score: ${score.playerTwo}`);
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

})();