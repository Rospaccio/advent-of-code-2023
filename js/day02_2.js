const fs = require('fs');
console.log("Advent Of Code - Day 2 (part 2) - Games of Cubes");

let max = { red: 12, green: 13, blue: 14 };

// function isPossible(game){

//     for(let i = 0; i < game.length; i++){
//         if ( ! (game[i].red <= max.red
//             && game[i].green <= max.green
//             && game[i].blue <= max.blue)){

//                 return false;
//             }
//     }

//     return true;
// }

function powerOfMinCubes(game) {
    let minSet = { red: 0, green: 0, blue: 0 };
    for (let i = 0; i < game.length; i++) {
        minSet.red = Math.max(minSet.red, game[i].red);
        minSet.green = Math.max(minSet.green, game[i].green);
        minSet.blue = Math.max(minSet.blue, game[i].blue);
    }
    return minSet.red * minSet.green * minSet.blue;
}

// function sumPossibleGames(lines){
//     let games = [];
//     let sum = 0;
//     for(let i = 0; i < lines.length; i++){
//         games.push(asGame(lines[i]));
//         if(isPossible(games[i])){
//             sum += games[i].id;
//         }
//     }
//     return sum;
// }

function sumOfMinPowers(lines) {
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        let game = asGame(lines[i]);
        sum += powerOfMinCubes(game);
    }
    return sum;
}

function asGame(line) {
    let headAndTail = line.split(":");
    let head = headAndTail[0];
    let gameId = +head.split(" ")[1];
    let tail = headAndTail[1].trim();

    let setSubLine = tail.split(";")
    let game = [];
    game.id = gameId;
    for (let i = 0; i < setSubLine.length; i++) {
        game.push(asSet(setSubLine[i]));
    }
    return game;
}

function asSet(setLine) {
    let buckets = setLine.split(",");
    let set = { red: 0, green: 0, blue: 0 };
    for (let i = 0; i < buckets.length; i++) {
        let colorCount = buckets[i].trim().split(" ");
        set[colorCount[1]] = +colorCount[0]
    }
    // console.log(set);
    return set;
}


// let line = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
// console.log(powerOfMinCubes(asGame(line)));
// line = "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue";
// console.log(powerOfMinCubes(asGame(line)));
// line = "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";
// console.log(powerOfMinCubes(asGame(line)));
// line = "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red";
// console.log(powerOfMinCubes(asGame(line)));
// line = "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
// console.log(powerOfMinCubes(asGame(line)));


let input = fs.readFileSync("inputs/input_2.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(sumOfMinPowers(lines))


//     