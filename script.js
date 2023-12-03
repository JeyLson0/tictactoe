//IIFE
const gameBoard = (function(){

  let grid = [
    'a1', 
    'a2', 
    'a3', 
    'b1', 
    'b2', 
    'b3', 
    'c1', 
    'c2', 
    'c3'
  ]

  let winCode = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
  ]

  let boardUI = 
  `
  ${grid[0]} | ${grid[1]} | ${grid[2]} 
  ${grid[3]} | ${grid[4]} | ${grid[5]} 
  ${grid[6]} | ${grid[7]} | ${grid[8]} 
  `

 let playerOne = player('player one:', 'x', 'player')
 let playerTwo = player('player two', 'o', 'player')
 
  function play() {
    let rounds = 9

    for (let i = 0; i < rounds; i++) {
      playerOne.getCell()
      evaluateWin(playerOne)

      if (playerOne.playerStatus == true) {
        return console.log('player one: win')
      }

      playerTwo.getCell()
      evaluateWin(playerTwo)

      if (playerTwo.playerStatus == true) {
        return console.log('player two: win')
      }
    }
    

  }

  function evaluateWin(player) {
    let playerArray = player.playerChoice
    console.log(playerArray)
    let counter = 0;

    for (let i = 0; i < winCode.length; i++) {
      let winArray = winCode[i];
      /* console.log(winArray) */
      let filtered = playerArray.filter((value) => winArray.includes(value))
      /* console.log(filtered) */
      
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
        return player.playerStatus = true
      }

    }

  }


  return {play, evaluateWin, grid, boardUI, playerOne, playerTwo}
})();







//factory function
function player(name, sign, status) {
  let playerName = name;
  let playerSign = sign;
  let playerChoice = [];
  let playerStatus = status;
  let cell;
  let match;

  function declareSign(sign) {
    if(sign == 'x' || sign == 'X') {
      this.playerSign = 'x'
      return console.log(this.playerSign)
    }
    if(sign == 'o' || sign == 'O') {
      this.playerSign = 'o'
      return console.log(this.playerSign)
    }
    if (sign != 'o' || sign != 'x') {
      this.playerSign = undefined
      return console.log('Error: please choose between x or o')
    }
  }

  function declareStatus(stat) {
    if (stat == 'player') {
      this.playerStatus = 'player';
      return console.log(`status set to 'player' `)
    }
    if (stat == 'comp') {
      this.playerStatus = 'player';
      return console.log(`status set to 'computer' `)
    }
    if (stat != 'comp' || stat != 'player') {
      return console.log('Error status')
    }
  }

  function getCell() {
    cell = prompt(
    `
    ${playerName}
    ${gameBoard.boardUI}
    Place your input:
     `
     )

    findMatch();
  }

  function findMatch() {
    match = gameBoard.grid.find(element => element == cell)
    if (cell == null) {
      return
    }
    evaluate()
  }

  function evaluate() {
    if (match) {
      playerChoice.push(match)
      let index = gameBoard.grid.indexOf(match)
      gameBoard.boardUI = gameBoard.boardUI.replace(gameBoard.grid[index], ` ${playerSign}`)
      gameBoard.grid.splice(index, 1)
      console.log(gameBoard.boardUI)
    }

    if (!match) {
      alert('invalid')

      cell = prompt(
        `
        ${playerName}
        ${gameBoard.boardUI}
        Place your input:
         `
         )
         
      if (cell == null) {
        return
      }
      findMatch()
    }
  }
  

  return {declareSign, declareStatus, getCell, playerChoice, playerStatus, playerSign, playerName}

}


const gameSettings = (function(){

  let playerPropError;

  function checkPlayer(player) {
    for (const property in player) {
      if (player[property] == undefined) {
        playerPropError = true;
        return console.log(`please set ${property} property on  playerName ${player.playerName}`)
      }
    }
  }




  return {checkPlayer, playerPropError}

})();




