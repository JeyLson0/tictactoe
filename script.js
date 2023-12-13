//IIFE
let DOM = (function(){
  let cellButton = document.querySelectorAll(".cell-btn");
  let cellInput = document.querySelectorAll("input[type='hidden']");
  let imgPlayerContainer = document.querySelectorAll("img[alt='playerSign']");
  let playerNotif = document.querySelector(".player-notification");
  const playButton = document.querySelector(".UI-button");
  const dbCross50 = "assets/imgs/db-cross-50.svg";
  const dbCircle50 = "assets/imgs/db-circle-50.svg";
  const dbCross = "assets/imgs/db-cross.svg";
  const dbCircle = "assets/imgs/db-circle.svg";
  const dbCrossWin = "assets/imgs/db-cross-win.svg";
  const dbCircleWin = "assets/imgs/db-circle-win.svg";


  return {
    cellButton,
    cellInput, 
    dbCross50, 
    dbCircle50, 
    dbCross, 
    dbCircle, 
    dbCrossWin, 
    dbCircleWin, 
    imgPlayerContainer,
    playButton,
    playerNotif
  }
})();


const gameBoard = (function(){

  let grid = ['1', '2',  '3', '4',  '5', '6', '7', '8', '9' ];
  let gameStatus = true;
  let winCode = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['3', '5', '7'],
    ['1', '5', '9']
  ];

  let boardUI = 
  `
  ${grid[0]} | ${grid[1]} | ${grid[2]} 
  ${grid[3]} | ${grid[4]} | ${grid[5]} 
  ${grid[6]} | ${grid[7]} | ${grid[8]} 
  `
  let rounds = 0;

 let playerOne = player('Player X', 'x', DOM.dbCross50, DOM.dbCross, DOM.dbCrossWin)
 let playerTwo = player('Player O', 'o', DOM.dbCircle50, DOM.dbCircle, DOM.dbCircleWin)
 
 
  function result(){
    ++rounds
    if (playerOne.playerWin == true) {
      DOM.playerNotif.textContent = `${playerOne.playerName} Win!`
      DOM.playButton.setAttribute('value', 'Try Again')
      DOM.playButton.classList.remove('disabled')
      DOM.playButton.removeEventListener('click', gameSettings.startGame)
      DOM.playButton.addEventListener('click', gameSettings.resetGame)
      return rounds = 0;
    }

    if (playerTwo.playerWin == true) {
      DOM.playerNotif.textContent = `${playerTwo.playerName} Win!`
      DOM.playButton.setAttribute('value', 'Try Again')
      DOM.playButton.classList.remove('disabled')
      DOM.playButton.removeEventListener('click', gameSettings.startGame)
      DOM.playButton.addEventListener('click', gameSettings.resetGame)
      return rounds = 0;
    }

    if (rounds == 9) {
      DOM.playerNotif.textContent = 'No wins. Try again'
      DOM.playButton.setAttribute('value', 'Try Again')
      DOM.playButton.classList.remove('disabled')
      DOM.playButton.removeEventListener('click', gameSettings.startGame)
      DOM.playButton.addEventListener('click', gameSettings.resetGame)
      return rounds = 0;
    }

  }

  return {result, grid, boardUI, playerOne, playerTwo, winCode, gameStatus}
})();


const gameSettings = (function(){

  function resetGame() {
    gameBoard.grid = ['1', '2',  '3', '4',  '5', '6', '7', '8', '9' ];

    gameBoard.playerOne.playerChoice.length = 0;
    gameBoard.playerTwo.playerChoice.length = 0;
    gameBoard.gameStatus = true;
  

    if(gameBoard.playerOne.playerWin) {
      gameBoard.playerTwo.getCell()
    }
    
    if(gameBoard.playerTwo.playerWin) {
      gameBoard.playerOne.getCell()
    }

    gameBoard.playerOne.playerWin = false
    gameBoard.playerTwo.playerWin = false

    gameBoard.boardUI =   `
    ${gameBoard.grid[0]} | ${gameBoard.grid[1]} | ${gameBoard.grid[2]} 
    ${gameBoard.grid[3]} | ${gameBoard.grid[4]} | ${gameBoard.grid[5]} 
    ${gameBoard.grid[6]} | ${gameBoard.grid[7]} | ${gameBoard.grid[8]} 
    `

    DOM.imgPlayerContainer.forEach((element) => {
      element.setAttribute('src', '')
      element.className = 'unassigned-cell'
    })

    DOM.playButton.classList.add('disabled')

  }


  function switchPlayer(sign) {
    //switch to playertwo
    if(sign == 'x') {
      gameBoard.playerTwo.getCell()
    }

    //switch to playerOne
    if(sign == 'o') {
      gameBoard.playerOne.getCell()
    }
  }

  function startGame(){
    gameBoard.playerOne.getCell()
    DOM.playButton.classList.add('disabled')
  }

  DOM.playButton.addEventListener('click', startGame)

  return {resetGame, switchPlayer, startGame}
})();



