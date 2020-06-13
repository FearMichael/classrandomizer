const _ = require("lodash");
const classList = require("./class.json");
const fs = require("fs");
const moment = require("moment");
const weekOf = moment().add(7, "days").startOf("week").add(1, "days").format("MM-DD-YYYY");

const evenGroups = (arr) => {
    const secondLastGroup = arr[arr.length - 2];
    arr[arr.length - 1].push(secondLastGroup.pop());
    return arr;
}

const generateText = (arr) => {
    let text = `### Groups for ${weekOf}\n`;
    arr.forEach((elem, i) => {
        text += `\n\n#### Group ${i + 1}\n${elem.map((name, i) => `${i + 1}. ${name}`).join("\n")}`
    });
    return text;
}

const nameList = classList.map((elem, i) => `${elem.student.firstName} ${elem.student.lastName}`);
const groups = evenGroups(_.chunk(_.shuffle(nameList), 5));



const text = generateText(groups);
console.log(text)
console.log(groups);
fs.writeFileSync(`Groups${weekOf}.md`, text);