const Discord = require('discord.js');
const Jimp = require('jimp'); 

exports.run = (client, message, args) => {

  if (!message.guild) {
      return message.channel.send(':no_entry: Kimin Resmini Bulanık Yapmamı Istersiniz; `!bulanık @Kullanıcı'); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(':no_entry: Kimin Resmini Bulanık Yapmamı Istersiniz; `f?bulanık @Kullanıcı');
        Jimp.read(user.avatarURL || user.defaultAvatarURL, function (err, image){
            if(err) return message.channel.send(err);
            image.blur(5).write('image.png');
            setTimeout(() => {
              message.channel.sendFile('image.png');
            }, 500);
        });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bulanık',
  description: 'İstediğiniz Kisinin Profil Resmini Bulanık Yaparsınız.',
  usage: 'bulanık [User]'
}; 