let userScore = 0;
let compScore = 0;

let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");

let choices = document.querySelectorAll(".choice");
let message = document.querySelector("#message");

//Generate random choice
let genCompChoice = () =>{
    const options = ["rock", 'paper', "scissors"];
    const ranId = Math.floor(Math.random() *3);
    return options[ranId];
}



const playGame = (userChoice) => { 
  message.innerText = "Computer is thinking...";
  message.style.backgroundColor = "blue";

  setTimeout(() => {
    const compChoice = genCompChoice();

    if(userChoice == compChoice){
        message.style.backgroundColor = "";
        document.getElementById("sound-draw").play();
    } else if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
        document.getElementById("sound-win").play();
    } else {
        document.getElementById("sound-lose").play();
    }

    if (userChoice == compChoice){
      addToHistory(userChoice, compChoice, "draw");
    } else if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      addToHistory(userChoice, compChoice, "win");
    } else {
      addToHistory(userChoice, compChoice, "lose");
    }

    if (userChoice == compChoice) {
      message.innerText = `Comp chose ${compChoice}. It is a Draw`;
      message.style.backgroundColor = "";
    } else if (userChoice === "rock") {
      if (compChoice === "paper") {
        message.innerText = "Comp chose paper, You lost";
        message.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
      } else {
        message.innerText = "Comp chose scissors, You won";
        message.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
      }
    } else if (userChoice === "paper") {
      if (compChoice === "rock") {
        message.innerText = "Comp chose rock, You won";
        message.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
      } else {
        message.innerText = "Comp chose scissors, You lost";
        message.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
      }
    } else if (userChoice === "scissors") {
      if (compChoice === "rock") {
        message.innerText = "Comp chose rock, You lost";
        message.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
      } else {
        message.innerText = "Comp chose paper, You won";
        message.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
      }
    }
  }, 1000); // 1000 ms = 1 second delay
};



choices.forEach(choice => {
  choice.addEventListener("click", () => {
    document.getElementById("sound-click").play();
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});


const historyDiv = document.getElementById("history");
let history = [];

const addToHistory = (userChoice, compChoice, result) => {
  history.unshift({userChoice, compChoice, result});
  if(history.length > 5) history.pop();
  
  historyDiv.innerHTML = history.map(h => {
    let emojiUser = h.userChoice === "rock" ? "✊" : h.userChoice === "paper" ? "✋" : "✌️";
    let emojiComp = h.compChoice === "rock" ? "✊" : h.compChoice === "paper" ? "✋" : "✌️";
    let color = h.result === "win" ? "text-green-400" : h.result === "lose" ? "text-red-400" : "text-gray-400";
    return `<p class="${color}">You: ${emojiUser} | Comp: ${emojiComp} — ${h.result.toUpperCase()}</p>`;
  }).join("");
};



document.getElementById("reset-btn").addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  message.innerText = "Choose your move";
  message.style.backgroundColor = "";
  history = [];
  historyDiv.innerHTML = "";
  choices.forEach(c => c.classList.remove("winner", "loser", "draw"));
});


document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    let selectedChoice = null;

    if (key === "1") selectedChoice = document.getElementById("rock");
    if (key === "2") selectedChoice = document.getElementById("paper");
    if (key === "3") selectedChoice = document.getElementById("scissors");

    if (selectedChoice) {
        playGame(selectedChoice.id);

        // Add glow effect
        selectedChoice.classList.add("active-glow");

        // Remove glow after 300ms
        setTimeout(() => {
            selectedChoice.classList.remove("active-glow");
        }, 300);
    }
});
