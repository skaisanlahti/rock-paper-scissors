/*=== App overview ===
Rock, Paper, Scissors game.
Specification:
- Select random hand for computer
- Take player hand with prompt()
- Game logic to play a round and define a winner
- Select how many rounds the player wants to play and play them
=============================================================================*/
let playerSelection;
let computerSelection;
let rounds = 0;
let roundCounter = 0;
let playerScore = 0;
let computerScore = 0;
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
/*=== Get player hand ===
=============================================================================*/
function playerPlay(){
    let inputIsValid = false;
    let playerInput = "";
    while (!inputIsValid) {
        playerInput = prompt("Choose a hand to play: rock, paper or scissors?").toLowerCase();
        playerInput = `${playerInput[0].toUpperCase()}${playerInput.slice(1)}`;
        if (playerInput === "Rock" || playerInput === "Paper" || playerInput === "Scissors")
        {
            inputIsValid = true;
        } else {
            console.log(`${playerInput} is not a valid hand! Please choose "rock", "paper" or "scissors".`);
        }
    }
    return playerInput;
}
/*=== Game logic ===
- Select hands
- Define winner
- Calculate points
=============================================================================*/
function playRound(computerSelection, playerSelection){
    playerSelection = playerPlay();
    computerSelection = computerPlay();
    let roundLog = `Player plays ${playerSelection}. Computer plays ${computerSelection}.`;
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
    console.log(roundLog);
    roundCounter += 1;
    console.log(`Round ${roundCounter} - Score: Player ${playerScore} - Computer ${computerScore}`);
}
/*=== Play multiple rounds ===
=============================================================================*/
function selectRounds(){
    let inputIsValid = false;
    let roundInput = 0;
    while (!inputIsValid){
        roundInput = prompt("How many rounds do you want to play?");
        if (roundInput > 0 && !isNaN(roundInput))
        {
            inputIsValid = true;
        }else {
            console.log(`${roundInput} is not a valid round number. Please choose a number higher than 0.`);
        }
    }
    console.log(`OK! Let's play ${roundInput} rounds!`);
    return roundInput;
}
function game(){
    rounds = selectRounds();
    for (let i = 0; i < rounds; i++){
        playRound();
    }
    if (playerScore === computerScore) {
        console.log(`Game over! The game is a draw!`);
    }else if (playerScore > computerScore){
        console.log(`Game over! Player wins!`);
    }else {
        console.log(`Game over! Computer wins!`);
    }
}
/*=== Run game ===
=============================================================================*/
game();