const game = (function() {

    const gameBoard = {
        firstRow: ['', '', ''],
        secondRow: ['', '', ''],
        thirdRow: ['', '', '']
    };

    let turn = 'player1';

    // Writes X or O depending on player, 'row' or others and the index 0, 1 or 3. Example: writeBoard('player1', 'firstRow', 1)
    function writeBoard (player, row, index) {
        if (player === 'player1') {
            gameBoard[row][index] = 'X';
            turn = 'player2';
        } else {
            gameBoard[row][index] = 'O';
            turn = 'player1';
        }
    };

    writeBoard(turn, 'firstRow', 2)
    console.log(gameBoard)
    writeBoard(turn, 'firstRow', 1)
    console.log(gameBoard)

})();