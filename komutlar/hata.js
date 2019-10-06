const Discord = require('discord.js');
const client = new Discord.Client();
const { stripIndents } = require('common-tags');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('hata-bildir').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('hata-bildir').help.enname
    }
    const dil = client[s]
    const o = a
  
  let args = message.content.split(' ').slice(1);
  const hata = args.slice(0).join(' ');
  if (hata.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
 

    message.reply(dil.basarili);

    var hataHook = new Discord.WebhookClient("620279314138660885", "X2oTTjj3II5-WFlUmO0ugemLwKQ2EXA7XkM7UY0UEpr2AzKMh2MTCfQ1_Jbh4VlyTdxk")

    var embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle(`_» Bende Bir Hata Bulmuşlar! «_`)
    .addField(`Bildiren Kullanıcı`, message.author.tag)
    .addField(`Bildirilen Sunucu`, message.guild.name)
    .addField(`Bildirilen Hata`, hata)
    hataHook.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hata', 'bug', 'bug-bildir'],
  permLevel: 0,
    kategori: "iletisim",
  category: "contact"
};

exports.help = {
  name: 'hata-bildir',
  category: "iletisim",
  description: 'Bottaki bir hatayı bildirmenizi sağlar.',
  usage: 'hata-bildir <bulduğunuz hata>',
  enname: 'report-error',
  endescription: 'It allows you to report a error.',
  enusage: 'report-error <error you find>'
};