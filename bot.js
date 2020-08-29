const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const client = new Discord.Client();

client.prefix = prefix;
client.aliases = new Discord.Collection();
client.commands = new Discord.Collection();

const commands = require("./importent/commands");
commands.run(client);

const events = require("./importent/events");
events.run(client);

client.on("guildMemberAdd", member => {

  const role = member.guild.roles.cache.find(r => r.name === "Зашедший");

  member.roles.add(role)

  const channel = client.channels.cache.get("742687873265958947")

  channel.send(`Пользователь ${member.user.tag} зашёл на наш сервер, добро пожаловать.`)
})

client.on("guildMemberRemove", member => {

  const channel = client.channels.cache.get("742687873265958947")

  channel.send(`Пользователь ${member.user.tag} покинул наш сервер.`)
})

client.login(process.env.token);
