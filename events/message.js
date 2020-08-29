const { owners, prefix } = require("../config.json");

module.exports = async (client, message) => {
  if(message.author.bot) return; // игнор ботов
  if(message.channel.type == "dm") return; // Если сообщение в лс, то ничего не делать

  const args = message.content.split(/ +/g);
  const command = args.shift().slice(prefix.length).toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);

  if(!message.content.toLowerCase().startsWith(prefix)) return;

  if(!cmd) return;
  if(!message.guild.me.permissions.has(["SEND_MESSAGES"])) return; // Если нету прав на отправление сообщений, то ничего не делать

  if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
  return message.channel.send("Данная команда только для вледелеца бота!");

  if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
  return message.channel.send(`У вас недостаточно прав для этой команды`);

  if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
  return message.channel.send("У меня недостаточно прав для данной команды!")

  cmd.run(client, message, args);
}
