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

    const welcome = {
        pveBtn: document.getElementById('pve').addEventListener('click', () => {
            settings.gameMode = 'pve';
            interface.pickMode.classList.add("hide");
            interface.pveInputName.classList.toggle('hide');
        }),
        pvpBtn: document.getElementById('pvp').addEventListener('click', () => {
            settings.gameMode = 'pvp';
            interface.pickMode.classList.add("hide");
            interface.pvpInputName.classList.toggle('hide');

            // DEVE DIVENTARE UN FIELD INPUT settings.playerOne = prompt('Player 1:');
            // DEVE DIVENTARE L'EFFETTO DI UN LISTENER EVENT turn.player = settings.playerOne;
            // console.log(`Player 1 is ${settings.playerOne}`)
            // DEVE DIVENTARE UN FIELD INPUT settings.playerTwo = prompt('Player 2:');
            // DEVE DIVENTARE L'EFFETTO DI UN LISTENER EVENT console.log(`Player 2 is ${settings.playerTwo}`)
        })
    }

    const interface = {
        pickMode: document.getElementById('pick-mode'),
        pveInputName: document.getElementById('pve-input-name'),
        pvpInputName: document.getElementById('pvp-input-name'),
        status: document.getElementById('status'),
        playerOneName: document.getElementById('player1-name'),
        playerTwoName: document.getElementById('player2-name'),
        playerOneScore: document.getElementById('player1-score'),
        playerTwoScore: document.getElementById('player2-score'),
        gameGrid: document.querySelector('.game-grid'),
        pveSubBtn: document.getElementById('pve-submit').addEventListener('click', () => {
            const inputValue = document.getElementById('pve-player1-name').value;
            if (inputValue.length < 2 || inputValue.length > 20) {
                return;
            } else {
                settings.playerOne = document.getElementById('pve-player1-name').value;
                turn.player = settings.playerOne;
                settings.playerTwo = 'Computer';
                interface.pveInputName.classList.toggle('hide');
                init();
            }
        }),
        pveSubBtn: document.getElementById('pvp-submit').addEventListener('click', () => {
            const inputValueOne = document.getElementById('pvp-player1-name').value;
            const inputValueTwo = document.getElementById('pvp-player2-name').value;
            if ((inputValueOne.length < 2 || inputValueOne.length > 16) &&
                (inputValueTwo.length < 2 || inputValueTwo.length > 16) &&
                inputValueOne !== inputValueTwo) {
                return;
            } else {
                settings.playerOne = document.getElementById('pvp-player1-name').value;
                settings.playerTwo = document.getElementById('pvp-player2-name').value;
                turn.player = settings.playerOne;
                interface.pvpInputName.classList.toggle('hide');
                init();
            }
        }),
            turnStatus: document.querySelector('.round')
    };

    function init() {
        interface.playerOneName.innerHTML = `${settings.playerOne}`;
        interface.playerTwoName.innerHTML = `${settings.playerTwo}`;
        interface.playerOneScore.innerHTML = `${score.playerOne}`;
        interface.playerTwoScore.innerHTML = `${score.playerTwo}`;
        interface.status.classList.toggle('hide');
        interface.gameGrid.classList.toggle('hide');
        interactiveBoard.addClick();
        interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
    }

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


    const interactiveBoard = {
        addClick: () => {
            for (const slot in ui) {
                if (ui.hasOwnProperty(slot)) {
                    ui[slot].addEventListener('click', clickEvent);
                };
            };
        },
        removeClick: () => {
            for (const slot in ui) {
                if (ui.hasOwnProperty(slot)) {
                    ui[slot].removeEventListener('click', clickEvent);
                };
            };
        },
        clearBoardUi: () => {
            Object.keys(ui).forEach(slot => {
                while (ui[slot].firstChild) {
                    ui[slot].removeChild(ui[slot].firstChild);
                }
            });
        }
    };


    function nextRound() {
        turn.gameOver = false;
        turn.counter = 1;
        turn.player = settings.playerOne;
        gameBoard.firstRow = ['', '', ''];
        gameBoard.secondRow = ['', '', ''];
        gameBoard.thirdRow = ['', '', ''];
        interactiveBoard.clearBoardUi();
        interactiveBoard.removeClick();
        interactiveBoard.addClick();
        interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
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
                    interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
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
                    interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
                }
            } else {
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
                interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
                randomMove();
                //disable buttons
                interactiveBoard.removeClick();
                setTimeout(() => {
                    while (gameBoard[turn.randomRow][turn.randomIndex] !== '') {
                        randomMove();
                    };
                    gameBoard[turn.randomRow][turn.randomIndex] = 'O';
                    checkBoard.read();
                    renderSlot()
                    checkWinner()
                    if (turn.gameOver) {
                        return;
                    } else {
                        turn.player = settings.playerOne;
                        turn.counter += 1;
                        interface.turnStatus.innerHTML = `It's ${turn.player}'s turn!`;
                    }
                    interactiveBoard.addClick();
                }, 1500);
                //enable buttons
            }
        };
    };
    function checkWinner() {
        if ( //check rows
            gameBoard.firstRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
            gameBoard.secondRow.every((element, index, arr) => element !== '' && element === arr[0]) ||
            gameBoard.thirdRow.every((element, index, arr) => element !== '' && element === arr[0])
        ) {
            interface.turnStatus.innerHTML = `<p>${turn.player} won!</p><p>Next round in 3... 2... 1...</p>`;
            updateScores();
            turn.gameOver = true;
            //restarts round after 3 seconds
            setTimeout(() => {
                nextRound();
            }, "4000");
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
            interface.turnStatus.innerHTML = `<p>${turn.player} won!</p><p>Next round in 3... 2... 1...</p>`;
            updateScores();
            turn.gameOver = true;
            //restarts round after 3 seconds
            setTimeout(() => {
                nextRound();
            }, "4000");
        } else if (//check diagonals
            (gameBoard.firstRow[0] !== '' &&
                gameBoard.firstRow[0] === gameBoard.secondRow[1] &&
                gameBoard.secondRow[1] === gameBoard.thirdRow[2]) ||
            (gameBoard.firstRow[2] !== '' &&
                gameBoard.firstRow[2] === gameBoard.secondRow[1] &&
                gameBoard.secondRow[1] === gameBoard.thirdRow[0])
        ) {
            interface.turnStatus.innerHTML = `<p>${turn.player} won!</p><p>Next round in 3... 2... 1...</p>`;
            updateScores();
            turn.gameOver = true;
            //restarts round after 3 seconds
            setTimeout(() => {
                nextRound();
            }, "4000");
        } else if (turn.counter === 9) { //check draw
            interface.turnStatus.innerHTML = `It's a draw!</p><p>Next round in 3... 2... 1...</p>`;
            turn.gameOver = true;
            //restarts round after 3 seconds
            setTimeout(() => {
                nextRound();
            }, "4000");
        }
        function updateScores() {
            turn.player === settings.playerOne ? score.playerOne += 1 : score.playerTwo += 1;
            interface.playerOneScore.innerHTML = `${score.playerOne}`;
            interface.playerTwoScore.innerHTML = `${score.playerTwo}`;
        }

    };

})();