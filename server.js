const notes = require("./notes");
var _ = require("lodash");

console.log("server file is available");
var number = notes.num;
var addition = notes.addNumber(number + 10, 10);
console.log(number);
console.log("addition is:", +addition);

var data = ["person", "person", 1, 2, 1, 2, "name", "age", "2"];
var filter = _.uniq(data);
console.log(filter);

var x = 5;
console.log(x);
