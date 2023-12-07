//IIFE
const gameBoard = (function(){

  let grid = ['1', '2',  '3', '4',  '5', '6', '7', '8', '9' ]

  let winCode = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['3', '5', '7'],
    ['1', '5', '9']
  ]

  let boardUI = 
  `
  ${grid[0]} | ${grid[1]} | ${grid[2]} 
  ${grid[3]} | ${grid[4]} | ${grid[5]} 
  ${grid[6]} | ${grid[7]} | ${grid[8]} 
  `

 let playerOne = player('player one', 'x')
 let playerTwo = player('player two', 'o')
 
  function play() {
    let rounds = 9
    let gameEnd;

    function result(){
      if (grid.length == 0) {
        console.log('No wins. Try again')
        return gameEnd = true
      }
  
      if (playerOne.playerWin == true) {
        console.log('player one: win')
        return gameEnd = true
      }
  
      if (playerTwo.playerWin == true) {
        console.log('player two: win')
        return gameEnd = true
      }
    }

    for (let i = 0; i < rounds; i++) {

      playerOne.getCell()
      evaluateWin(playerOne)
      result()

      if(gameEnd == true) {
        break
      }

      playerTwo.getCell()
      evaluateWin(playerTwo)
      result()

      if(gameEnd == true) {
        break
      }

    }

  }

  function evaluateWin(player) {

    let playerArray = player.playerChoice
    console.log(playerArray)
    let counter = 0;

     for (let i = 0; i < winCode.length; i++) {
      let winArray = winCode[i];
      let filtered = playerArray.filter((value) => winArray.includes(value))
      
      if (winArray.length === filtered.length) {
        for (let j = 0; j < winArray.length; j++) {
          let winValue = winArray[j];
          let checkValue = filtered.some((value) => value == winValue)
          if(checkValue) {
            counter++
          }
        }
      }

      if (counter == 3) {
        return player.playerWin = true
      }

    }

  }

  return {play, evaluateWin, grid, boardUI, playerOne, playerTwo}
})();


//Player factory function
function player(name, sign) {
  let playerName = name;
  let playerSign = sign;
  let playerChoice = [];

  //function ask for users input, input passed to findMatch()
  function getCell() {
    let cell = prompt(
    `
    ${playerName}
    ${gameBoard.boardUI}
    Place your input:
     `
     )

    findMatch(cell);
  }

  //function takes 'cell' private variable. finds 'input' in gameBoard.grid which returns the first value that passes the cb function
  function findMatch(cell) {
    let match = gameBoard.grid.find(element => element == cell)
    evaluate(match)
  }

  //function takes the 'matched' value from the grid.
  function evaluate(match) {
    
    //if true, that value is pushed to playerChoice array, get the index of that value and use that index to change gameBoard.boardUI and splice() it from grid array
    if (match) {
      playerChoice.push(match)
      let index = gameBoard.grid.indexOf(match)
      gameBoard.boardUI = gameBoard.boardUI.replace(gameBoard.grid[index], `${playerSign}`)
      gameBoard.grid.splice(index, 1)
      console.log(gameBoard.boardUI)
    }

    //if false, initialize another input to 'cell' and loop to findMatch()
    if (!match) {
      alert('invalid')

      cell = prompt(
        `
        ${playerName}
        ${gameBoard.boardUI}
        Place your input:
         `
         )
      findMatch(cell)
    }
  }
  return {getCell, playerChoice , playerSign, playerName}

}

const gameSettings = (function(){

  function resetGame() {
    gameBoard.grid = ['1', '2',  '3', '4',  '5', '6', '7', '8', '9' ]

    gameBoard.playerOne.playerChoice.length = 0
    gameBoard.playerTwo.playerChoice.length = 0
    gameBoard.playerOne.playerSign = undefined
    gameBoard.playerTwo.playerSign = undefined
    gameBoard.playerOne.playerWin = undefined
    gameBoard.playerTwo.playerWin = undefined

    gameBoard.boardUI =   `
    ${gameBoard.grid[0]} | ${gameBoard.grid[1]} | ${gameBoard.grid[2]} 
    ${gameBoard.grid[3]} | ${gameBoard.grid[4]} | ${gameBoard.grid[5]} 
    ${gameBoard.grid[6]} | ${gameBoard.grid[7]} | ${gameBoard.grid[8]} 
    `
  }

  return {resetGame}
})();


const DOM = (function(){

  let cellButton = document.querySelectorAll(".cell-btn")
  let cellInput = document.querySelectorAll("input[type='hidden']")
  let input;

  cellButton.forEach((element) => {
    element.addEventListener('click', (event) => {
      return input = element.firstChild.value
    })
  })



  return {cellButton, cellInput}
})();


