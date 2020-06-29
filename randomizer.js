const _ = require("lodash");
const classList = require("./class.json");
const fs = require("fs");
const moment = require("moment");
const weekOf = moment().add(7, "days").startOf("week").add(1, "days").format("MM-DD-YYYY");

const groupSize = 5;

// Level out groups
const evenGroups = (arr) => {
    const lastItem = arr.pop();
    const membersToAdd = groupSize - lastItem.length;
    for (let i = 1; i <= membersToAdd; i++) {
        lastItem.push(arr[i].pop());
    }
    arr.push(lastItem);
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
const groups = evenGroups(_.chunk(_.shuffle(nameList), groupSize));

const text = generateText(groups);
fs.writeFileSync(`Groups${weekOf}.md`, text);