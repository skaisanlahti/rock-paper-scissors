/*=== App overview ===
Rock, Paper, Scissors game.
Specification:
- Select random hand for computer
- Select player hand with buttons
- Game logic to play a round and define a winner
- Announce winner after 5 points and reset game
=============================================================================*/

/*=== Variables ===
=============================================================================*/
const pointsToWin = 5;
let playerSelection;
let computerSelection;
let roundCounter = 0;
let playerScore = 0;
let computerScore = 0;
let roundLog = "";

/*=== DOM Elements ===
=============================================================================*/
const roundDisplay = document.querySelector(".rps-score__round");
const scoreDisplay = document.querySelector(".rps-score__points");
const logDisplay = document.querySelector(".rps-round-log");
const winnerDisplay = document.querySelector(".rps-round-log__winner");
const handButtons = Array.from(document.querySelectorAll(".rps-buttons button"));

/*=== Event Listeners ===
=============================================================================*/
handButtons.forEach(button => {
    if (button.textContent === "Reset") button.addEventListener("click", resetGame);
    else button.addEventListener("click", playRound);
});

/*=== Reset Game ===
=============================================================================*/
function resetGame(){
    roundCounter = 0;
    playerScore = 0;
    computerScore = 0;
    winnerDisplay.classList.add("invisible");
    logDisplay.textContent = `Choose a hand below to start playing. First to ${pointsToWin} points wins!`;
    roundDisplay.textContent = `Round 1`;
    scoreDisplay.textContent = `Player ${playerScore} - ${computerScore} Computer`;
    handButtons.forEach(button => {
        if (button.textContent === "Reset") button.classList.add("hide");
        else button.classList.remove("hide");
    });
}

/*=== Helper function to get a random array index ===
min and max are both included in range
=============================================================================*/
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*=== Get computer hand ===
=============================================================================*/
function computerPlay(){
    const hands = ["Rock", "Paper", "Scissors"];
    return hands[getRandomInteger(0,2)];
}

/*=== Game logic ===
- Select hands
- Determine winner
- Update displays
- Check win conditions
=============================================================================*/
function playRound(){
    playerSelection = this.textContent;
    computerSelection = computerPlay();
    determineWinner(playerSelection, computerSelection);
    updateDisplays();
    checkWinConditions();
}

function determineWinner(playerSelection, computerSelection){
    roundLog = `Player plays ${playerSelection}. Computer plays ${computerSelection}.`;
    if (computerSelection === playerSelection){
        roundLog += ` Draw!`;
    } else {
        switch (computerSelection) {
            case "Rock":
                if (playerSelection === "Paper"){
                    roundLog += ` Player wins!`;
                    playerScore += 1;
                } else {
                    roundLog += ` Computer wins!`;
                    computerScore += 1;
                }
            break;
            case "Paper" :
                if (playerSelection === "Scissors"){
                    roundLog += ` Player wins!`;
                    playerScore += 1;
                } else {
                    roundLog += ` Computer wins!`;
                    computerScore += 1;
                }
            break;
            case "Scissors" :
                if (playerSelection === "Rock"){
                    roundLog += ` Player wins!`;
                    playerScore += 1;
                } else {
                    roundLog += ` Computer wins!`;
                    computerScore += 1;
                }
            break;
            default:
                console.log(`Something went wrong.`);
        }
    }
    roundCounter += 1;
}

function updateDisplays(){
    logDisplay.textContent = roundLog;
    roundDisplay.textContent = `Round ${roundCounter}`;
    scoreDisplay.textContent = `Player ${playerScore} - ${computerScore} Computer`;
}

function checkWinConditions(){
    if (playerScore >= pointsToWin || computerScore >= pointsToWin) {
        handButtons.forEach(button => {
            if (button.textContent === "Reset") button.classList.remove("hide");
            else button.classList.add("hide");
        });
        winnerDisplay.textContent = playerScore > computerScore ? `Player won the game!` : `Computer won the game!`;
        winnerDisplay.classList.remove("invisible");
    }
}

/*=== Run game ===
=============================================================================*/
resetGame();