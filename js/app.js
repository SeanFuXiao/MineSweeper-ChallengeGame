console.log('hello')

/*-------------------------------- Constants --------------------------------*/

const DIFFICULTY_LEVELS = {
    Easy: { rows: 10, cols: 10, totalMines: 15 },
    Medium: { rows: 20, cols: 20, totalMines: 60 },
    Hard: { rows: 30, cols: 30, totalMines: 135 },
};


/*---------------------------- Variables (state) ----------------------------*/

let currentDifficulty = 'Easy';
let rows, cols, totalMines;
let cells = []; 
let gameOver = false;
/*------------------------ Cached Element References ------------------------*/

    // const startBtn = document.getElementById('startbtn');
    // const gameArea = document.getElementById('game-area');
    // const dropdownBox = document.getElementById('dropdownbox');


/*-------------------------------- Functions --------------------------------*/
    //createCells;



/*----------------------------- Event Listeners -----------------------------*/
    //startBtn.addEventListener;
    




document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startbtn');
    const gameArea = document.getElementById('game-area');
    const dropdownBox = document.getElementById('dropdownbox');

    startBtn.addEventListener('click', function () {
        const difficulty = dropdownBox.value;
        let rows, cols;

        if (difficulty === 'Easy') {
            rows = 10;
            cols = 10;
        } else if (difficulty === 'Medium') {
            rows = 20;
            cols = 20;
        } else if (difficulty === 'Hard') {
            rows = 30;
            cols = 30;
        }

        gameArea.innerHTML = '';

    
        gameArea.style.display = 'grid';

        gameArea.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        gameArea.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        gameArea.style.gap = '1px';

        
        const totalCells = rows * cols;
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameArea.appendChild(cell);
        }
    });
});
