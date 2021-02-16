import classList from "./class.js";
import _ from "lodash";
import fs from "fs";
import moment from "moment";
const weekOf = moment().add(7, "days").startOf("week").add(1, "days").format("MM-DD-YYYY");
const groupSize = 5;

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
    const data = `### Groups for ${weekOf}\n`;
    return arr.reduce((prev, curr, i) => {
        return prev + `\n\n#### Group ${i + 1}\n${curr.map((name, i) => `${i + 1}. ${name}`).join("\n")}`
    }, data)
}


/// Executing file

const nameList = classList.map((elem, i) => `${elem.student.firstName} ${elem.student.lastName}`);

const groups = evenGroups(_.chunk(_.shuffle(nameList), groupSize));

const text = generateText(groups);


fs.writeFileSync(`./groups/Groups_${weekOf}.md`, text);
console.log(`Groups_${weekOf}.md has been written successfully!`);