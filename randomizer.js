const classList = require("./class.json");
const _ = require("lodash");
const fs = require("fs");
const moment = require("moment");
const weekOf = moment().add(7, "days").startOf("week").add(1, "days").format("MM-DD-YYYY");
const groupSize = 5;


// Helper function file

// Level out groups
const evenGroups = (nestedArr) => {
    console.log(nestedArr)
    const lastItem = nestedArr.pop();
    const membersToAdd = groupSize - lastItem.length;
    console.log(lastItem)
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

const nameList = classList.map((elem, i) => `${elem.student.firstName} ${elem.student.lastName}`);


const groups = evenGroups(_.chunk(_.shuffle(nameList), groupSize));


const text = generateText(groups);


fs.writeFileSync(`Groups${weekOf}.md`, text);