const arrayOne = [];
const arrayTwo = [];

for (let i = 0; i <= 1000000; i++) {
  arrayOne.push(i);
}

for (let i = 0; i <= 1000000; i++) {
  arrayTwo.push(i);
}

const t0 = performance.now();
arrayOne.push(10);
const t1 = performance.now();
arrayTwo.unshift(10);
const t2 = performance.now();

console.log(`time to push: ${t1 - t0}ms`);
console.log(`time to unshift: ${t2 - t1}ms`);
