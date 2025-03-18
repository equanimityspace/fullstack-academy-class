/*
Combination: 10 - 40 - 39

1. Create string saying 
    "You have received this message because you have been chosen to open an important vault. Here is the secret combination:"
2. Assign three variables
    - each variable contains the corresponding result of a calculation with unique arithmetic operator
3. Add comments throughout code
4. Create dialog box displaying codes and the text -- html alert box
*/

// Declare each variable (using const because they will never change)
// As we declare them, can use arithmetic to get int we want
const a = 2 * 5;
const b = 120 / 3;
const c = 21 + 18;

// Also declare the string as a const because it will not change
const message =
  "You have received this message because you have been chosen to open an important vault. Here is the secret combination:";

// Create an alertbox in my html page displaying the message and the code seperated by -
alert(message + "\n" + `${a} - ${b} - ${c}`);
