const fs = require('fs');
console.log("Advent Of Code - Day 4 (part 1) - House Of Scratchcards");

function computeWins(winnig, owned){
    let found = 0;
    for(let i = 0; i < owned.length; i++){
        winnig.forEach((e) => {
            if(e === owned[i]){
                found += 1;
            }
        });
    }
    if(found > 0)
        return Math.pow(2, found - 1);
    return 0;
}

function toNumberLists(line){
    var cardsSubString = line.split(":")[1].trim();
    var cards = cardsSubString.split("|");

    let winnigSubstring = cards[0].trim().split(" ");
    let ownedSubstring = cards[1].trim().split(" ");

    let winnig = winnigSubstring.map((e) => +e);
    let owned = ownedSubstring.filter((e) => e !== "").map((e) => +e)
    return [winnig, owned];
}

function computeTotalPoints(lines){

    let sum = 0;
    for(let i = 0; i < lines.length; i++){
        let couple = toNumberLists(lines[i]);
        sum += computeWins(couple[0], couple[1])
    }
    return sum;
}

// console.log(computeWins([41, 48, 83, 86, 17], [83, 86,  6, 31, 17,  9, 48, 53]));

// console.log(toNumberLists("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"));

let input = fs.readFileSync("inputs/input_4.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(computeTotalPoints(lines));
