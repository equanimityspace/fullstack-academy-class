class catInfo {
  constructor(name, age, weight) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  }

  getInfo() {
    console.log(
      `${this.name} is ${this.height} years old and weighs ${this.weight}lbs.`
    );
  }
}

const catOne = new catInfo("Mittens", "0.5", "3");
catOne.getInfo();
console.log(catOne.name);
