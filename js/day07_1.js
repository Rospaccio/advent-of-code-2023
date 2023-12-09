const fs = require('fs');
console.log("Advent Of Code - Day 7 (part 1) - Camel Cards");

const figuresMap = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
}

/* HAND
    { 
        compact: '32T3K',
        rank: 1 
    }
*/

function toSummary(line){
    let comps = line.split(" ");
    let summary = withTypeOf(comps[0])
    summary.bet = +comps[1];
    return summary;
}

function withTypeOf(hand) {
    let summary = { compact: hand, keyCount: 0, buckets: {} };
    for (i in hand) {
        let c = hand[i];
        if (!summary.buckets[c])
            summary.keyCount++;
        summary.buckets[c] = !!summary.buckets[c] ? summary.buckets[c] + 1 : 1;
    }

    let slots = [];
    for (k in summary.buckets) {
        slots.push(summary.buckets[k]);
    }
    summary.typeHash = slots.sort().reverse().join("");

    return summary;
}

function compareHands(a, b) {
    if (a.typeHash > b.typeHash)
        return 1;
    else if (a.typeHash < b.typeHash)
        return -1;
    // a.typeHash === b.typeHash
    for (let i = 0; i < a.compact.length; i++) {
        if (figuresMap[a.compact.charAt(i)] > figuresMap[b.compact.charAt(i)])
            return 1;
        else if (figuresMap[a.compact.charAt(i)] < figuresMap[b.compact.charAt(i)])
            return -1;
    }
}

function computeHands(lines) {
    let summaries = [];
    for (let i = 0; i < lines.length; i++) {
        summaries.push(toSummary(lines[i]));
    }

    summaries.sort(compareHands)

    let score = 0;
    for(let i = 0; i < summaries.length; i++){
        score += summaries[i].bet * (i + 1)
    }

    return score;
}

let input = fs.readFileSync("inputs/input_7.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(computeHands(lines))

// console.log(compareHands(withTypeOf('32T3K'), withTypeOf('T55J5')));
// console.log(compareHands(withTypeOf('33T3K'), withTypeOf('T55J5')));

// console.log(withTypeOf('T55J5'))
// console.log(withTypeOf('32T3K'))
// console.log(compareHands('32T3K', 'T55J5'))

