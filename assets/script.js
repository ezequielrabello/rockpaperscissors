// variables
var choices = window.document.querySelector(".buttons-group")
var userChoice = window.document.querySelector(".user-choice")
var houseChoice = window.document.querySelector(".house-choice")
var modalContainer = window.document.querySelector(".modalContainer")
var fight = window.document.querySelector(".fight")
var rules = window.document.querySelector("button.rulesBtn")
var closeModal = window.document.querySelector("button.modal-close-btn")
var playAgain = window.document.querySelector("button.play-again")
var main = window.document.querySelector("main")
var results = window.document.querySelector("#result-label")
var score = window.document.querySelector("#score")
var points = 0
var list = ["Rock", "Paper", "Scissors"]

//toggle functions
function toggleModal() {
    main.classList.toggle("modal-on")
    modalContainer.classList.toggle("invisible")
}

function toggleInvisible() {
    choices.classList.toggle("invisible")
    fight.classList.toggle("invisible")
}
// Remove old choice classes
function resetChoices() {
    userChoice.classList.remove("rock", "paper", "scissors", "winner");
    houseChoice.classList.remove("rock", "paper", "scissors", "winner");
    houseChoice.classList.remove("fade-in");
    userChoice.classList.remove("fade-in");
    results.classList.remove("fade-in");
    playAgain.classList.remove("fade-in");
    
}
//Computer's choice
function handleComputerChoice() {
    let x = Math.floor(Math.random() * 3)
    var computerChoice = list[x]
    resetChoices();

    houseChoice.classList.add(computerChoice.toLowerCase());
    
    console.log("The computer picked:", computerChoice)
    return computerChoice
}

//Deciding winner
function winner(computer, player) {
    if (computer === player) {
        results.innerHTML="It's a tie!"
        console.log("it's a tie")
    } 
    else if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
    ) {
        results.innerHTML="You Win!"
        userChoice.classList.add("winner")
        handleScore()
        console.log("player is the winner")
    } else {
        results.innerHTML="You Lose!"
        houseChoice.classList.add("winner")
        console.log("computer is the winner")
    }
}

//Score
function handleScore() {
    points++
    score.innerHTML=points
}

choices.addEventListener("click", (event) => {
   if (!event.target.classList.contains("choice")) return;
    results.innerHTML = ""
    playAgain.classList.toggle("invisible")
    resetChoices(); // remove any previous styles

    const player = event.target.value; // get what player clicked

    userChoice.classList.add(player.toLowerCase()); // show player choice
    toggleInvisible(); // hide buttons, show fight screen
    
    console.log("You picked:", player);
    userChoice.classList.add("fade-in");
    // STEP 2: After 1 second, show computer's choice
    setTimeout(() => {
        const x = Math.floor(Math.random() * 3);
        const computer = list[x];
        houseChoice.classList.add(computer.toLowerCase());
        houseChoice.classList.add("fade-in");
        console.log("The computer picked:", computer);
        
        // STEP 3: After another second, show the result
        setTimeout(() => {
            winner(computer, player);
            results.classList.add("fade-in");
            playAgain.classList.add("fade-in");

            playAgain.classList.toggle("invisible")
            
        }, 1000);

    }, 1000);

    
});

//call functions
rules.addEventListener("click", toggleModal)
closeModal.addEventListener("click", toggleModal)
playAgain.addEventListener("click", () => {
    resetChoices();
    toggleInvisible();
});

