window.onload = function(){
  const btnStart = document.getElementById("btnStart");
  btnStart.addEventListener("click", startGame);
  const sizePlayBoards = [3, 4, 5, 6, 7, 8];
  const playBoards = sizePlayBoards.map( playBoard => Array(playBoard*playBoard).fill(0) );
  
  function startGame(){
    const selectedSizeBoard = getRandomNumber(sizePlayBoards.length-1);
    const playMatch = new Array(...playBoards[selectedSizeBoard]);
    const numberColumns = sizePlayBoards[selectedSizeBoard];
    const resultMatch = playMatch.map(() => getRandomNumber(1));
    const resultNumberMatch = checkNumbers(resultMatch);

    function getRandomNumber(maxNum){
      return Math.round(Math.random() * maxNum);
    }
    function checkNumbers(arrayMatch){
      //rows
      const rowsBox = [];
      for(let i = 0; i < arrayMatch.length; i+=numberColumns){
        let sum = [];
        for(let j = 0; j < numberColumns; j++){
          sum.push(arrayMatch[i+j]);
        }
        rowsBox.push(sum.reduce((a, b) => a + b, 0));

      }  

      //columns
      const columnsBox = [];
      for(let i = 0; i < numberColumns; i++){
        let sum = [];
        for(let j = 0; j < arrayMatch.length; j+=numberColumns){
          sum.push( arrayMatch[i+j] );
        }
        columnsBox.push(sum.reduce((a, b) => a + b, 0));

      }

      return [rowsBox, columnsBox];

    }
    function checkBoxses(functionCheck){
        if(functionCheck.toString() == resultNumberMatch.toString()){
          setTimeout(()=>alert("Congratulations, you win!"), 200);
        }
      }
    function printBoard(){
      const gameBoard = document.getElementById("gameBoard");
      gameBoard.innerHTML = '';
      for(let i = 0; i < playMatch.length; i++){
        let liElement = document.createElement("li");
        liElement.classList.add("box");
        liElement.addEventListener("click", function(e){

         if(this.classList[1]){
            playMatch[i] = 0;
            this.classList.remove("box--checked");

          }else{
            playMatch[i] = 1;
            this.classList.add("box--checked");

          }

          checkBoxses(checkNumbers(playMatch));

        });

        gameBoard.append(liElement);

      }

      const numbersLeft = document.getElementById("numbersLeft");
      numbersLeft.innerHTML = '';
      for(let i = 0; i < resultNumberMatch[0].length; i++){
        let liElement = document.createElement("li");
        liElement.classList.add("box");
        liElement.append(resultNumberMatch[0][i]);
        numbersLeft.append(liElement);
      }

      const numbersTop = document.getElementById("numbersTop");
      numbersTop.innerHTML = '';
      for(let i = 0; i < resultNumberMatch[1].length; i++){
        let liElement = document.createElement("li");
        liElement.classList.add("box");
        liElement.append(resultNumberMatch[1][i]);
        numbersTop.append(liElement);
      }

      //addVariableStyle  
      document.documentElement.style.setProperty('--columns', numberColumns);
    }
    printBoard();
    }
  startGame();
  
};