const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let cinsiyet = args.slice(0).join(' ');
  if (!cinsiyet) return message.channel.send('Lütfen Cinsiyetini yaz. Unutma Sadece erkek,kadın veya yok yazabilirsin (caps lock ile yazarsan belli olmaz!)')
  message.channel.send(' | Cinsiyetin ``'+ cinsiyet +'`` olarak ayarlandı!')
  db.set(`pcinsiyet_${message.author.id}`, cinsiyet)
  
  
   };
;
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['cinsiyet', 'cinsiyet-ayarla'],
 permLevel: 0
};

exports.help = {
 name: 'cinsiyetayarla',
 
};