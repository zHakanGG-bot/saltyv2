const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let arg = args.slice(0).join(' ');
  if(arg < 1) return message.channel.send("Lütfen ayarlamak istediğiniz ön-eki yazınız! \n(`varsayılan` yazarsanız botun orjinal ön ekini ayarlayacaktır.)")

  if (arg === "!!") return message.reply("Botun orjinal ön ekini özel ön ek olarak ayarlayamazsın! \nEğer ön ekin botun normal ön eki olmasını istiyorsan `ve!` yerine `varsayılan` yazarak ön-ek komutunu kullan!")
  
  if (arg === "varsayılan") {
    
    db.delete(`prefix_${message.guild.id}`)
    
  
    message.channel.send("<:doru:619596371879657513> | Ön-Ek sıfırlanıp `!!` olarak ayarlanmıştır!")
    
    return;
  }
  
  var i = db.set(`prefix_${message.guild.id}`, arg)
    
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Ön-Ek Başarıyla Değiştirildi!")
    .addField("Ayarlanan Ön-Ek", `\`${i}\``)
    message.channel.send(embed)
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["önek", "prefix", "ön-ek-belirle", "ön-ek-ayarla", "önek-ayarla", "önek-belirle", "prefix-ayarla", "prefix-belirle"],
  permLevel: 3,
  kategori: "ayarlar"
};

exports.help = {
  name: 'ön-ek',
  category: 'ayarlar',
  description: 'Botun ön ekini sunucuya özel olarak değiştirir.',
  usage: 'ön-ek <ön ek>'
};