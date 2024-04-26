//Create listener for arrowkey press
window.addEventListener('keydown', event => {
    const pressedKey = event.key
    const arrowKeys = [" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
    if(arrowKeys.includes(pressedKey)){
        console.log(pressedKey)
        event.preventDefault()
        return pressedKey
    }
})
// console.log(pressedKey)

// Create grid for game 
const generateGrid = () => {
    let gridItself = document.querySelector('#gridItself');
    gridItself.innerHTML = "";
    
    
    for (let i = 0; i < 625; i++) {
        let gridEach = document.createElement('div')
        gridEach.setAttribute('class', `gridEach${i}`)
        gridItself.append(gridEach)
    }
    let startSnake = document.querySelector(".gridEach305")
    let startApple = document.querySelector(`.gridEach${Math.floor(Math.random() * 626)}`)
    startApple.setAttribute('class', 'gridEachApple')
    startSnake.setAttribute('class', `gridEachSnake`)
    let startButton = document.querySelector('.startGame');
    startButton.innerHTML = "Restart Game"
}


//Controlling Snake control

const controlSnake = (e) => {
    start
}