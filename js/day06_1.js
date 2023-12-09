const fs = require('fs');
console.log("Advent Of Code - Day 6 (part 1 & 2) - Charge Ahead");

function parseRuns(lines) {
    let timesSubstring = lines[0].split(":")[1].trim();
    let distancesSubstring = lines[1].split(":")[1].trim();

    let times = timesSubstring.split(" ")
        .map(e => e.trim())
        .filter(e => e !== '')
        .map(e => +e);

    let distances = distancesSubstring.split(" ")
        .map(e => e.trim())
        .filter(e => e !== '')
        .map(e => +e);

    return {times, distances}
}

function doesBeatRecord(time, chargeTime, record){
    let speed = chargeTime;
    let runTime = time - chargeTime;
    let distance = speed * runTime;
    return distance > record;
}

function howManyTimeCanIBeatTheRecord(time, record){
    
    let howMany = 0;
    for(let i = 0; i <= time; i++){
        howMany += (+doesBeatRecord(time, i, record))
    }
    return howMany;
}

function multiplyWinTimes(lines){
    let runs = parseRuns(lines);
    let product = 1;
    for(let i = 0; i < runs.times.length; i++){
        product *= howManyTimeCanIBeatTheRecord(runs.times[i], runs.distances[i])
    }
    return product;
}

let input = fs.readFileSync("inputs/input_6.1.txt", "utf-8");
let lines = input.split("\r\n")
// console.log(doesBeatRecord(15, 3, 40))
console.log(howManyTimeCanIBeatTheRecord(54708275, 239114212951253))
// console.log(multiplyWinTimes(lines));