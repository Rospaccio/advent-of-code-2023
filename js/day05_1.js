const fs = require('fs');
console.log("Advent Of Code - Day 5 (part 1) - Plant A Seed");

function parseSeeds(line) {

    let seedIdsSubString = line.split(":")[1];
    let seedIds = seedIdsSubString.split(" ");
    let seeds = seedIds.filter(e => e !== '').map(e => +e);
    return seeds;
}

function parseMapHeader(line) {
    let name = line.split(" ")[0].trim();
    let sourceAndDest = name.split("-to-");
    return {
        source: sourceAndDest[0],
        dest: sourceAndDest[1]
    }
}

function parseMap(lines) {

    let head = parseMapHeader(lines[0])
    let innerMap = {};
    for (let i = 1; i < lines.length; i++) {
        let ids = lines[i].split(" ").map(e => +e);
        for (let j = 0; j < ids[2]; j++) {
            innerMap[ids[1] + j] = ids[0] + j;
            console.log(innerMap.length)
        }
    }
    return { head: head, innerMap: innerMap, sourceToDest: sourceToDestMethod };
}

function sourceToDestMethod(source){
    if(!!this.innerMap[source])
        return this.innerMap[source]
    else
        return source;
}

function seedToLocation(seeds, maps){

    let finalMap = {};
    for(let i = 0; i < seeds.length; i++){  

        let startMap = maps['seed'];
        let sourceId = null;
        let destId = seeds[i];
        let destName = ''
        while(destName !== 'location'){
            sourceId = destId;

            destId = startMap.sourceToDest(sourceId);
            destName = startMap.head.dest;
            startMap = maps[destName];
        }
        finalMap[seeds[i]] = destId;
    }
    return finalMap;
}

function parseBlocks(lines) {
    let seeds = parseSeeds(lines[0]);
    let partial = [];
    let maps = {};
    for (let i = 2; i < lines.length; i++) {
        if (lines[i] === '') {
            let map = parseMap(partial);
            maps[map.head.source] = map;
            partial = [];
        } else {
            partial.push(lines[i])
        }
    }
    let map = parseMap(partial);
    maps[map.head.source] = map;
    return {seeds, maps};
}

function findNearestLocationBySeed(lines){
    let parsed = parseBlocks(lines);
    let result = seedToLocation(parsed.seeds, parsed.maps);
    console.log(result);
    let min = 37937915240000;
    for(p in result){
        min = Math.min(result[p], min)
    }
    return min;
}

// console.log(parseSeeds("seeds: 79 14 55 13"))
// console.log(parseMapHeader("seed-to-soil map:"));
// let temp = parseMap(["seed-to-soil map:", "50 98 2", "52 50 48"]);
// console.log(temp)

// temp = parseMap(["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"]);
// console.log(temp)

let input = fs.readFileSync("inputs/input_5.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(findNearestLocationBySeed(lines));