const cliCommands = require('./yarn-commands');
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
    const secondWord = str.split(' ')[1];
    if (!secondWord) return;
    console.log(typeof secondWord);
    const subCommands = secondWord.split('|').map((s) => s.replace(/\[|\]/g, ''))
    if (subCommands.length <= 1) return;
    this.subCommands = subCommands;
  }

  option (flag, description) {
    // cleanup flags from bracket wrapped arguments
    flag = flag.replace(/\[[^\]]+\]/g, '').trim();

    const parts = flag.split(',');
    if (parts.length <= 1) {
      return this.flags.push(`${flag}:${description}`);
    }

    // have alias or several flags with same meaning
    parts.forEach((flag) => this.flags.push(`${flag}:${description}`));
  }

  arguments () {}
}

module.exports = cliCommands.map((cmd) => {
  let flags = [];
  let subCommands = [];
  const command = hyphenate(command);

  const res = { flags, command, subCommands };

  if (!cmd.setFlags) return;

  return {
    flags,
    subCommands,
    command: commanderLike
  }
});
