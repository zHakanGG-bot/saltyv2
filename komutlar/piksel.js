const Discord = require('discord.js');
const Jimp = require('jimp'); 

exports.run = (client, message, args) => {
if (!message.guild) {
      return message.channel.send(':no_entry: Kimin Resmini Piksel Cevirmemi Istersiniz?; `!!piksel @Kullanıcı');}
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(':no_entry: Kimin Resmini Piksel Cevirmemi Istersiniz?; `c!piksel @Kullanıcı`');
        Jimp.read(user.avatarURL || user.defaultAvatarURL, function (err, image){
            if (err) return message.channel.send(':no_entry: Kimin Resmini Piksel Cevirmemi Istersiniz?; `!!piksel @Kullanıcı`');
            image.pixelate(5).write('lenna-pixelate.jpg');
            setTimeout(() => {
              message.channel.sendFile('lenna-pixelate.jpg');
            }, 500);
        });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
      kategori: "Resim"
};

exports.help = {
  name: 'piksel',
  description: 'İstediğiniz Kisinin Resmini Piksel Yaparsiniz.',
  usage: 'piksel [user]'
};