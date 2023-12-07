const fs = require('fs');
console.log("Advent Of Code - Day 1 (part 2)");

let spelled = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9
}

function tryReadSpelled(subline, i){
    let digit = null;
    for(word in spelled){
        let regex = new RegExp("^" + word);
        let match = subline.match(regex, 'gi')
        if(match){
            digit = spelled[word],
            i += word.length;
            return {'digit' : digit, 'index' : i};
        }
    }
    return null;
}

function lineCalibration(line) {
    let first = null, last = null;
    let chars = new String(line);
    let nums = [];
    for (i = 0; i < chars.length; i++) {
        let char = chars.charAt(i);
        if (!isNaN(+char)){
            nums.push(+char)
        }
        else{
            let reading = tryReadSpelled(line.slice(i), i);
            if(reading){
                nums.push(reading.digit);
            }
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

let input = fs.readFileSync("inputs/input_1.1.txt", "utf-8");
let result = calibration(input);
console.log("Result = " + result);