//winning conditions
let winGame = [
    [0,1,2],[3,4,5],[6,7,8],    //rows
    [0,3,6],[1,4,7],[2,5,8],    //columns
    [0,4,8],[2,4,6]    //diagonal
];

let chances = 0;    //means that nobody has played yet

let score_X = 0;    //initially
let score_O = 0;    //initially

//Scores: -
let score_of_X = document.getElementById("scoreX");
let score_of_O = document.getElementById("scoreO");
let teams = document.getElementById("team_name");

score_of_X.innerText = score_X; 
score_of_O.innerText = score_O;

let X_turn = true;  //assuming that it is X's turn

let gameOver = false;    //assuming that the game is not over

//selecting the buttons [querySelectorAll works with forEach()]
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
    box.addEventListener("click", () => {
    
    if(gameOver)
        return;

    if(box.innerText !== "")    //1 box click is restricted to 1 time.
        return;

    if(X_turn === true)    //when it is X's turn
    {
        console.log("X");
        box.innerText = "X";
        box.style.color = "red";
        box.style.fontWeight = "bold";
        chances++;
        X_turn = false;  
    }
    else    //when it is O's turn
    {
        console.log("O");
        box.innerText = "O";
        box.style.color = "lime";
        box.style.fontWeight = "bold";
        chances++;
        X_turn = true;
    }
    checkingWinner();
    });
});    //Problems: 
       // i. 1 box is getting clicked many times -> limit it to 1 time. (Solved)
       // ii. the box needs to print either X or O. (Solved)
       // iii. players are able to play even after the winning conditions being satisfied.
       //      (solved)

let win_declare = document.getElementById("winMessage");    //Win declaration

//Checking the winner: -
let checkingWinner = () => {
    let winnerFound = false;

    for(let patterns of winGame)
    {
        let valueLine1 = boxes[patterns[0]].innerText;
        let valueLine2 = boxes[patterns[1]].innerText;
        let valueLine3 = boxes[patterns[2]].innerText;

        if(valueLine1 !== "" && valueLine2 !== "" && valueLine3 !== "")
        {
            if(valueLine1 === valueLine2 && valueLine2 === valueLine3)
            {
                console.log(valueLine1 + " is the Winner!");
                win_declare.innerText = valueLine1 + " is the Winner!🎉";
                winnerFound = true;
                gameOver = true;

                //Highlighting the Winning Pattern 
                boxes[patterns[0]].style.backgroundColor = "yellow";
                boxes[patterns[1]].style.backgroundColor = "yellow";
                boxes[patterns[2]].style.backgroundColor = "yellow";

                if(valueLine1 === "X")
                {
                    score_X++;    //Increments the score of X if it is the Winner
                    console.log(score_X);
                    score_of_X.innerText = score_X;
                }
                else
                {
                    score_O++;    //Increments the score of O if it is the Winner
                    console.log(score_O);
                    score_of_O.innerText = score_O;
                }
                boardDisable();
                return;       
            }
        }
    }
    if(chances === 9 && winnerFound === false)
    {
        console.log("It's a draw!");
        win_declare.innerText = "It's a draw!🤝";
        gameOver = true;
        boardDisable();
        return;
    }
}

//Disabling the board: -
let boardDisable = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Game Reset (only the board, not the scores)
let reset = document.getElementById("resetButton");

const resetGame = () => {
    boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "aliceblue";
});

X_turn = true;
chances = 0;
win_declare.innerText = "";
gameOver = false;
}

reset.addEventListener("click",resetGame);

//night mode
let body = document.getElementById("body");
let nightMode = document.getElementById("nightMode");

let night = false;
nightMode.addEventListener("click", () => {
    if(!night)
    {
        night = true;
        body.style.backgroundColor = "black";
        nightMode.innerText = "Night Mode: ON";
        score_of_X.style.color = "yellow";
        score_of_O.style.color = "yellow";
        teams.style.color = "yellow";
        win_declare.style.color = "yellow";

        boxes.forEach((box) => {
            box.style.boxShadow = "0px 4px 10px rgb(0, 8, 255)";
        })
    }
    else
    {
        night = false;
        nightMode.innerText = "Night Mode: OFF";
        body.style.backgroundColor = "#44E5E7";
        score_of_X.style.color = "black";
        score_of_O.style.color = "black";
        teams.style.color = "black";
        win_declare.style.color = "black";

        boxes.forEach((box) => {
            box.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.35)";
        })
    }
});