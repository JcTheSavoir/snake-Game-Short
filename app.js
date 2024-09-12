let scoreTracker = 0; //----------------------------------------{Variable to keep track of current score}
let snakeCurrentDirection = null; //---------------------------------{Variable to keep track of current snake movement direction}
let delaySnake = null; //---------------------{Variable to assist in delaying snake movement}
let newId = null; //-------------------------------{Variable to keep track of head of snake}
let snakeBodies = []; //-------------------------------{Variable to keep track of body of snake}
// -------------------------------------------VV---------{Create grid for game}
const generateGrid = () => {
    let gridItself = document.querySelector('#gridItself');
    gridItself.innerHTML = "";
    for (let i = 0; i < 625; i++) {
        // delayGrid(i) // This shows the grid being generated on element at a time.  Game will not work if this is active
        let gridEach = document.createElement('div');
        gridEach.setAttribute('id', `gridEach-${i}`);
        gridEach.innerHTML = i;
        gridItself.append(gridEach);
    };
    let startSnake = document.querySelector("#gridEach-305");
    let startApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`);
    startApple.setAttribute('class', 'gridEachApple');
    startSnake.setAttribute('class', `gridEachSnake`);
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
        // if(delaySnake === null){
        //     snakeMoving();
        // //-----------------------comment out this if statement if snake should not move on it's own (for testing)
        // };
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
        findSnake = document.querySelector('.gridEachSnake');
// PART 2 ---------------------------If grid is already made, track movement of the original snake
    } else { 
        findSnake = document.querySelector(`.gridEachSnake#gridEach-${newId}`);
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
    newSnake.setAttribute('class', `gridEachSnake`); //---------------------------------------------add the Snake class to the element
    console.log(`Adding snake head at ${newId}`)
    checkToAddSnake(findSnake); //-------------------------Check if a new element needs the snake class
    let snakeBodyArrays = directionSnakeBody(pastId, newId); //----------------------Keeps track of the snakeBodies
    createApple(snakeBodyArrays);
    let bodyLength = snakeBodyArrays.length;
    //----------------VV------Create Snake Body
    let i = 0;
    while (i < bodyLength) {
        let newSnakeBody = document.querySelector(`#gridEach-${snakeBodyArrays[i]}`);
        newSnakeBody.setAttribute('class', 'gridEachSnake');
        i++;
    };
};
//-------------------------------------VV--------------{check if new snake is needed}
const checkToAddSnake = (theSnake) => {
    const snakeLength = document.querySelectorAll('.gridEachSnake').length;
    let currentLength = document.querySelector('.actualSnakeLength');
    if ((snakeLength - scoreTracker) - 1 === 0 || scoreTracker > (snakeLength + 2)) {
        // theSnake.classList.remove('gridEachSnake')  //--comment out this line to allow snake to grow
        const snakeLength = document.querySelectorAll('.gridEachSnake').length;
        currentLength.innerHTML = snakeLength;
    }else{
        theSnake.classList.remove('gridEachSnake');
    };
};
//------------------------------------------------------{Function for moving non head section of the snake (with a check of defeat if snake eats itself)}
const directionSnakeBody = (pastId, newId) => {
    const snakeLength = document.querySelectorAll('.gridEachSnake').length;
    if (snakeLength >= 2 && pastId != null) {
        console.log(snakeBodies)
        console.log(pastId)
        // if snake body does not already have that id, then it will be added as normal
        console.log(`Adding snake body at ${pastId}`)
        snakeBodies.unshift(pastId);
    };
    if (snakeBodies.length >= snakeLength && snakeBodies.length > 1) {
        let snakeRemove = (snakeBodies.pop() * 1);
        // ------------------ if statement to prevent head of snake from losing it's class when directly behind the end of the snake
        if (snakeRemove === newId) {
            console.log('snake head has same ID as previous end of snake, not removing class.')
        } else {
            console.log(`Removing snake body at ${snakeRemove}`)
            let snakeBodyRemoved = document.querySelector(`#gridEach-${snakeRemove}`);
            snakeBodyRemoved.classList.remove('gridEachSnake');
        }
    }
    if (snakeBodies.includes(newId)) {
        //if snake body already has that part, then the snake has eaten itself, thus triggering defeat
        console.log("about to be defeated")
        youAreDefeated()
    }
    return snakeBodies;
};
//----------------------------------------------------{Function for adding new apples to board}
const createApple = (snakeBodyArrays) => {
    /* ---------- If issues arise once snakes start getting longer (over 200 lengths or so) 
    then this function will need reworked to ensure that new apples are only created on grid spaces that are not occupied by the snake class
1). Use the 'for loop' that creates the initial grid, to also create an array of numbers from 0 to 624.  Then compare that array with
    the array that keeps track of the snakes body.
2). Use a new loop inside this function.  Inside the loop we will have the Math.random for apple generation, compare the result with the array of snake body, 
    if the new apple would occupy the snake, then redo it.  (This option seems like the worse of the two.  Because as the snake gets longer, the loop will begin to run more and more often because there is less space fore the apple to be created)*/
    let currentScore = document.querySelector('.actualSnakeScore');
    let currentApple = document.querySelector('.gridEachApple');
    if (currentApple === null) {
        let newApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`);
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