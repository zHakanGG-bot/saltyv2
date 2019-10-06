const Discord = require('discord.js');

let botid = ('616144893399662602') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    message.channel.send(" **Botumuza destek olurmusunuz?**  \n\nDestek vererek iyi yerlere gelmemizi sağlayabilirsin.\nEğer destek olmak isterseniz alttaki linke tıklayabilirsiniz.\n\nhttps://www.bestdiscordbots.xyz/vote/620986732464046080")

};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['oyver'],
  permLevel: 0,
};

exports.help = {
  name: 'oy',
  description: '',
  usage: ''
};