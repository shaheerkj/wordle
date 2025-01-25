// async function generateWord(){
//     const response = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");

//     if(!response.ok){
//         throw new console.error("Error Occured");
        
//     }

//     const word = response.json();

//     return word;
// };
 
// (async function(){
//     const {word} = await generateWord();
//     console.log(word);
// })();

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
(async function validate() {
    bools = await validWord("assay");
    console.log(bools);
})();