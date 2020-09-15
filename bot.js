const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { token, prefix } = require("./config.json");
const client = new Discord.Client();
const logs = require("discord-logs");
logs(client)

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

client.on("messageDelete", message => {

  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`Сообщение было удалено в <#${message.channel.id}>`)
  .addField("Автор", message.author)
  .addField("Содержимое", message.content)
  .setFooter(`ID: ${message.id}`)
  .setTimestamp()
  client.channels.cache.get("755356920956846100").send(embed)
})

client.on("messageContentEdited", (message, oldContent, newContent) => {
  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`**[Сообщение](${message.url}) было изменено в <#${message.channel.id}>`)
  .addField("Автор", message.author)
  .addField("Старое Содержимое", oldContent)
  .addField("Новое Содержимое", newContent)
  .setFooter(`ID: ${message.id}`)
  .setTimestamp()
  client.channels.cache.get("755356920956846100").send(embed)
})

client.on("channelCreate", channel => {
  if(channel.type === "voice") {
    ch = "Голосовой"
  } else {
    ch = "Текстовый"
  }

  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Создан канал`, channel.guild.iconURL({ dynamic: true }))
  .addField("Название", `${channel} (${channel.name})`)
  .addField("ID", channel.id)
  .addField("Тип", ch)
  .setTimestamp()
  client.channels.cache.get("755356920956846100").send(embed)
})

client.on("channelDelete", channel => {
  if(channel.type === "voice") {
    ch = "Голосовой"
  } else {
    ch = "Текстовый"
  }

  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`удален канал`, channel.guild.iconURL({ dynamic: true }))
  .addField("Название", `${channel} (${channel.name})`)
  .addField("ID", channel.id)
  .addField("Тип", ch)
  .setTimestamp()
  client.channels.cache.get("755356920956846100").send(embed)
})


client.login(token);
