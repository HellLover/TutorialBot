module.exports = (client) => {
  client.user.setActivity("Звуки природы", {
    type: "STREAMING",
    url: "https://twitch.tv/chilledcow"
  })
  console.log("Подключились")
}
