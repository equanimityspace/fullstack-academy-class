// Complete the Numbers class below
// the constructor has already been provided
class Numbers {
  constructor(data) {
    //data can either be a string or an array of numbers
    if (typeof data === "string") {
      this.data = str.split(",").map((number) => number * 1);
    } else {
      this.data = data;
    }
  }
  count() {
    return this.data.length;
  }
  printNumbers() {
    this.data.forEach((num) => {
      console.log(num);
    });
  }
  odds() {
    const oddNumbers = [];
    this.data.forEach((num) => {
      if (num % 2 !== 0) {
        oddNumbers.push(num);
      }
    });
    return oddNumbers;
  }
  evens() {
    const evenNumbers = [];
    this.data.forEach((num) => {
      if (num % 2 === 0) {
        evenNumbers.push(num);
      }
    });
    return evenNumbers;
  }
  sum() {
    return this.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
  product() {
    return this.data.reduce(
      (accumulator, currentValue) => accumulator * currentValue
    );
  }
  greaterThan(target) {
    return this.data.filter((num, target) => num > target);
  }
  howMany(target) {
    let count = 0;
    for (let i of this.data) {
      if (i === target) {
        count += 1;
      }
    }
    return count;
  }
}

//Prompt the user for a list of integers separated by commas
const str = prompt("enter some numbers, like this", "1,2,3,3,5,9");

//create an instance of numbers
const n1 = new Numbers(str);
console.log(n1.count()); //returns count of numbers
n1.printNumbers(); //prints the number along with their indexes
console.log(n1.odds()); //returns odd numbers
console.log(n1.evens()); //returns even numbers
console.log(n1.sum()); //returns sum of numbers
console.log(n1.product()); //returns product of numbers
console.log(n1.greaterThan(3)); //returns numbers greater than another number
console.log(n1.howMany(3)); //return the count of a specific number
