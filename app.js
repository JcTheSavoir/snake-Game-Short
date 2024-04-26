//Create listener for arrowkey press
let scoreTracker = 0
window.addEventListener('keydown', event => {
    let currentApple = document.querySelector('.gridEachApple')
    const pressedKey = event.key
    const arrowKeys = [" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
    let currentScore = document.querySelector('.actualSnakeScore')
    if(arrowKeys.includes(pressedKey)){

        console.log(pressedKey)
        event.preventDefault()
        controlSnake(pressedKey)
        console.log(currentApple)
        if (currentApple === null) {
            let newApple = document.querySelector(`#gridEach-${Math.floor(Math.random() * 626)}`)
            newApple.setAttribute('class', 'gridEachApple')
            scoreTracker += 1
            currentScore.innerHTML = scoreTracker

        }
    }
})
// console.log(pressedKey)

// Create grid for game 
const generateGrid = () => {
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
}


//Controlling Snake control
const controlSnake = (e) => {
    if (e == "ArrowUp") {
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        // console.log(currentSnake)
        const splitID = currentSnake.split('-')
        // console.log(splitID[1])
        hasBeenSplit = splitID[1];
        newId = hasBeenSplit - 25
        // console.log(newId)
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        newSnake.setAttribute('class', `gridEachSnake`)
        findSnake.classList.remove('gridEachSnake')
    } else if (e == "ArrowDown"){
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        // console.log(currentSnake)
        const splitID = currentSnake.split('-')
        // console.log(splitID[1])
        hasBeenSplit = splitID[1];
        newId = (hasBeenSplit * 1) + 25
        // console.log(newId)
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        newSnake.setAttribute('class', `gridEachSnake`)
        findSnake.classList.remove('gridEachSnake')
    } else if (e == "ArrowRight") {
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        // console.log(currentSnake)
        const splitID = currentSnake.split('-')
        // console.log(splitID[1])
        hasBeenSplit = splitID[1];
        newId = (hasBeenSplit * 1) + 1
        // console.log(newId)
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        newSnake.setAttribute('class', `gridEachSnake`)
        findSnake.classList.remove('gridEachSnake')
    } else if (e == "ArrowLeft") {
        let findSnake = document.querySelector('.gridEachSnake')
        let currentSnake = findSnake ? findSnake.id: null;
        // console.log(currentSnake)
        const splitID = currentSnake.split('-')
        // console.log(splitID[1])
        hasBeenSplit = splitID[1];
        newId = hasBeenSplit - 1
        // console.log(newId)
        let newSnake = document.querySelector(`#gridEach-${newId}`)
        newSnake.setAttribute('class', `gridEachSnake`)
        findSnake.classList.remove('gridEachSnake')
    }
}
