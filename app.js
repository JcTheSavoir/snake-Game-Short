let scoreTracker = 0; //----------------------------------------{Variable to keep track of current score}
let snakeCurrentDirection = null; //---------------------------------{Variable to keep track of current snake movement direction}
let delaySnake = null; //---------------------{Variable to assist in delaying snake movement}
let newId = null; //-------------------------------{Variable to keep track of head of snake}
let snakeBodies = []; //-------------------------------{Variable to keep track of body of snake}
let appleTrackArray = []; //--------------------------------{Array to keep track of where apple can spawn}
// -------------------------------------------VV---------{Create grid for game}
const generateGrid = () => {
    let gridItself = document.querySelector('#gridItself');
    gridItself.innerHTML = "";
    appleTrackArray = [];
    for (let i = 0; i < 625; i++) {
        // delayGrid(i) // This shows the grid being generated on element at a time.  Game will not work if this is active
        let gridEach = document.createElement('div');
        gridEach.setAttribute('id', `gridEach-${i}`);
        appleTrackArray.push(i)
        gridEach.innerHTML = i;
        gridItself.append(gridEach);
    };
    let startSnake = document.querySelector("#gridEach-305");
    let startApple = document.querySelector(`#gridEach-320`);
    startApple.setAttribute('class', 'gridEachApple');
    startSnake.setAttribute('class', `gridEachSnakeHead`);
    let startButton = document.querySelector('.startGame');
    startButton.innerHTML = "Restart Game";
    resetVariables();
    window.addEventListener('keydown', keydownListener);
};
//-------------------------------------------VV----------{Create listener handler for arrowkey press}
keydownListener = event => {
    const pressedKey = event.key;
    const arrowKeys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
    if(arrowKeys.includes(pressedKey)){
        event.preventDefault();
        snakeCurrentDirection = pressedKey;
        if(delaySnake === null){
            snakeMoving();
        //-----------------------comment out this if statement if snake should not move on it's own (for testing)
        };
        directionSnakeHead(snakeCurrentDirection);
    };
};
//---------------------------------------------VV----------{actual listener using the keydownListener function}
const snakeMoving = () => {
    delaySnake = setInterval(() => {
        if (snakeCurrentDirection) {
            directionSnakeHead(snakeCurrentDirection);
        };
    }, 500);
};
//-------------------------------------------VV----------{snake direction controls}
const directionSnakeHead = (e) => {
    let findSnake = null;
// PART 1 ---------------------------find the element with snake class when grid is created
    if (newId === null) {
        findSnake = document.querySelector('.gridEachSnakeHead');
// PART 2 ---------------------------If grid is already made, track movement of the original snake
    } else { 
        findSnake = document.querySelector(`.gridEachSnakeHead#gridEach-${newId}`);
    };
    let currentSnake = findSnake ? findSnake.id: null; // -------------------------------------------Find the id of the associated snake element
    const splitID = currentSnake.split('-'); //----------------------------------------Split Id into word and number
    hasBeenSplit = splitID[1]; //----------------------------Select the number part of the Id
    changeToNumber = hasBeenSplit * 1; //-------------------------------Ensures we are working with number and not a string
    let pastId = newId; //-------------------------------Saves the "newId" variable before it's changed from movement, in order to pass it to the snakeBodies function
    switch (e) {
        //-------------------------Depending on the direction, change Id to match corresponding new block
        case "ArrowUp":
            newId = changeToNumber - 25;
            break;
        case "ArrowDown":
            newId = changeToNumber + 25;
            break;
        case "ArrowRight":
            newId = changeToNumber + 1;
            break;
        case "ArrowLeft":
            newId = changeToNumber - 1;
            break;                    
    };
    checkForDefeat(changeToNumber, newId); //----------------------Checks to see if the movement would lead to defeat
    let newSnake = document.querySelector(`#gridEach-${newId}`); //-------------------------------------select element with the new Id    
    newSnake.setAttribute('class', `gridEachSnakeHead`); //---------------------------------------------add the Snake class to the element
    changeImageDirection(newSnake, e); //---------------------------------Check if snake head image needs rotated 
    checkToAddSnake(findSnake); //-------------------------Check if a new element needs a snake class
    let snakeBodyArrays = directionSnakeBody(pastId, newId); //----------------------Keeps track of the snakeBodies
    createApple(snakeBodies, newId);
};
//-------------------------------------VV--------------{check if new snake is needed}
const checkToAddSnake = (theSnake) => {
    const snakeLengthBody = document.querySelectorAll('.gridEachSnakeBody').length;
    const snakeLengthHead = document.querySelectorAll('.gridEachSnakeHead').length;
    let fullSnakeLength = snakeLengthBody + snakeLengthHead;
    let currentLength = document.querySelector('.actualSnakeLength');
    if ((fullSnakeLength - scoreTracker) - 1 === 0 || scoreTracker > (fullSnakeLength + 2)) {
        // theSnake.classList.remove('gridEachSnakeBody')  //--comment out this line to allow snake to grow
        const snakeLengthBody = document.querySelectorAll('.gridEachSnakeBody').length;
        const snakeLengthHead = document.querySelectorAll('.gridEachSnakeHead').length;
        let fullSnakeLength = snakeLengthBody + snakeLengthHead;
        currentLength.innerHTML = fullSnakeLength;
        theSnake.classList.remove('gridEachSnakeHead')
        theSnake.classList.add('gridEachSnakeBody')
    }else{
        theSnake.classList.remove('gridEachSnakeHead');
    };
};
//------------------------------------------------------{Function for moving non head section of the snake (with a check of defeat if snake eats itself)}
const directionSnakeBody = (pastId, newId) => {
    const snakeLengthBody = document.querySelectorAll('.gridEachSnakeBody').length;
    const snakeLengthHead = document.querySelectorAll('.gridEachSnakeHead').length;
    let fullSnakeLength = snakeLengthBody + snakeLengthHead;
    if (fullSnakeLength >= 2 && pastId != null) {
        // adds the id of where snake head was, to the snake bodies array, as well as ensuring that body piece keeps the correct class
        snakeBodies.unshift(pastId);
        let snakeBodyAdd = document.querySelector(`#gridEach-${pastId}`)
        snakeBodyAdd.classList.add('gridEachSnakeBody');
    };
    if (snakeBodies.length >= fullSnakeLength && snakeBodies.length > 1) {
        let snakeRemove = (snakeBodies.pop() * 1);
        // ------------------ if statement to prevent head of snake from losing it's class when directly behind the end of the snake
        if (snakeRemove === newId) {
            console.log('snake head has same ID as previous end of snake, not removing class.')
        } else {
            let snakeBodyRemoved = document.querySelector(`#gridEach-${snakeRemove}`);
            snakeBodyRemoved.classList.remove('gridEachSnakeBody');
        }
    }
    if (snakeBodies.includes(newId)) {
        //if snake body already has that part, then the snake has eaten itself, thus triggering defeat
        youAreDefeated()
    }
    return snakeBodies;
};
//----------------------------------------------------{Function for adding new apples to board}
const createApple = (snakeBodies, snakeHead) => {
    let currentScore = document.querySelector('.actualSnakeScore');
    let currentApple = document.querySelector('.gridEachApple');
    // -----------VV-----{If there is no apple currently (right after the snake eats it), then a new apple will be created}
    if (currentApple === null) {
        /* Using the filter option to create a new array that includes all grid Id's except for the snakes head (newid) and 
        snake body (snakeBodies) positions*/
        let whereCanAppleSpawn = appleTrackArray.filter(grid =>
            !snakeBodies.includes(grid) && grid !== snakeHead
        ); //-----similar to a mapping function, but only for removing items from an array and not changing them
        //-----------------VV------------Length of the new array
        let appleSpawnLength = whereCanAppleSpawn.length;
        // let newApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`);
        //--------------VV--------------{create a random number based on the length of the new array}
        let newAppleIndex = Math.floor(Math.random() * appleSpawnLength);
        // --------------VV--------------{chose the new apple based on the grid id located at the index created above}
        let newAppleGridId = whereCanAppleSpawn[newAppleIndex]
        // -------------VV---------------{Select the grid element at that id}
        let newApple = document.querySelector(`#gridEach-${newAppleGridId}`)
        newApple.setAttribute('class', 'gridEachApple');
        scoreTracker += 1;
        currentScore.innerHTML = scoreTracker;
    };
};
//-------------------------------------------{Function to check for defeat from wall}
const checkForDefeat = (a, b) => {
    const fakeArray = [];
    if (b > 624 || b < 0) {
        youAreDefeated();
        return true;
    };
        const defeatArrayLeft = [0];
        const defeatArrayRight = [24];
    for (let i = 0; i < 24; i++) {
        //--------have array with all instances of defeat if moving left to right
        const lastIndexLeft = defeatArrayLeft.length - 1;
        const lastElementArrayLeft = defeatArrayLeft[lastIndexLeft];
        defeatArrayLeft.push(lastElementArrayLeft + 25);
        //--------have array with all instances of defeat if moving right to left
        const lastIndexRight = defeatArrayRight.length - 1;
        const lastElementArrayRight = defeatArrayRight[lastIndexRight];
        defeatArrayRight.push(lastElementArrayRight + 25);
        if ((defeatArrayLeft.includes(a) && defeatArrayRight.includes(b)) || (defeatArrayRight.includes(a) && defeatArrayLeft.includes(b))) {
            youAreDefeated();
            return false;
        };
    };
    return true;
};
//-----------------------------------------------------{Function to activate defeat sequence}
const youAreDefeated = () => {
    alert("That Path Lead to your Defeat");
    let startButton = document.querySelector('.startGame');
    startButton.innerHTML = "Try Again?";
    resetVariables();
};
//----------------------------------------------------{Function for resetting variables}
const resetVariables = () => {
    scoreTracker = 0;
    let currentScore = document.querySelector('.actualSnakeScore');
    let currentLength = document.querySelector('.actualSnakeLength');
    currentLength.innerHTML = 1;
    currentScore.innerHTML = 0;
    window.removeEventListener('keydown', keydownListener);
    clearInterval(delaySnake);
    delaySnake = null;
    snakeBodies = [];
    newId = null;
};
const changeImageDirection = (newSnake, e) => {
    switch (e) {
        //-------------------------Depending on the direction, change Id to match corresponding new block
        case "ArrowUp":
            newSnake.style.transform = "rotate(180deg)";
            break;
        case "ArrowDown":
            newSnake.style.transform = "rotate(0deg)";
            break;
        case "ArrowRight":
            newSnake.style.transform = "rotate(270deg)";
            break;
        case "ArrowLeft":
            newSnake.style.transform = "rotate(90deg)";
            break;                    
    };
}
/*----------------------------------------------------{Delay Function}
This is for informational purposes only, and will not run at runtime.  
If code is changed to make this active at run time, the game will not be playable
**This is to delay each iteration of the "for loop" that creates the grid.  
Doing so will let you see the grid be built element by element
*/
const delayGrid = (i) => {
    setTimeout(() => {
        let gridEach = document.createElement('div');
        gridEach.setAttribute('id', `gridEach-${i}`);
        gridEach.innerHTML = i;
        gridItself.append(gridEach);
    }, 100 * i);
};