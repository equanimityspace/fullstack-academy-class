// The plan:
// make arr for odd even bank - done
// add num to bank, clear form - done
// error if not int
// func oddOrEven
// render in Odd, Even, bank

// get html components
const form = document.querySelector("form");
const numBank = document.querySelector("#numberBank output");
const oddOutput = document.querySelector("#odds output");
const evenOutput = document.querySelector("#evens output");

// buttons
const sortOne = document.querySelector("#sortOne");
const sortAll = document.querySelector("#sortAll");

// get text in element to clear it later
const input = document.getElementById("number");

// arrays idk if I need all of them yet though
let arrBank = [];
const arrEven = [];
const arrOdd = [];

// if num is even return true, else return false
const checkIfEven = (num) => {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

// render num bank
const renderBank = () => {
  numBank.textContent = arrBank;
};

// render odds
const renderOdds = () => {
  oddOutput.textContent = arrOdd;
};

// render evens
const renderEvens = () => {
  evenOutput.textContent = arrEven;
};

// add number to bank event handler
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const num = data.get("number");

  // make sure that input is a number, if so add to num bank
  if (typeof (num * 1) === typeof 1 && num !== "") {
    arrBank.push(num);
  } else {
    return;
  }
  // clear input field
  input.value = "";
  main();
});

// sort 1 button: sorts the last item in list
sortOne.addEventListener("click", function (event) {
  // remove and manipulate first number in number bank
  const num = arrBank.shift();
  const boolEven = checkIfEven(num);
  // check if even or odd
  if (boolEven === true) {
    arrEven.push(num);
  } else {
    arrOdd.push(num);
  }

  main();
});

sortAll.addEventListener("click", function (event) {
  // iterate through arrBank to check if each num is even or odd
  for (let num of arrBank) {
    if (checkIfEven(num)) {
      arrEven.push(num);
    } else {
      arrOdd.push(num);
    }
  }

  // clear arr bank
  arrBank = [];
  main();
});

const main = () => {
  renderBank();
  renderEvens();
  renderOdds();
};
