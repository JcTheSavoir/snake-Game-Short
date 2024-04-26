//Create listener for arrowkey press
window.addEventListener('keydown', event => {
    const pressedKey = event.key
    const arrowKeys = [" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
    if(arrowKeys.includes(pressedKey)){
        console.log(pressedKey)
        event.preventDefault()
    }
    return pressedKey
})

// Create grid for game 
const generateGrid = () => {
    let gridItself = document.querySelector('#gridItself');
    let startButton = document.querySelector('.startGame');
    gridItself.innerHTML = "";
    console.log("hello")
    for (let i = 0; i < 625; i++) {
        let gridEach = document.createElement('div')
        gridEach.setAttribute('class', `gridEach${i}`)
        gridItself.append(gridEach)
    }
    startButton.innerHTML = "Restart Game"
}

