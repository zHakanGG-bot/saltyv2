const ayarlar = require("../ayarlar.json")    
const db = require('quick.db')
const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args) => {
 if(message.author.id != ayarlar.sahip) { return message.channel.send(":x: Sahibimin Komutunu Kullanamazsın")}

  let nesne = args[0]
  if (!nesne) return message.channel.send('Bir kullanıcının IDsini girmelisin?')
  
  db.delete(`gold_${nesne}`)
  
  message.channel.send(`\`${nesne}\` IDli kullanıcı artık gold üye değil!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["goldçıkar"],
  permLevel: 4
};
exports.help = {
  name: 'goldsil',
  description: '[Admin Komutu]',
  usage: 'goldsil <ID>'
};