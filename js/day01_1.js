const fs = require('fs');
console.log("Advent Of Code - Day 1 (part1)");

function lineCalibration(line) {
    let first = null, last = null;
    let chars = new String(line);
    let nums = [];
    for (i = 0; i < chars.length; i++) {
        let char = chars.charAt(i);
        if (!isNaN(+char)){
            nums.push(+char)
        }
    }
    first = nums[0];
    last = nums[nums.length - 1];
    console.log(+(("" + first) + last))
    return +(("" + first) + last);
}

function calibration(input) {
    let lines = input.split("\r\n");
    let sum = 0;
    for (let i = 0; i < lines.length; i++){
        sum += lineCalibration(lines[i]);
    }
    return sum;
}

// let ofLine = lineCalibration("jdfhekdfjfgu3ddd");
// console.log("line = " + ofLine);

let input = fs.readFileSync("inputs/input_1.1.txt", "utf-8", calibration);
let result = calibration(input);
console.log("Result = " + result);