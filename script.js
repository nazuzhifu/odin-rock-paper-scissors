let humanScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 5;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice) {
    if (roundCount >= maxRounds) return; // Stop the game if 5 rounds are played

    roundCount++;
    const computerChoice = getComputerChoice();
    let result = "";

    if (humanChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You win this round!";
        humanScore += 1;
    } else {
        result = "Computer wins this round!";
        computerScore += 1;
    }

    updateUI(humanChoice, computerChoice, result);

    // Check if the game is over
    if (roundCount === maxRounds) {
        declareWinner();
        disableButtons();
    }
}

function updateUI(humanChoice, computerChoice, result) {
    document.getElementById("result").innerHTML = 
        `You chose: ${humanChoice}<br>Computer chose: ${computerChoice}<br><strong>${result}</strong>`;
    document.getElementById("human-score").textContent = `Your Score: ${humanScore}`;
    document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`;
    document.getElementById("round-count").textContent = `Round: ${roundCount} / ${maxRounds}`;
}

function declareWinner() {
    let finalMessage = "";
    if (humanScore > computerScore) {
        finalMessage = "🎉 Congratulations! You won the game!";
    } else if (computerScore > humanScore) {
        finalMessage = "💻 Computer wins the game! Better luck next time.";
    } else {
        finalMessage = "🤝 It's a tie overall!";
    }

    // Also display the final message in the UI
    document.getElementById("result").innerHTML += `<br><br><strong>${finalMessage}</strong>`;
}

function disableButtons() {
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
}

// Reset game function
document.getElementById("reset").addEventListener("click", () => {
    humanScore = 0;
    computerScore = 0;
    roundCount = 0;

    document.getElementById("result").innerHTML = "";
    document.getElementById("human-score").textContent = `Your Score: 0`;
    document.getElementById("computer-score").textContent = `Computer Score: 0`;
    document.getElementById("round-count").textContent = `Round: 0 / ${maxRounds}`;

    // Re-enable buttons
    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;
});

// Attach event listeners to buttons
document.getElementById("rock").addEventListener("click", () => playRound("rock"));
document.getElementById("paper").addEventListener("click", () => playRound("paper"));
document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));
