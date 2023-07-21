const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
//This will keep track of whose turn is it. 
let circleTurn //It start with false

startGame()

restartButton.addEventListener('click', startGame)

//At first when start the game there is no hover effect and this function help the hover effect to show up
function startGame(){
    circle = false
    //Once one of the cell is clicked, it cant be click again
    //In other word, it will ever fire just once and not going to fire again
    cellElements.forEach(cell=>{
        //This will remove all the previous play of X and O to start a new game
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    //We have to get our target so whatever cell we clicked is going to be here
    const cell = e.target
    //if it is circle turn, we will return circle class if not we will return x class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placemark
    placeMark(cell, currentClass)
    //check for win
    if(checkWinner(currentClass)){
        endGame(false)
    }
    //check for draw
    else if(isDraw()){
        endGame(true)
    }
    else{
        //switch turns
        swapTurns()
        //We want to do this after swapTurns because we want to know whose turn is it
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        //When someone is winning, this will print out the text
        winningMessageTextElement.innerText = `${circleTurn ? "O's":"X's"} Wins!`
    }
    //This is going to show us the winning message element
    winningMessageElement.classList.add('show')
}

function isDraw(){ 
    //The cellElements does not have in every method 
    //What we can do is d structure the cell into a array so that it will have the method
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    //Making sure that there will be no class in it
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

//What this functin is doing is checking to see if there is some winning combination that match the current combination
function checkWinner(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        //We want to make sure that every element has the same class
        // so if the currentClass is in all three of the element combination then we found a winning
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}