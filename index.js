 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");

 let currentPlayer;
 let gameGrid;

 // 012, 345, 678, 036, 147, 258, 048, 246
 const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // ui pay bhi empty kerna hoga 
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; 
        //one more thing is missing 
        boxes[index].classList.remove("win");
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();
boxes.forEach((box, index) =>{
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});


function checkGameOver(){
    let answer =""; 
    for(let i=0;i<winningPositions.length;i++){
            if( (gameGrid[winningPositions[i][0]]!=="" || gameGrid[winningPositions[i][1]]!=="" || gameGrid[winningPositions[i][2]]!=="") 
            && (gameGrid[winningPositions[i][0]]===gameGrid[winningPositions[i][1]]) && (gameGrid[winningPositions[i][1]]===gameGrid[winningPositions[i][2]])){
                answer=gameGrid[winningPositions[i][2]];
                boxes[winningPositions[i][0]].classList.add("win");
                boxes[winningPositions[i][1]].classList.add("win");
                boxes[winningPositions[i][2]].classList.add("win");
                

            }
        }
        if(answer!==""){
            gameInfo.innerText = `Winner-${answer}`;
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";});
                newGameBtn.classList.add("active");
            return ;
        }
        
        // let check the tie
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if(box!==""){
                fillCount++;
            }
        });
        if(fillCount===9){
            gameInfo.innerText ="Game Tied !";
            newGameBtn.classList.add("active");
            return ;
        }


}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X"
    }
    // ui update 
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap kero turn ko 
        swapTurn();
        checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);




