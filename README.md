# The Class Randomizer
This is a basic script I wrote to aid in creating randomized groups for Coding Bootcamps that I am a Teaching Assistant for. 
This will create groups starting at 5 (or whatever size you declare in the randomizer.js file), and then it will aim to balance out the groups so theres only a difference of 1 between group sizes.

Run `npm i` + `npm start`

Requires local class.js file with an array of objects:
```
const classList = [
    {
        "firstName": "string",
        "lastName": "string"
    }
];
export default classList;
```

Then run `node randomizer`
