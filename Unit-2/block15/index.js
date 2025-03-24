/* 
const fruit = {
    name: froyo,
    color: ["green", "yellow", "brown"],
    count: 5
    type: {
        name: subname,
        origin: other
    },
}   
*/

// STRATEGY:
// get user input
// create input list split by commas
// create empty map
// func:
//   iterate through input list
//   if item in map
//     {item: +1}
//   if not
//     {item}
// call function
// print output as table

// get user input
const userInput = prompt(
  "Input comma-seperated list of froyo flavors",
  "flavor1,flavor2,etc"
);

// create seperated list of user inputs & empty map
const userInputList = userInput.split(",");
const flavorsMap = {};

// put each unique entry from user list into map
// if already in map, +1
function countFlavors(inputList, outputMap) {
  for (item of inputList) {
    item in outputMap ? outputMap[item]++ : (outputMap[item] = 1);
  }
  return outputMap;
}

countFlavors(userInputList, flavorsMap);
console.table(flavorsMap);
