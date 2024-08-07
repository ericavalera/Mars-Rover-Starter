class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let results = [];

    for (let i = 0; i < message.commands.length; i++) {

      let commandMessage = message.commands[i].commandType;
      let commandValue = message.commands[i].value;

      if (commandMessage === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
        
      } else if (commandMessage === "MODE_CHANGE") {
        this.mode = commandValue;
        results.push({ completed: true });

      } else if (commandMessage === "MOVE") {
        if (this.mode !== "LOW_POWER") {
          this.position = commandValue;
          results.push({ completed: true });

        } else {
          results.push({ completed: false });
        }
      }
    }
    return {
      message: message.name,
      results: results,
    };
  }
}

module.exports = Rover;
