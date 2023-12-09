const fs = require('fs');
console.log("Advent Of Code - Day 7 (part 2) - Joker Camel");

const figuresMap = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 1, 
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
}

function toSummary(line) {
    let comps = line.split(" ");
    let summary = withTypeOf(comps[0])
    summary.bet = +comps[1];
    return summary;
}

function withTypeOf(hand) {
    let summary = { compact: hand, keyCount: 0, buckets: {} };
    for (i in hand) {
        let c = hand[i];
        if(c === 'J')
            continue;
        if (!summary.buckets[c])
            summary.keyCount++;
        summary.buckets[c] = !!summary.buckets[c] ? summary.buckets[c] + 1 : 1;
    }

    let slots = [];
    for (k in summary.buckets) {
        slots.push(summary.buckets[k]);
    }

    /////
    let countOfJs = hand.split("")
        .map(e => e === 'J' ? 1 : 0)
        .reduce(( (e, s) =>{return s += e} ), 0)
    summary.countOfJs = (!!countOfJs) ? countOfJs : 0;

    /////

    summary.typeHash = slots.sort().reverse().join("");
    summary.typeHash = '' + (countOfJs + +(summary.typeHash.substring(0, 1))) + summary.typeHash.substring(1) 

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
    for (let i = 0; i < summaries.length; i++) {
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

