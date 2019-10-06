const Discord = require('discord.js');
var ayarlar = require('../ayarlar.json');
const fs = require('fs');
let girisCikis = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin
let profil = JSON.parse(fs.readFileSync("./otorol.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin
let gkanal = JSON.parse(fs.readFileSync("./ayarlar/anan.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8")); //Gerekli jsonları oluşturun sizde olmayan kodlarınkini silin

exports.run = (client, message) => {
  
  
  var embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`${message.guild.name}`, client.user.avatarURL)
  .setDescription(`**Sunucudaki Ayarlar**`)
  .addField("**Giriş Çıkış Kanalı**", girisCikis[message.guild.id] ? `${client.emojis.get("622830061745209365")} <#${girisCikis[message.guild.id].resim}>` : `${client.emojis.get("622830062101594144")} Ayarlanmamış`, true)
  .addField("**Otorol**", profil[message.guild.id]  ? `${client.emojis.get("622830061745209365")} <#${profil[message.guild.id].kanal}> <@&${profil[message.guild.id].sayi}>` : `${client.emojis.get("622830062101594144")} Ayarlanmamış`, true)
  .addField("**Sayaç**", sayac[message.guild.id] ? `${client.emojis.get("622830061745209365")} <#${sayac[message.guild.id].kanal}> | ${sayac[message.guild.id].sayi}` : `${client.emojis.get("622830062101594144")} Ayarlanmamış`, true)
  .addField("**Link Engelleme**", linkEngel[message.guild.id] ? `${client.emojis.get("622830061745209365")} ${linkEngel[message.guild.id].linkEngel}` : `${client.emojis.get("622830062101594144")} Kapalı`, true)
  .addField("**Küfür Engelleme**", küfürEngel[message.guild.id] ? `${client.emojis.get("622830061745209365")} ${küfürEngel[message.guild.id].küfürEngel}` : `${client.emojis.get("622830062101594144")} Kapalı`, true)
  .addField("**Davet Takip**", gkanal[message.guild.id] ? `${client.emojis.get("622830061745209365")} <#${gkanal[message.guild.id].baban}> ` : `${client.emojis.get("622830062101594144")} Ayarlanmamış`, true)
  
  message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucuayarları','sunucu-ayarları'],
    permLevel: `Yönetici izni gerekiyor.`
  };
  
  exports.help = {
    name: 'ayarlar',
    category: 'ayarlar',
    description: 'Sunucu ayarlarını gösterir.',
    usage: '!ayarlar'
  };