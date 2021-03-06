const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) {
  
 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`<a:carpi:616152962938568733> | Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olmalısın!`);
  
  var x = args.slice(0).join(' ')
  
  if (!x) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (isNaN(x)) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (x < 1) return message.reply("**1** adetten az mesaj silemem!")
  if (x > 100) return message.reply("**100** adetten fazla mesaj silemem!")
  
  let fetched = await message.channel.fetchMessages({limit: args[0]})
  
  message.channel.bulkDelete(fetched)
  .catch(error => message.channel.send("`14` günden önceki mesajları silemem!"))
  
  message.channel.send(`<:doru:619596371879657513> | Başarıyla \`${args[0]}\` adet mesaj silindi!`).then(msg => {
	msg.delete(3000)
})
  
	message.delete();
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'temizle',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: 'temizle <miktar>'
};