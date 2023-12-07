const { match } = require('assert');
const fs = require('fs');
console.log("Advent Of Code - Day 3 (part 1) - Do Your Parts");

// const symbols = "\|!\"£\$%&/\(\)=\?\^\*\+@°#§,:\-_<>";
const symbols = "[\\\\|!\"£\$%&/\(\)=\\?\^\\*\\+@°#§,:\\-_<>]";

function sumAdjacentNumbersByLine(lineBlock) {
    let sum = 0;
    // scans the middle line seraching for symbols
    let regex = new RegExp(symbols, 'gi')
    let matches = lineBlock[1].matchAll(regex);
    let match = matches.next();
    while (match.value !== undefined) {

        let index = match.value.index;
        sameRow = consumeDigits(lineBlock[1], index);
        upperRow = consumeDigits(lineBlock[0], index);
        lowerRow = consumeDigits(lineBlock[2], index);

        sum += sameRow.reduce(add, 0)
            + upperRow.reduce(add, 0)
            + lowerRow.reduce(add, 0);

        match = matches.next();
    }

    function add(a, b) {
        return a + b;
    }

    return sum;
}

function isNum(char) {
    return !isNaN(char);
}

function consumeDigits(line, index) {

    let allNear = [];

    let fix = null;
    let fixLeft = null;
    let fixRigth = null;
    if (isNum(line.charAt(index)))
        fix = 0;
    else {
        if (isNum(line.charAt(index - 1)))
            fixLeft = -1;
        if (isNum(line.charAt(index + 1)))
            fixRigth = 1
    }

    if (fix === 0) {

        let digitAcc = "";
        let i = index;
        while (i >= 0 && isNum(line.charAt(i))) {
            digitAcc = line.charAt(i) + digitAcc;
            i--;
        }
        let j = index + 1;
        while (j < line.length && isNum(line.charAt(j))) {
            digitAcc = digitAcc + line.charAt(j);
            j++
        }
        allNear.push(+digitAcc);
    }

    if (fixLeft === -1) {
        let digitAcc = "";
        let i = index + fixLeft;
        while (i >= 0 && isNum(line.charAt(i))) {
            digitAcc = line.charAt(i) + digitAcc;
            i--;
        }
        allNear.push(+digitAcc);
    }

    if (fixRigth === 1) {
        let digitAcc = "";
        let j = index + fixRigth;
        while (j < line.length && isNum(line.charAt(j))) {
            digitAcc = digitAcc + line.charAt(j);
            j++;
        }
        allNear.push(+digitAcc);
    }
    return allNear;
}

function sumPartsNumber(lines){

    let fakeLine = '.'.repeat(lines[0].length);
    lines.unshift(fakeLine);
    lines.push(fakeLine);

    let sum = 0;
    for(let i = 1; i < lines.length - 2; i++){
        sum += sumAdjacentNumbersByLine([lines[i - 1], lines[i], lines[i + 1]]);
    }
    return sum;
}

// console.log(consumeDigits("444.55.114..", 3, -1));

// const example = "467..114..\r\n" +
//                 "...*..$...\r\n" +
//                 "..35..633.";
// const example = "467..114..\r\n" +
//     "..3#.3$4..\r\n" +
//     "..35.1.33.";
// let lineBlock = example.split("\r\n")
// console.log(sumAdjacentNumbersByLine(lineBlock));

let input = fs.readFileSync("inputs/input_3.1.txt", "utf-8");
let lines = input.split("\r\n")
console.log(sumPartsNumber(lines))