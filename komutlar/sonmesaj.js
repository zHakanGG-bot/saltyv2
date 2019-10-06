const Discord = require('discord.js')
const moment = require('moment')
const client = new Discord.Client();

const botadi = "Botify"

exports.run = async (bot, msg, args) => {
  
        let simdikitarih = moment.utc(msg.createdAt).format('DD MM YYYY');
  
        let user = msg.mentions.users.first() || msg.author;
  
        let userinfo = {};
        userinfo.avatar= user.displayAvatarURL;
        userinfo.id = user.id;
       
  
        userinfo.sonmesaj = user.lastMessage || "Son yazılan mesaj bulunamadı." || "Son yazılan mesaj gösterilemedi."
  
      
     
        const uembed = new Discord.RichEmbed()
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
       
        
        .addField(`Son gönderdiği mesaj:`, userinfo.sonmesaj, false)
        .setFooter(`${botadi} || Son Mesaj Sistemi`)
        msg.channel.send(uembed)
    }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['son-mesaj'],
  permLevel: 0
};

exports.help = {
  name: 'sonmesaj',
  description: 'İstediğiniz kullanıcını bilgilerini gösterir.',
  usage: 'kullanıcı-bilgi'
};