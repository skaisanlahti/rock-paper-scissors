/*=== App overview ===
Rock, Paper, Scissors game.
Features:
- Select random hand for computer
- Take player hand with prompt()
- Game logic to play a round and define a winner
- Play 5 rounds and track score
=============================================================================*/
let playerSelection;
let computerSelection;
let rounds = 0;
let roundCounter = 0;
let playerScore = 0;
let computerScore = 0;
/*=== Helper function to get a random array index ===
- min and max are both included in range
=============================================================================*/
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/*=== Get computer hand ===
Define hands and return a random hand.
=============================================================================*/
function computerPlay(){
    const hands = ["Rock", "Paper", "Scissors"];
    return hands[getRandomInteger(0,2)];
}
/*=== Get player hand ===
Take input with prompt(), normalize input to capitalized string.
Check if input is a valid hand.
=============================================================================*/
function playerPlay(){
    let isValidInput = false;
    let playerInput = "";
    while (!isValidInput) {
        playerInput = prompt("Choose a hand to play: rock, paper or scissors?").toLowerCase();
        playerInput = `${playerInput[0].toUpperCase()}${playerInput.slice(1)}`;
        if (playerInput === "Rock" || playerInput === "Paper" || playerInput === "Scissors")
        {
            isValidInput = true;
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
    console.log(`Player plays ${playerSelection}. Computer plays ${computerSelection}.`)
    if (computerSelection === playerSelection){
        console.log("Draw!");
    } else {
        switch (computerSelection) {
            case "Rock":
                if (playerSelection === "Paper"){
                    console.log(`Player wins!`);
                    playerScore += 1;
                } else {
                    console.log(`Computer wins!`);
                    computerScore += 1;
                }
            break;
            case "Paper" :
                if (playerSelection === "Scissors"){
                    console.log(`Player wins!`);
                    playerScore += 1;
                } else {
                    console.log(`Computer wins!`);
                    computerScore += 1;
                }
            break;
            case "Scissors" :
                if (playerSelection === "Rock"){
                    console.log(`Player wins!`);
                    playerScore += 1;
                } else {
                    console.log(`Computer wins!`);
                    computerScore += 1;
                }
            break;
            default:
                console.log(`Something went wrong.`);
        }
    }
    roundCounter += 1;
    console.log(`Round ${roundCounter} score: ${playerScore} - ${computerScore}`);
}
/*=== Play multiple rounds ===
Ask how many rounds the player wants to play. Validate input.
Play the appropriate number of rounds and announce winner at the end.
=============================================================================*/
function selectRounds(){
    let isValidInput = false;
    let roundInput = 0;
    while (!isValidInput){
        roundInput = prompt("How many rounds do you want to play?");
        if (roundInput > 0 && !isNaN(roundInput))
        {
            isValidInput = true;
        }else {
            console.log(`${roundInput} is not a valid round number. Please choose a number.`);
        }
    }
    console.log(`OK! Let's play ${rounds} rounds!`);
    return roundInput;
}
function game(){
    rounds = selectRounds();
    for (let i = 0; i < rounds; i++){
        playRound();
    }
    if (playerScore === computerScore) {
        console.log(`Game over! After ${rounds} rounds the game is a draw!`);
    }else if (playerScore > computerScore){
        console.log(`Game over! After ${rounds} rounds player wins!`);
    }else {
        console.log(`Game over! After ${rounds} rounds computer wins!`);
    }
}
/*=== Run game ===
=============================================================================*/
game();