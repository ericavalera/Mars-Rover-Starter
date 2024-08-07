const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
  //test 4
  test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
    expect(function () {
      new Message();
    }).toThrow(new Error("Name required."));
  });

  //test 5
  test("constructor sets name", function () {
    let message = new Message("message name");
    expect(message.name).toEqual("message name");
  });
  //test 6
  test("contains a commands array passed into the constructor as the 2nd argument", function () {
    let commands = [new Command("MOVE"), new Command("STATUS_CHECK")];
    let message = new Message("test message with two commands", commands);
    
    //checks for commands in constructor
    expect(message.commands).toEqual(commands);
    //checks for array
    expect(Array.isArray(message.commands)).toEqual(true);
  });
});
