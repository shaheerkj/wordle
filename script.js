function isAlphabet(char){
    return /^[a-zA-Z]$/.test(char);
}

const WORD_API = "https://words.dev-apis.com/word-of-the-day?random=1";
const VALID_URL = "https://words.dev-apis.com/validate-word";

async function generateWord(){
    try{
        const response = await fetch("https://words.dev-apis.com/word-of-the-day?random=1"); 
        
        if(!response.ok){
            throw new error("Bad Response!");
        }
        else{
            const processed = await response.json()
            return processed.word;
        }
    }
    catch{
        throw new error("Error!!s");
    }
}
(async function(){
    word = await generateWord();
})();

async function validWord(wordToValidate){
    try{
        const response = await fetch("https://words.dev-apis.com/validate-word",{
            method:"POST",
            header:
            {"Content-Type":"application/json"},
            body: JSON.stringify({ word:wordToValidate })
        
        })
        if(!response.ok){
            throw new console.error("Error");
        }
        else{
            const {validWord} = await response.json();
            return validWord;
        }
    }
    catch{
        
    }
}   


let word;
let rowSelector = 0;
let rows = document.querySelectorAll(".row");

let row = rows[rowSelector++].querySelectorAll(".element");
let rowCounter = 0;

let wordle = "";

document.addEventListener("keydown", async function(event){


    if(event.key=="Backspace" && rowCounter >= 0){
        if(row[rowCounter].innerText === "" && rowCounter >0){
            rowCounter--;
        }
        row[rowCounter].innerText = "";
        if(rowCounter > 0){
            rowCounter--;
        }
        wordle = wordle.slice(0, -1)
    }

    else if(isAlphabet(event.key)&& rowCounter<5){
        if(rowCounter < 5 && wordle.length <5)
            wordle += event.key;

        if(row[rowCounter].innerText === ""){
            row[rowCounter].innerText=event.key.toUpperCase();
        }
        else if(rowCounter!=4){
            row[++rowCounter].innerText=event.key.toUpperCase();    
        }
            
        if(rowCounter != 4){
            rowCounter++;
        }
    }
    else if(event.key=="Enter" && wordle.length===5){
        let usrWord;
        let guessWord = await word.split('');
        console.log(word);
        if(await validWord(wordle)){
            usrWord =  wordle.split('');

            for(let i = 0; i < usrWord.length; i++){
                if(usrWord[i] === guessWord[i]){
                    row[i].classList.add("correct");
                    guessWord[i] = "";
                }
            }
            for(let i = 0; i < usrWord.length; i++){
                if(guessWord.includes(usrWord[i]) && usrWord[i] != guessWord[i]){
                    row[i].classList.add("misplaced");
                    guessWord[guessWord.indexOf(usrWord[i])] = "";
                    console.log(guessWord);
                }
            }
            for(let i = 0; i < usrWord.length; i++){
                if(guessWord[i] != ""){
                    row[i].classList.add("incorrect");
                }
            }
            if(rowSelector<=5){
                rowCounter = 0;
                row = rows[rowSelector++].querySelectorAll(".element")
            }
        }
        wordle = "";
        
    }
})