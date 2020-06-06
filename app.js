/*=== App overview ===
Rock, Paper, Scissors game.
Specification:
- Select random hand for computer
- Select player hand with buttons
- Game logic to play a round and define a winner
- Announce winner after 5 points and reset game
=============================================================================*/

/*=== DOM Elements ===
=============================================================================*/
const roundDisplay = document.querySelector(".rps-score__round-counter");
const scoreDisplay = document.querySelector(".rps-score__points");
const logDisplay = document.querySelector(".rps-round-log");
const winnerDisplay = document.querySelector(".rps-round-log__winner");
const handButtons = Array.from(document.querySelectorAll(".rps-buttons button"));

/*=== Variables ===
=============================================================================*/
const pointsToWin = 5;
let roundCounter = 0;
let playerScore = 0;
let computerScore = 0;

/*=== Event Listeners ===
=============================================================================*/
handButtons.forEach(button => {
    if (button.textContent === "Reset") button.addEventListener("click", resetGame);
    else button.addEventListener("click", playRound);
});

/*=== Event Handlers ===
=============================================================================*/
function resetGame(){
    roundCounter = 0;
    playerScore = 0;
    computerScore = 0;
    initializeDisplays(winnerDisplay, logDisplay, roundDisplay, scoreDisplay, handButtons);
}
function playRound(){
    const playerSelection = this.textContent;
    const computerSelection = getComputerHand();
    const results = determineWinner(playerSelection, computerSelection);
    updateGameState(logDisplay, roundDisplay, scoreDisplay, results);
    checkWinConditions(winnerDisplay, handButtons, pointsToWin);
}

/*=== Functions ===
=============================================================================*/
function initializeDisplays(winnerDisplay, logDisplay, roundDisplay, scoreDisplay, handButtons){
    winnerDisplay.classList.add("invisible");
    logDisplay.textContent = `Choose a hand below to start playing. First to ${pointsToWin} points wins!`;
    roundDisplay.textContent = `1`;
    scoreDisplay.textContent = `${playerScore} - ${computerScore}`;
    handButtons.forEach(button => {
        if (button.textContent === "Reset") button.classList.add("hide");
        else button.classList.remove("hide");
    });
}
function getComputerHand(){
    const hands = ["Rock", "Paper", "Scissors"];
    return hands[getRandomInteger(0,2)];
}
function determineWinner(playerSelection, computerSelection){
    let roundLog = `Player plays ${playerSelection}. Computer plays ${computerSelection}.`;
    let winner = null;
    if (computerSelection === playerSelection){
        roundLog += ` Draw!`;
    } else {
        switch (computerSelection) {
            case "Rock":
                if (playerSelection === "Paper"){
                    winner = "Player";
                } else {
                    winner = "Computer";
                }
            break;
            case "Paper" :
                if (playerSelection === "Scissors"){
                    winner = "Player";
                } else {
                    winner = "Computer";
                }
            break;
            case "Scissors" :
                if (playerSelection === "Rock"){
                    winner = "Player";
                } else {
                    winner = "Computer";
                }
            break;
            default:
                console.log(`Something went wrong.`);
        }
        roundLog += ` ${winner} wins!`;
    }
    return {roundLog: roundLog, winner: winner}
}
function updateGameState(logDisplay, roundDisplay, scoreDisplay, results){
    if (results.winner !== null) results.winner === "Player" ? playerScore += 1 : computerScore += 1;
    roundCounter += 1;
    logDisplay.textContent = results.roundLog;
    roundDisplay.textContent = `${roundCounter}`;
    scoreDisplay.textContent = `${playerScore} - ${computerScore}`;
}
function checkWinConditions(winnerDisplay, handButtons, pointsToWin){
    if (playerScore >= pointsToWin || computerScore >= pointsToWin) {
        handButtons.forEach(button => {
            if (button.textContent === "Reset") button.classList.remove("hide");
            else button.classList.add("hide");
        });
        winnerDisplay.textContent = playerScore > computerScore ? `Player won the game!` : `Computer won the game!`;
        winnerDisplay.classList.remove("invisible");
    }
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*=== Run game ===
=============================================================================*/
resetGame();