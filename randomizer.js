import _ from "lodash";
import fs from "fs/promises";
import moment from "moment";
const weekOf = moment().add(7, "days").startOf("week").add(1, "days").format("MM-DD-YYYY");

// Level out groups
const evenGroups = (nestedArr, groupSize, driver) => {
    const lastItem = nestedArr.pop();
    const membersToAdd = groupSize - lastItem.length;
    for (let i = 0; i < membersToAdd; i++) {
        lastItem.push(nestedArr[i].pop());
    }

    nestedArr.push(lastItem);
    if (driver) {
        nestedArr = nestedArr.map((group) => {
            const random = Math.floor(Math.random() * group.length);
            let driver = group[random];
            driver += ' (Driver)';
            group[random] = driver;
            return group;
        })
    }
    return nestedArr;
}


const generateText = (arr) => {
    const data = `### Groups for ${weekOf}\n`;
    return arr.reduce((prev, curr, i) => {
        return prev + `\n\n#### Group ${i + 1}\n${curr.map((name, i) => `${i + 1}. ${name}`).join("\n")}`
    }, data)
}


/// Executing file

export const create = async (filepath = './class.json', groupSize = 5, driver = true, outputPath = `./groups/Groups_${weekOf}.md`) => {
    const list = await fs.readFile(filepath, 'utf8');
    
    const nameList = JSON.parse(list)?.map((elem, i) => `${elem.student.firstName} ${elem.student.lastName}`);

    const groups = evenGroups(_.chunk(_.shuffle(nameList), groupSize), groupSize, driver);

    const text = generateText(groups);

    await fs.writeFile(outputPath, text);
    console.log(`Groups_${weekOf}.md has been written successfully!`);
}