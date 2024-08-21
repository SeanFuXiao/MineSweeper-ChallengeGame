console.log('hello')

/*-------------------------------- Constants --------------------------------*/

const DIFFICULTY_LEVELS = {
    Easy: { rows: 9, cols: 9, totalMines: 10 },
    Medium: { rows: 16, cols: 16, totalMines: 40 },
    Hard: { rows: 23, cols: 23, totalMines: 70 },
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
    //function placeMines(); 
    //placeMines();
    //calculateAdjacentMines();
/*----------------------------- Event Listeners -----------------------------*/
    //startBtn.addEventListener;
    




    document.addEventListener('DOMContentLoaded', function () {
        const startBtn = document.getElementById('startbtn');
        const gameArea = document.getElementById('game-area');
        const dropdownBox = document.getElementById('dropdownbox');
    
        startBtn.addEventListener('click', function () {
            const difficulty = dropdownBox.value;
            ({ rows, cols, totalMines } = DIFFICULTY_LEVELS[difficulty]);
    
            gameArea.innerHTML = '';
            cells = [];
    
            const cellSize = 30;  
            const gapSize = 1;
    
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
    
            
                cell.isMine = false;
                cell.isRevealed = false;
                cell.adjacentMines = 0;
    
                cells.push(cell); 
                gameArea.appendChild(cell);

                
            }
    
            
            placeMines();
        
            
            calculateAdjacentMines();

            
            //test
            //test
            //test
            //test

            cells.forEach((cell, index) => {
                if (cell.isMine) {
                    console.log(`Mine placed at index: ${index}, row: ${Math.floor(index / cols)}, col: ${index % cols}`);
                }
            });
            
            console.log(totalCells);
            console.log(totalMines);

            //test
            //test
            //test

        });
    
        function placeMines() {
            let minesPlaced = 0;
            while (minesPlaced < totalMines) {
                const randomIndex = Math.floor(Math.random() * cells.length);
                const cell = cells[randomIndex];
                if (!cell.isMine) {
                    cell.isMine = true;
                    minesPlaced++;
                }
            }
        }

        function calculateAdjacentMines() {
            const directions = [
                -cols - 1,      -cols,      -cols + 1,  
                -1,                             1,   
                 cols - 1,       cols,       cols + 1     
            ];
        
            
            cells.forEach((cell, index) => {
                if (cell.isMine) return;
    
                let adjacentMines = 0;
                directions.forEach(direction => {
                    const adjacentIndex = index + direction;
                    if (
                        adjacentIndex >= 0 &&
                        adjacentIndex < cells.length &&
                        !isDifferentRow(index, adjacentIndex, direction) &&
                        cells[adjacentIndex].isMine
                    ) {
                        adjacentMines++;
                    }
                });
                cell.adjacentMines = adjacentMines;
                console.log(`Cell at index ${index} (row: ${Math.floor(index / cols)}, col: ${index % cols}) has ${adjacentMines} adjacent mines.`);

            });
        }

        function isDifferentRow(index, adjacentIndex, direction) {
            if (direction === -1 || direction === 1) {
                return Math.floor(index / cols) !== Math.floor(adjacentIndex / cols);
            }
            return false;
        }
        
    });
    