# The Class Randomizer
This is a basic script I wrote to aid in creating randomized groups for Coding Bootcamps classes I teach. 

This will create groups of whatever size you declare, and then it will aim to balance out the groups so theres only a difference of 1 between group sizes.

---
## Requirements
Requires local class.json file with an array of objects: 
```
const classList = [
    student: {
        "firstName": "string",
        "lastName": "string"
    }
];
export default classList;
```

---
## Getting Started
1. Install dependencies by running `npm install`
2. Run the application by using `node program.js create`

---
## Notes
- This tool uses `commander` to allow it to be run via as a CLI.
- Run `node program.js create --help` to get see the options available for the create function.

