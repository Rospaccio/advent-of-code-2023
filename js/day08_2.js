const fs = require('fs');
var lcm = require( 'compute-lcm' );
console.log("Advent Of Code - Day 8 (part 2) - Ghost Righters and Lefters");

function parseTurns(line) {
    let turns = line.split("")
        .map(e => e === 'L' ? 0 : 1)
    return turns
}

function parseNodes(lines) {

    let nodes = {}
    for (let i = 0; i < lines.length; i++) {

        let comps = lines[i].split("=");
        let id = comps[0].trim();

        let linkedComps = comps[1].replace('(', '').replace(')', '')
            .split(',')
        let left = linkedComps[0].trim()
        let right = linkedComps[1].trim()
        nodes[id] = {
            id,
            arcs: [left, right]
        };
    }

    return nodes;
}

function collectStartNodes(nodes) {

    let starters = [];
    for (k in nodes) {
        if (k.endsWith('A'))
            starters.push(k);
    }
    return starters;
}

function countsTurnsToEnd(lines) {
    let turns = parseTurns(lines[0])
    let nodes = parseNodes(lines.splice("2"));

    let starters = originalStarters = collectStartNodes(nodes);

    let base = turns.length;

    let enders = [];
    let count = 0;
    let index = 0;
    
        // resets after checking
        counts = [];
        for (let i = 0; i < starters.length; i++) {
            counts.push(step(starters[i], nodes, turns, base));
        }
        // for the next iteration
        // index = (index + 1) % base
        // starters = enders;
        // count++;

    let leastCommonMultiple = lcm(counts);
    return leastCommonMultiple;
}

function step(starter, nodes, turns, base) {
    ///
    let count = 0;
    let nodeId = starter;
    let i = 0;

    do {

        dest = nodes[nodeId];
        nodeId = dest.arcs[turns[i]];
        count++
        i = (i + 1) % base
    } while (!nodeId.endsWith('Z'))

    return count;
}

function allEndsWithZ(enders) {
    if (enders.length === 0)
        return false;
    let allZ = true;
    for (let i = 0; i < enders.length; i++) {
        allZ = allZ && enders[i].endsWith('Z')
        if (!allZ)
            // shortcircuits
            return allZ;
    }
    return allZ;
}

let input = fs.readFileSync("inputs/input_8.1.txt", "utf-8");
let lines = input.split("\r\n")

// console.log(parseTurns(lines[0]))
// console.log(parseNodes(lines.splice(2)))
console.log(countsTurnsToEnd(lines))

