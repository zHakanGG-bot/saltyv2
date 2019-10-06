const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('AEED13')
        .setTitle(`${client.user.username} - Komutlar`)
        .setDescription(` | **${ayarlar.prefix}yetkili** Moderasyon Komutları.\n  | **${ayarlar.prefix}kullanıcı** Kullanıcıya Komutları.\n  |  **${ayarlar.prefix}eğlence** Eğlence Komutları.\n ` )
        .setThumbnail(client.user.avatarURL)
        .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/api/oauth2/authorize?client_id=620986732464046080&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/t49RgBR) **|** [Bota Oy Ver (Vote)](https://www.bestdiscordbots.xyz/vote/620986732464046080) **|** [Web Sitesi](https://saltyboth.glitch.me/)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(embed);


};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help', 'h', 'y'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};