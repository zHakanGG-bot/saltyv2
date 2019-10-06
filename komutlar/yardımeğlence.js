const Discord = require('discord.js');

let botid = ('616144893399662602') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setAuthor(`${client.user.username} Eğlence Komutları`)
    .addField(`${client.emojis.get("622503584356892680")}**>** **!!balıktut Balık tutarsınız.**`) 
    .addField(`${client.emojis.get("622503584356892680")}**>** **!!efkar Efkarınızı Ölçersiniz.**`)
    .addField('!!slots', 'Emojiler ile kapışırsınız.')
    .addField('!!aşkölçer', 'Kullanıcıyı ne kadar seviyorsunuz?')
    .addField('!!mkasözleri', 'Atamızın sözlerini atar.')
    .addField('!!8ball', 'Sorulan sorulara cevap verir.')
    .addField('!!bulanık', 'Etiketlenen Kişinin avatarına Bulanık Efekti Verir.')
    .addField('!!piksel', 'Etiketlenen Kişinin avatarına Piksel Efekti Verir.')
    .addField('!!adamol', 'Avatarınıza Adam Efekti Verir.')
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
  name: 'eğlence',
  description: '',
  usage: ''
};