const Discord = require('discord.js');

let botid = ('616144893399662602') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField(`  !!ban @kulanıcı Sebep Sunucudan belirtilen kullanıcıyı yasaklar.`)
    .addField(`  !!at @kulanıcı Sebep Sunucudan belirtilen kullanıcıyı atar.`)
    .addField(`  !!otorol @Rol İsmi #Mesaj Kanalı Sunucuya katılanlara otomatik rol verir.`)
    .addField(`  !!otorol-kapat Sunucuya katılanlara otomatik rol verme sistemini kapatır.`)
    .addField(`  !!sayaç Hedef ( Örnek: 100 ) #Kanal Sunucunuz için sayaç ayarlama komutudur. `)
    .addField(`  !!güvenlik #kanal Sunucuya katılan üyelerin güvenli olup olmadığını belirtir.`)
    .addField(`  !!reklam-filtresi Sunucunuzda reklam yapılmasını yasaklarsınız.`)
    .addField(`  !!sa-as Sunucunuzda "SA" yazıldığı zaman cevap verme ayarı. `)
    .addField(`  !!slowmode Bir yazı kanalında minimum mesaj atma hızını ayarlarsınız.`)
    .addField(`  !!sunucu-bilgi Sunucunuzun gerekli bilgileri ( Sadece Yöneticiler )`)
    .addField(`  !!temizle Sohbeti temizlemenizi sağlar.`)
    .addField(`  !!küfür-engelle Sunucunuzdaki küfürleri Botify sayesinde engellersiniz.`)
    .addField(`  !!capslock-engel Çok fazla büyük harfli mesajları engeller.`)
    .addField(`  !!level ödül @rol Level atlayınca kullanıcılara verilecek ödülü belirlersiniz.`)
        .addField(`  !!!log #kanal Sunucu kayıtlarının atılacağı kanalı ayarlarsınız.`)
    .addField(`  !!!destek-kanal #kanal Mesaj yazılınca yardım kanalının açılacağı kanalı ayarlar.`)
.addField(`  !!!destek-rol @rol Destek kanallarını görebilecek kişileri ayarlarsınız.`)
    .addField(`  !!kurulum  Sunucu İçin gerekli Kanalları Kurar.`)
    .addField(`  !!herkeserolver herkese etiketlenen rolu verir.`)
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/api/oauth2/authorize?client_id=620986732464046080&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/t49RgBR) **|** [Bota Oy Ver (Vote)](https://www.bestdiscordbots.xyz/vote/620986732464046080) **|** [Web Sitesi](https://saltyboth.glitch.me/)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};