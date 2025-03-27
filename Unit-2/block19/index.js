// === State ===
// Here, we define variables for the data that our program needs to remember.
// We call this data "state" because it represents the state of our program.
// This is also where we define functions to modify the state.

// Random names and occupations arrays
const randNames = [
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Elijah",
  "Ava",
  "Mateo",
  "Sophia",
  "Lucas",
  "Isabella",
  "Aiden",
  "Charlotte",
  "Jackson",
  "Amelia",
  "Ethan",
];
const randOccupations = [
  "Teacher",
  "Engineer",
  "Doctor",
  "Artist",
  "Writer",
  "Chef",
  "Pilot",
  "Lawyer",
  "Farmer",
  "Designer",
  "Musician",
  "Analyst",
  "Builder",
  "Scientist",
  "Programmer",
];

// where all freelancers will live after being generated
const freelancers = [
  { name: "Ryan", occupation: "Programmer", startingPrice: 75 },
  { name: "John", occupation: "Fullstack Dev", startingPrice: 50 },
];

// Ryan - create random freelancer and add to freelancers array. Pass in names and occupations array
const genFreelancer = (names, occupations) => {
  // get random index in names & occupations arrays
  const nameIndex = Math.floor(Math.random() * (names.length - 1));
  const occupationIndex = Math.floor(Math.random() * (occupations.length - 1));

  // create random starting price
  const startPrice = Math.floor(Math.random() * 100) + 1;

  // create object for this data to live in
  const objTemp = {};

  // add data to object
  objTemp.name = names[nameIndex];
  objTemp.occupation = occupations[occupationIndex];
  objTemp.startingPrice = startPrice;

  // return objTemp so it can be pushed into freelancers[]
  return objTemp;
};
// freelancers.push(genFreelancer(randNames, randOccupations));

// get average starting price - shaniqua
// const avgAmount = (objList) => {
//   sum = 0;
//   for (let i = 0; i < objList.length; i++) {
//     sum += objList[i].startPrice;
//   }
//   const average = sum / objList.length;
//   return average;
// };

/* Renders each freelancer inside a given container*/
// function addFreelancer(objList) {}

//Tor
function avgStartPri(freelancer) {
  //Getting total starting price of all Freelancers
  let accStartPri = freelancer.reduce(
    (acc, currentValue) => acc + currentValue.startingPrice,
    0
  );
  //Getting total freelancers by taking the index and adding one

  let totalFreeLance = freelancer.length;

  //let totalFreeLance = freelancer.reduce((acc, index) => acc + index, 1);

  //Getting average starting price by dividing the total of all starting prices divided by the total amount of freelancers than rounding to nearest whole number
  let avgStartPri = Math.floor(accStartPri / totalFreeLance);

  // update the average price every time function is called-adrian
  const p = document.querySelector("#freelancer-average");
  p.textContent = `The average starting price is $${avgStartPri}`;

  //return avgStartPri;
}

/*adrian & ryan- render the freelancers*/
const renderNewLine = (person) => {
  // creates a new line in the table
  const tr = document.createElement("tr");

  // create the individual cells inside that line
  const firstName = document.createElement("th");
  const occupation = document.createElement("th");
  const startingPrice = document.createElement("th");

  // add the text content to each cell
  firstName.textContent = person.name;
  occupation.textContent = person.occupation;
  startingPrice.textContent = `$${person.startingPrice}`;

  // add the new elements to HTML
  const table = document.querySelector("#freelancer-entries");
  table.appendChild(tr);
  tr.appendChild(firstName);
  tr.appendChild(occupation);
  tr.appendChild(startingPrice);
};

// Ryan & Adrian
const main = (objList) => {
  // run generator
  const newFreelancer = genFreelancer(randNames, randOccupations);
  objList.push(newFreelancer);

  // append new freelancer
  renderNewLine(newFreelancer);

  // update average starting price
  avgStartPri(objList);
};

// render first two freelancers & avg price 
renderNewLine(freelancers[0]);
renderNewLine(freelancers[1]);
avgStartPri(freelancers);

// run main func
const runMain = setInterval(() => {
  main(freelancers);
}, 3000);
