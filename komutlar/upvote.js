const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjE0NDg5MzM5OTY2MjYwMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY3OTcwMzc5fQ.uV6--5slJjiDY2GDWNSBT8PnE5o-YLELs3HSYrLk7ak', client);
exports.run = (client, message) => {
  var role = message.guild.roles.find(role => role.name === "Destekçiler");
    dbl.hasVoted(message.author.id).then(voted => {
        if (!voted) {
            message.reply("Bu komutu kullanabilmek için Discord Bot List üzerinden oy vermen gerekiyor. (Eğer oy verdiyseniz bir kaç dakika bekleyiniz.) \nOy vermek için: https://www.bestdiscordbots.xyz/vote/620986732464046080")

        } else {
            message.channel.send("< | Başarıyla **Destekçiler** adlı rol verildi. Botumuza **oy verdiğiniz** için teşekkür ederiz.");
            message.member.addRole(role);

        }
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["upvote", "oyverdim"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'oyver',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar <@kişi-etiket> <sebep>'
};