const cliCommands = require('yarn/lib/cli/commands');
const hyphenate = (string) => string.replace(/[A-Z]/g, (match) => ('-' + match.charAt(0).toLowerCase()));

// A command like object that will gets passed to yarn commands' setFlags
// method when it exists to determine sub commands and flags.
class CommanderLike {
  constructor (command) {
    this.command = command;
    this.subCommands = [];
    this.flags = [];
  }

  usage (str) {
    let secondWord = str.split(' ')[1];
    if (!secondWord) return;
    let subCommands = secondWord.split('|').map((s) => s.replace(/\[|\]/g, ''))
    if (subCommands.length <= 1) return;
    this.subCommands = subCommands;
  }

  option (flag, description) {
    // cleanup flags from bracket wrapped arguments
    flag = flag.replace(/\[[^\]]+\]/g, '').trim();

    let parts = flag.split(',');
    if (parts.length <= 1) {
      return this.flags.push(`${flag}:${description}`);
    }

    // have alias or several flags with same meaning
    parts.forEach((flag) => this.flags.push(`${flag}:${description}`));
  }

  arguments () {}
}

module.exports = Object.keys(cliCommands).map((command) => {
  let cmd = cliCommands[command];
  let flags = [];
  let subCommands = [];

  if (cmd.setFlags) {
    let commanderLike = new CommanderLike(command);
    cmd.setFlags(commanderLike);
    flags = commanderLike.flags;
    subCommands = commanderLike.subCommands;
  }

  return {
    command: hyphenate(command),
    flags: flags,
    subCommands: subCommands
  };
});
