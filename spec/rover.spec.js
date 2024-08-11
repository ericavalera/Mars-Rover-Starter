const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function () {
   // let commands=[new Command("MOVE", 200)];
   // let message=new Message("rover test", commands);
    let rover= new Rover(100);
    //rover.receiveMessage(message);

    expect(rover.generatorWatts).toEqual(110);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.position).toEqual(100);
  });

  // test 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("message name", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("message name");
  });

  //test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command("STATUS_CHECK"), new Command("MOVE")];
    let message = new Message("test message with two commands", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(commands.length);
  });

  //test 10
  test("responds correctly to the status check command", function () {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("status check", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(message);
    let roverResponse = {
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
      position: rover.position
    };

    expect(response.results[0].roverStatus).toEqual(roverResponse);
  });

  //test 11
  test("responds correctly to the mode change command", function () {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let rover = new Rover(100);
    let message = new Message("test message", commands);
    rover.receiveMessage(message);

    expect(rover.mode).toEqual("LOW_POWER");
  });

  //test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commands= [new Command ("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 200)];
    let rover= new Rover(100);
    let message= new Message("attempting move in low power mode", commands);
    let response= rover.receiveMessage(message);

    expect(response.results[1]).toEqual({"completed": false});
    expect(rover.position).toEqual(100);
    
  });

  //test 13
  test("responds with the position for the move command", function () {
    let commands=[new Command("MOVE", 40)];
    let rover= new Rover(100);
    let message= new Message("rover to move to new position", commands);
    rover.receiveMessage(message);

    expect(rover.position).toBe(40);
  });
});
