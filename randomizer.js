const classList = require("./class.json");
const _ = require("lodash");
const fs = require("fs");
const util = require("util");
const moment = require("moment");
const weekOf = moment().add(7, "days").startOf("week").add(2, "days").format("MM-DD-YYYY");
const groupSize = 5;

const writeFileAsync = util.promisify(fs.appendFile);

function writeToFile(fileName, data) {
    return writeFileAsync(fileName, data);
}

// Level out groups
const evenGroups = (nestedArr) => {
    const lastItem = nestedArr.pop();
    const membersToAdd = groupSize - lastItem.length;
    for (let i = 0; i < membersToAdd; i++) {
        lastItem.push(nestedArr[i].pop());
    }

    nestedArr.push(lastItem);

    return nestedArr;
}


const generateText = (arr) => {

    let data = `### Groups for ${weekOf}\n`;

    arr.forEach((elem, i) => {

        data += `\n\n#### Group ${i + 1}\n${elem.map((name, i) => `${i + 1}. ${name}`).join("\n")}`

    });
    return data;
}


/// Executing file

const nameList = classList.map((elem, i) => `${elem.firstName} ${elem.lastName}`);

const groups = evenGroups(_.chunk(_.shuffle(nameList), groupSize));

const text = generateText(groups);


writeToFile(`./groups/Groups_${weekOf}.md`, text);
console.log("File written successfully!");