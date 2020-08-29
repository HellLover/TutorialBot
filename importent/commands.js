const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");

module.exports.run = (client) => {
  for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))) {
    const props = require(`${filePath}/${cmd}`);
    client.commands.set(props.help.name, props);

    if(props.help.aliases) for (const alias of props.help.aliases) {
      client.aliases.set(alias, props);
    }
  }

  console.log(`Загружено ${client.commands.size} команд`)
}
