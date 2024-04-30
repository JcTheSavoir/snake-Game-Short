//-------------------------------------------VV----------{Create listener for arrowkey press}
let scoreTracker = 0
window.addEventListener('keydown', event => {
    // let currentApple = document.querySelector('.gridEachApple')
    const pressedKey = event.key
    const arrowKeys = [" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
    let currentScore = document.querySelector('.actualSnakeScore')
    if(arrowKeys.includes(pressedKey)){
        console.log(pressedKey)
        event.preventDefault()
        directionSnake(pressedKey)
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
})



// -------------------------------------------VV---------{Create grid for game}
const generateGrid = () => {
    let gridItself = document.querySelector('#gridItself');
    gridItself.innerHTML = "";
    let currentScore = document.querySelector('.actualSnakeScore')
    currentScore.innerHTML = "";
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
}


//-------------------------------------------VV----------{snake direction controls}
const directionSnake = (e) => {
    if (e == "ArrowUp") {
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
        //-------------------------Depending on the direction, change Id to match corresponding new block
        newId = changeToNumber - 25
        console.log(newId)
        //----------------------Checks to see if the movement would lead to defeat
        console.log(checkForDefeat(changeToNumber, newId))
        //-------------------------------------select element with the new Id
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        //---------------------------------------------add the Snake class to the element
        newSnake.setAttribute('class', `gridEachSnake`)
        //-------------------------Check if a new element needs the snake class
        findSnake.classList.remove('gridEachSnake')
        // checkToAddSnake(findSnake)
    } else if (e == "ArrowDown"){
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        const splitID = currentSnake.split('-')
        hasBeenSplit = splitID[1];
        changeToNumber = hasBeenSplit * 1
        newId = changeToNumber + 25
        checkForDefeat(changeToNumber, newId)
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        newSnake.setAttribute('class', `gridEachSnake`)
        findSnake.classList.remove('gridEachSnake')
        // checkToAddSnake(findSnake)
    } else if (e == "ArrowRight") {
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        const splitID = currentSnake.split('-')
        hasBeenSplit = splitID[1];
        changeToNumber = hasBeenSplit * 1
        newId = changeToNumber + 1
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        if (checkForDefeat(changeToNumber, newId)) {
            newSnake.setAttribute('class', `gridEachSnake`)
        } else {
            findSnake.classList.remove('gridEachSnake')
            console.log("snake has hit a wall, time to reset")
        }
        findSnake.classList.remove('gridEachSnake')
        // checkToAddSnake(findSnake)
    } else if (e == "ArrowLeft") {
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        const splitID = currentSnake.split('-')
        hasBeenSplit = splitID[1];
        changeToNumber = hasBeenSplit * 1
        newId = changeToNumber - 1
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        if (checkForDefeat(changeToNumber, newId)) {
            newSnake.setAttribute('class', `gridEachSnake`)
        } else {
            findSnake.classList.remove('gridEachSnake')
            console.log("snake has hit a wall, time to reset")
        }
        findSnake.classList.remove('gridEachSnake')
        // checkToAddSnake(findSnake)
    }
}



//-------------------------------------VV--------------{check if new snake is needed}
const checkToAddSnake = (theSnake) => {
    const allSnakes = document.querySelectorAll('.gridEachSnake').length
    if ((allSnakes - scoreTracker) - 1 === 0 || scoreTracker > (allSnakes + 2)) {
        console.log(`The number of snakes is ${allSnakes}`)
        theSnake.classList.remove('gridEachSnake')
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
        //have array with all instances of defeat if moving left to right
        const lastIndexLeft = defeatArrayLeft.length - 1;
        const lastElementArrayLeft = defeatArrayLeft[lastIndexLeft]
        defeatArrayLeft.push(lastElementArrayLeft + 25)
        //have array with all instances of defeat if moving right to left
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
    generateGrid()
    // return 
}
