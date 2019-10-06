const Discord = require('discord.js');
const p = require('../ayarlar.json').prefix;

exports.run = function(client, message, args) {
//Komutun Kodları
  const db = require('quick.db');
  const ee  = args.join(' ');
  if(!ee) return message.channel.send(
  new Discord.RichEmbed()
    .setTitle('** Komut hatası**')
    .setDescription('** `'+p+'sa-as aç` veya `'+p+'sa-as kapat` yazın**')
    .setColor('AEDD13')
  )
  if(ee === "aç"){
    db.set(`saas_${message.guild.id}`,'acik');
    message.channel.send(
    new Discord.RichEmbed()
      .setTitle('**Başarılı!**')
      .setColor('AEDD13')
      .setDescription('Bundan sonra selam verildiğinde bot cevap verecek!')
    )
  }
  else if(ee === "kapat"){
    db.set(`saas_${message.guild.id}`,'kapali');
    message.channel.send(
    new Discord.RichEmbed()
      .setTitle('**Başarılı!**')
      .setColor('AEDD13')
      .setDescription('Bundan sonra selam verildiğinde bot cevap vermeyecek!')
    )
  }
 };

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['saas'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 3 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'sa-as',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Sunucunuzda sa dendiğinde as denip denmeyeceğine karar verir.',//Komutun Açıklaması
  category:'sunucu',
  usage: 'sa-as aç/kapat' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}
