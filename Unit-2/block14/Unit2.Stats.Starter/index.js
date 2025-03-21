// === DO NOT EDIT THIS REGION ===
// Read the comments to understand how the program is structured.

// Prompt the user for a list of integers separated by commas.
const userInputString = prompt(
  "Please enter some integers separated by commas.",
  "1,2,3,4,5"
);

// Split the string of numbers into an array of strings.
const stringArray = userInputString.split(",");

// Convert the array of strings into an array of numbers.
const numbers = [];
for (let i = 0; i < stringArray.length; i++) {
  const str = stringArray[i];
  const number = parseInt(str);
  numbers.push(number);
}

// Peform some calculations on the numbers.
console.log(numbers);
console.log(`You have given ${getLength(numbers)} numbers.`);
console.log(`The sum of your numbers is ${getSum(numbers)}.`);
console.log(`The mean of your numbers is ${getMean(numbers)}.`);
console.log(`The smallest of your numbers is ${getMin(numbers)}.`);
console.log(`The largest of your numbers is ${getMax(numbers)}.`);
console.log(`The range of your numbers is ${getRange(numbers)}.`);
console.log(`The even numbers you gave are ${getEvens(numbers)}.`);
console.log(`The odd numbers you gave are ${getOdds(numbers)}.`);

// === EDIT THE CODE BELOW ===
// Complete the functions below to make the program work!

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the length of the array
 */
function getLength(numbers) {
  return numbers.length;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the sum of the numbers
 */
function getSum(numbers) {
  // return Math.getSum(numbers);
  let sum = 0;
  for (num of numbers) {
    // MAYBE for (let i = 0; i < numbers.length; i++) {}
    sum += num;
    // sum = sum + num
  }
  return sum;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the mean of the numbers
 */
function getMean(numbers) {
  // return Math.getMean(numbers);
  return getSum(numbers) / numbers.length;
  // numbers1 = [1, 2, 3, 4, 5];
  // (1 + 2 + 3 + 4 + 5) / 5
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the smallest of the numbers
 */
function getMin(numbers) {
  // return Math.getMin(numbers);
  let min = numbers[0];
  for (let i; i <= numbers.length + 1; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }
  return min;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the largest of the numbers
 */
function getMax(numbers) {
  let max = numbers[0];
  for (num of numbers) {
    if (max < num) {
      max = num;
    }
  }
  return max;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number} the range of the numbers (max - min)
 */
function getRange(numbers) {
  return `${getMax(numbers)} - ${getMin(numbers)}`;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number[]} the even numbers in the array
 */
function getEvens(numbers) {
  const evens = [];
  for (num of numbers) {
    if (num % 2 === 0) {
      evens.push(num);
    }
  }
  return evens;
}

/**
 * @param {number[]} numbers an array of integers
 * @returns {number[]} the odd numbers in the array
 */
function getOdds(numbers) {
  const odds = [];
  for (num in numbers) {
    if (num % 2 !== 0) {
      odds.push(num);
    }
  }
  return odds;
}
