const fs = require('fs');
console.log("Advent Of Code - Day 5 (part 2) - Plant More Seeds");

function parseSeedsRanges(line) {

    let seeds = [];
    let seedIdsSubString = line.split(":")[1];
    let seedIds = seedIdsSubString.split(" ");
    seedIds = seedIds.filter(e => e !== '').map(e => +e);
    let i = 0;
    while (i <= seedIds.length - 2) {
        let start = seedIds[i];
        let size = seedIds[i + 1];
        seeds.push({
            start,
            size
        })
        i += 2;
    }
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
    let innerMap = [];
    for (let i = 1; i < lines.length; i++) {
        let ids = lines[i].split(" ").map(e => +e);
        innerMap.push({
            source: ids[1],
            dest: ids[0],
            range: ids[2]
        })
    }
    return { head: head, innerMap: innerMap, sourceToDest: sourceToDestMethod };
}

function sourceToDestMethod(source) {

    for (let i = 0; i < this.innerMap.length; i++) {
        let map = this.innerMap[i];
        if (source >= map.source && source < map.source + map.range) {
            return map.dest + (source - map.source)
        }
    }
    return source;
}

function seedToLocation(seeds, maps) {
                             
    let theVeryMinLocation = 10000000000000;
    let seedsCount = 0;
    for (let i = 0; i < seeds.length; i++) {
        for (let j = seeds[i].start; j < seeds[i].start + seeds[i].size; j++) {
            
            let theSeed = j;
            seedsCount++;
            //
            let startMap = maps['seed'];
            let sourceId = null;
            let destId = theSeed;
            let destName = ''
            while (destName !== 'location') {
                
                sourceId = destId;

                destId = startMap.sourceToDest(sourceId);
                destName = startMap.head.dest;
                startMap = maps[destName];
            }
            theVeryMinLocation = Math.min(destId, theVeryMinLocation);
            //
        }
    }
    console.log("Seeds Count: " + seedsCount);
    return theVeryMinLocation;
}

function parseBlocks(lines) {
    let seeds = parseSeedsRanges(lines[0]);
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
    return { seeds, maps };
}

function findNearestLocationBySeed(lines) {
    let parsed = parseBlocks(lines);
    let result = seedToLocation(parsed.seeds, parsed.maps);
    return result;
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