const fs = require('fs');
console.log("Advent Of Code - Day 4 (part 2) - House Of Scratchcards");

function countWins(winnig, owned){
    let found = 0;
    for(let i = 0; i < owned.length; i++){
        winnig.forEach((e) => {
            if(e === owned[i]){
                found += 1;
            }
        });
    }
    return found;
}

// function toNumberLists(line){
//     var cardsSubString = line.split(":")[1].trim();
//     var cards = cardsSubString.split("|");

//     let winnigSubstring = cards[0].trim().split(" ");
//     let ownedSubstring = cards[1].trim().split(" ");

//     let winnig = winnigSubstring.map((e) => +e);
//     let owned = ownedSubstring.filter((e) => e !== "").map((e) => +e)
//     return [winnig, owned];
// }

function toCardBoard(lines){

    let cardboard = [];
    for(let i = 0; i < lines.length; i++){
        cardboard.push(toCard(lines[i]))
    }
    return cardboard;
}

function toCard(line){
    var cardsSubString = line.split(":")[1].trim();
    var cards = cardsSubString.split("|");

    let winnigSubstring = cards[0].trim().split(" ");
    let ownedSubstring = cards[1].trim().split(" ");

    let winnig = winnigSubstring.map((e) => +e);
    let owned = ownedSubstring.filter((e) => e !== "").map((e) => +e)
    return {
        winnig: winnig, 
        owned: owned,
        winningCount: 0,
        copies: 1
    };
}

function computeTotalPoints(lines){

    let sum = 0;
    for(let i = 0; i < lines.length; i++){
        let couple = toNumberLists(lines[i]);
        sum += computeWins(couple[0], couple[1])
    }
    return sum;
}

function computeTotalCards(lines){
    
    let cardboard = toCardBoard(lines);
    for(let i = 0; i < cardboard.length; i++){
        let count = countWins(cardboard[i].winnig, cardboard[i].owned);
        for(let j = 1; j <= count && i + j < cardboard.length; j++){
            cardboard[i + j].copies += cardboard[i].copies;
        }
    }

    let allCopiesCount = 0;
    for(let i = 0; i < cardboard.length; i++){
        allCopiesCount += cardboard[i].copies;
    }

    return allCopiesCount;
}

// console.log(computeWins([41, 48, 83, 86, 17], [83, 86,  6, 31, 17,  9, 48, 53]));

// console.log(toCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"));

let input = fs.readFileSync("inputs/input_4.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(computeTotalCards(lines));
