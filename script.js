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



const playGame = (userChoice) =>{

    // Generate computer choice
    const compChoice = genCompChoice();


    //Check Draw
    if(userChoice == compChoice){
        message.innerText = `Comp choose  ${userChoice} It is a Draw`;
        message.style.backgroundColor = "";
    }

// User choose Rock
    else if(userChoice === "rock"){
        if(compChoice === "paper"){
        message.innerText = "Comp choose paper, You lost";
        message.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
        }
        else{
            // Comp choice scissors
            message.innerText = "Comp choose Scissors, You won";
            message.style.backgroundColor = "green";
            userScore++;
            userScorePara.innerText = userScore;

        }
    }
// User choose Paper
    else if(userChoice === "paper"){
        if(compChoice === "rock"){
        message.innerText = "Comp choose Rock, You won";
        message.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;

        }
        else{
            // Comp choice scissors
            message.innerText = "Comp choose Scissors, You lost";
            message.style.backgroundColor = "red";
            compScore++;
            compScorePara.innerText = compScore;
        }
    }

    // User choose Scissors
    else if(userChoice === "scissors"){
        if(compChoice === "rock"){
        message.innerText = "Comp choose Rock, You lost";
        message.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
        }
        else{
            // Comp choice Paper
            message.innerText = "Comp choose Paper, You won";
            message.style.backgroundColor = "green";
            userScore++;
            userScorePara.innerText = userScore;
        }
    }

}

choices.forEach((choice)=>{
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})