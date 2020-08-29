module.exports.run = async (client, message, args) => {

  const msg = await message.channel.send("Набираем информацию...");

  msg.edit(`Понг. Задержка бота: ${client.ws.ping}мс`)
}

module.exports.help = {
  name: "ping",
  description: "Команда пинг",
  aliases: ["пинг"]
}

module.exports.requirements = {
  ownerOnly: false,
  clientPerms: [],
  userPerms: []
}
