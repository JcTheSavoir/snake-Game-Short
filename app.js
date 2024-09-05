//----------------------------------------{Variable to keep track of current score}
let scoreTracker = 0
//---------------------------------{Variable to keep track of current snake movement direction}
let snakeCurrentDirection = null;
//---------------------{Variable to assist in delaying snake movement}
let delaySnake = null;
console.log(delaySnake)

// -------------------------------------------VV---------{Create grid for game}
const generateGrid = () => {
    console.log("generateGrid started")
    let gridItself = document.querySelector('#gridItself');
    gridItself.innerHTML = "";
    for (let i = 0; i < 625; i++) {
        let gridEach = document.createElement('div')
        gridEach.setAttribute('id', `gridEach-${i}`)
        gridItself.append(gridEach)
    }
    let startSnake = document.querySelector("#gridEach-305")
    let startApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`)
    startApple.setAttribute('class', 'gridEachApple')
    startSnake.setAttribute('class', `gridEachSnake`)
    let startButton = document.querySelector('.startGame');
    startButton.innerHTML = "Restart Game"
    window.addEventListener('keydown', keydownListener)
}
//-------------------------------------------VV----------{Create listener handler for arrowkey press}
keydownListener = event => {
    const pressedKey = event.key
    const arrowKeys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
    let currentScore = document.querySelector('.actualSnakeScore')
    if(arrowKeys.includes(pressedKey)){
        console.log(pressedKey)
        event.preventDefault()
        snakeCurrentDirection = pressedKey;
        if(delaySnake === null){
            snakeMoving()
        }
        directionSnake(snakeCurrentDirection)
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        console.log(currentSnake)
        let currentApple = document.querySelector('.gridEachApple')
        if (currentApple === null) {
            let newApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`)
            newApple.setAttribute('class', 'gridEachApple')
            scoreTracker += 1
            currentScore.innerHTML = scoreTracker
        }
    }
}
//---------------------------------------------VV----------{actual listener using the keydownListener function}
const snakeMoving = () => {
    delaySnake = setInterval(() => {
        if (snakeCurrentDirection) {
            directionSnake(snakeCurrentDirection)
        }
    }, 500);
}

//-------------------------------------------VV----------{snake direction controls}
const directionSnake = (e) => {
    console.log(e)
    // ---------------------------find the element with snake class
    let findSnake = document.querySelector('.gridEachSnake')
    // -------------------------------------------Find the id of the associated snake element
    let currentSnake = findSnake ? findSnake.id: null;
    //----------------------------------------Split Id into word and number
    const splitID = currentSnake.split('-')
    //----------------------------Select the number part of the Id
    hasBeenSplit = splitID[1];
    //-------------------------------Ensures we are working with number and not a string
    changeToNumber = hasBeenSplit * 1

    switch (e) {
        case "ArrowUp":
             //-------------------------Depending on the direction, change Id to match corresponding new block
             newId = changeToNumber - 25
             console.log(newId)
            break;
        case "ArrowDown":
            newId = changeToNumber + 25
            console.log(newId)
            break;
        case "ArrowRight":
            newId = changeToNumber + 1
            console.log(newId)
            break;
        case "ArrowLeft":
            newId = changeToNumber - 1
            console.log(newId)
            break;                    
    };
    //----------------------Checks to see if the movement would lead to defeat
    console.log(checkForDefeat(changeToNumber, newId))
    //-------------------------------------select element with the new Id
    let newSnake = document.querySelector(`#gridEach-${newId}`)
    //---------------------------------------------add the Snake class to the element
    newSnake.setAttribute('class', `gridEachSnake`)
    //-------------------------Check if a new element needs the snake class
    // findSnake.classList.remove('gridEachSnake')
    checkToAddSnake(findSnake)
}



//-------------------------------------VV--------------{check if new snake is needed}
const checkToAddSnake = (theSnake) => {
    const snakeLength = document.querySelectorAll('.gridEachSnake').length
    let currentLength = document.querySelector('.actualSnakeLength')
    
    if ((snakeLength - scoreTracker) - 1 === 0 || scoreTracker > (snakeLength + 2)) {
        theSnake.classList.remove('gridEachSnake')  //--comment out this line to allow snake to grow
        const snakeLength = document.querySelectorAll('.gridEachSnake').length
        console.log(`The number of snakes is ${snakeLength}`)
        currentLength.innerHTML = snakeLength
    }else{
        theSnake.classList.remove('gridEachSnake')
    }
}

const checkForDefeat = (a, b) => {
        const fakeArray = []
    if (b > 624 || b < 0) {
        youAreDefeated()
        return true;
    }
        const defeatArrayLeft = [0] 
        const defeatArrayRight = [24]
    for (let i = 0; i < 24; i++) {
        //--------have array with all instances of defeat if moving left to right
        const lastIndexLeft = defeatArrayLeft.length - 1;
        const lastElementArrayLeft = defeatArrayLeft[lastIndexLeft]
        defeatArrayLeft.push(lastElementArrayLeft + 25)
        //--------have array with all instances of defeat if moving right to left
        const lastIndexRight = defeatArrayRight.length - 1;
        const lastElementArrayRight = defeatArrayRight[lastIndexRight]
        defeatArrayRight.push(lastElementArrayRight + 25)
        if ((defeatArrayLeft.includes(a) && defeatArrayRight.includes(b)) || (defeatArrayRight.includes(a) && defeatArrayLeft.includes(b))) {
            youAreDefeated()
            return false
        }
    }
    return true
}

//-----------------------------------------------------{Function for defeat}
const youAreDefeated = () => {
    alert("That Path Lead to your Defeat")
    let startButton = document.querySelector('.startGame');
    startButton.innerHTML = "Try Again?"
    window.removeEventListener('keydown', keydownListener)
    clearInterval(delaySnake)
    delaySnake = null;
}