//Player factory function
function player(name, sign, hover, playerImg, playerImgWin) {
  let playerName = name;
  let playerSign = sign;
  let hoverUI = hover;
  let imgSign = playerImg
  let imgSignWin = playerImgWin
  let playerChoice = [];
  let playerWin;
  let playerObj; //reference to specific player obj

  function getCell() {
    DOM.playerNotif.textContent = `${playerName} Turn`
    if(gameBoard.gameStatus == false){
      return console.log('game ended')
    }

    if(gameBoard.gameStatus == true) {
      DOM.cellButton.forEach(element => {
        playerObj = this;
        element.addEventListener('click', getDOMInput)
        element.addEventListener('mouseover', hoverCell)
        element.addEventListener('mouseout', hoverOutCell)
      });
    }
    
  }

  function hoverOutCell() {
    let imgContainer = this.children[1];
    if (imgContainer.className == 'assigned-cell') {
      return 
    } else {
      imgContainer.setAttribute('src', '')
    }

  }

  function hoverCell(){

    let imgContainer = this.children[1];
    if (imgContainer.className == 'assigned-cell')  {
      return 
    } else {
      imgContainer.setAttribute('src', hoverUI)
    }

  }

  function getDOMInput() {
    let cell = this.firstElementChild.value;
    findMatch(cell); 
  }

  function findMatch(cell) {
    let match = gameBoard.grid.find(element => element == cell)
    evaluate(match)
  }

  function evaluate(match) {
    
    if (match) {
      playerObj.playerChoice.push(match)
      let index = gameBoard.grid.indexOf(match)
      let DOMIndex = match - 1
      gameBoard.boardUI = gameBoard.boardUI.replace(gameBoard.grid[index], `${playerSign}`)
      gameBoard.grid.splice(index, 1)

      DOM.imgPlayerContainer[DOMIndex].setAttribute('src', imgSign)
      DOM.imgPlayerContainer[DOMIndex].className = 'assigned-cell'
        
      evaluateWin()
      gameBoard.result()
    
      DOM.cellButton.forEach(element => {
        element.removeEventListener('click', getDOMInput)
        element.removeEventListener('mouseover', hoverCell)
        element.removeEventListener('mouseout', hoverOutCell)
      });

      if (playerObj.playerWin == false || playerObj.playerWin == undefined) {
        gameSettings.switchPlayer(playerObj.playerSign)
      } 
      
    }

    if (!match) {
      alert('Place has been taken')
      return
    }

  }

  function evaluateWin() {
    let playerArray = playerObj.playerChoice
    let counter = 0;

    for (let i = 0; i < gameBoard.winCode.length; i++) {
      let winArray = gameBoard.winCode[i];
      let filtered = playerArray.filter((value) => winArray.includes(value))
      
      if (winArray.length == filtered.length) {
        for (let j = 0; j < winArray.length; j++) {
          let winValue = winArray[j];
          let checkValue = filtered.some((value) => value == winValue)
          DOM.imgPlayerContainer[winValue-1].setAttribute('src', imgSignWin)
          if(checkValue) {
            counter++
          }
        }
      }

    

    }

    if (counter >= 3) {
      playerObj.playerWin = true
    }

  }


  return {getCell, playerChoice , playerSign, playerName, playerWin}

}




