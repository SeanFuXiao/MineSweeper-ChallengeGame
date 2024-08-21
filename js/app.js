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
            const cellSize = 30;  
            const gapSize = 1;    
    
            if (difficulty === 'Easy') {
                rows = 15;
                cols = 15;
            } else if (difficulty === 'Medium') {
                rows = 20;
                cols = 20;
            } else if (difficulty === 'Hard') {
                rows = 25;
                cols = 25;
            }
    
            gameArea.innerHTML = '';
    
           
            gameArea.style.display = 'grid';
            gameArea.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
            gameArea.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            gameArea.style.gap = `${gapSize}px`;
    
            
            const totalWidth = cols * cellSize + (cols - 1) * gapSize + 4;  
            const totalHeight = rows * cellSize + (rows - 1) * gapSize + 4;
    
            
            gameArea.style.width = `${totalWidth}px`;
            gameArea.style.height = `${totalHeight}px`;
    
           
            const totalCells = rows * cols;
            for (let i = 0; i < totalCells; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                gameArea.appendChild(cell);
            }
        });
    });
    
    