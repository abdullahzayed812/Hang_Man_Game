let catagorySpan = document.querySelector(".container .game-info .catagory span");
let lettersContainer = document.querySelector(".container .row .letters");
let lettersGuessContainer = document.querySelector('.container .guess-letters')

let words = {
    people: ["Abraham Lincoln", "Alkhawarzmy", "Ebncina", "AlberEinstein", "Hossam Hassan", "Khaled Ebn Alwalid", "Omar Ebn Elkhatab"],
    Programming: ["Html", "Css", "JavaScript", "PhP", "Go", "Scala", "Rust", "Java"],
    countries: ["Egypt", "Palsiten", "Palestine", "Gazayer", "Saudi Arabia", "Qatar", "Syria", "Quate", "Maka"],
    movies: ["Ready Player One", "The Avengers", "The Iron Giant", "Up", "Canon", "The Croods", "Ponyo"]
}

// Key Of Words Object In Array
let catagorySection = Object.keys(words);
// Random Number From Key Of Words
let randomNumber = Math.floor(Math.random() * catagorySection.length);
// Random Key From Words Object
let randomCatagoryWord = catagorySection[randomNumber];
// Put The Random Word In Catagory Span
catagorySpan.textContent = randomCatagoryWord;
// Random Number From The Key Array
let randomCatagoryValue = words[randomCatagoryWord];
// Random Number From Key Array
let randomNumberWord = Math.floor(Math.random() * randomCatagoryValue.length);
// Choosen Word
let choosenWord = randomCatagoryValue[randomNumberWord];

// Genrate The Alphabet Characters
let charactersArray = "abcdefghijklmnopqrstuvwxyz".split("");
charactersArray.forEach(function (char) {
    let spanChar = document.createElement('spna');
    spanChar.className = "char-box";
    spanChar.textContent = char;
    lettersContainer.appendChild(spanChar);
});

// Split the choosen word in array to create letters guess container
let lettersGuess = choosenWord.split("");
// Genrate the letters guess container
lettersGuess.forEach(function (letter) {
    let letterSpan = document.createElement('span');
    if (letter === " ") {
        letterSpan.className = "with-space";
    }
    lettersGuessContainer.appendChild(letterSpan);
});

let lettersSpansGuess = document.querySelectorAll(".container .guess-letters span");
let spansArray = Array.from(lettersSpansGuess);

let hangemanDraw = document.querySelector(".container .hangman-draw");
let wrongAttempts = 0;

// Make the function when click the letter
document.addEventListener('click', function (e) {
    let status = false;
    if (e.target.className === "char-box") {
        e.target.classList.add('clicked');
        let clickedLetter = e.target.textContent.toLowerCase();
        lettersGuess.forEach((letter, letterIndex) => {
            if (clickedLetter === letter.toLowerCase()) {
                document.getElementById('success').play();
                setTimeout(function () {
                    document.getElementById('success').play();
                }, 500)
                status = true;
                spansArray.forEach((span, spanIndex) => {
                    if (letterIndex === spanIndex) {
                        span.textContent = letter;
                    }
                });
            }
        });
        if (status !== true) {
            wrongAttempts += 1;
            hangemanDraw.classList.add("wrong-" + wrongAttempts);
            if (wrongAttempts === 8) {
                endGame();
            }
        }
    }
});

function endGame() {
    lettersContainer.classList.add("finished");
    let div = document.createElement('div');
    let endGameText = document.createTextNode("The Game Is Finished The Word Is " + choosenWord);
    div.appendChild(endGameText)
    div.className = "pop-up";
    document.body.appendChild(div);    
}
