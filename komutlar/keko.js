const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

var prefix = ayarlar.prefix;




exports.run = (bot, message, args) => {
    if (args.length < 1) return message.channel.send("**Keko Gibi Yazmam İçin Birşeyler Yaz.**")
    message.channel.send(args.map(randomizeCase).join(' '));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kekoyazı", "keko", "kecho"],
  permLevel: 0
};

exports.help = {
  name: 'keko-yazı',
  description: 'Keko Yazı.',
  usage: 'keko-yazı <mesaj>'
}