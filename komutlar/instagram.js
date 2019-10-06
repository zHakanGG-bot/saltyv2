const Discord = require('discord.js')
const instagram = require("user-instagram")
 
exports.run = (client, message, args) => {
    let kullanici = args.join(' ');
    if(!kullanici) return message.reply(`Bir kullanıcı adı girmedin`)

instagram('https://www.instagram.com/' + kullanici)
.then(data => {

  const biocuk = (data.bio.length === 0 ? 'Yok' : data.bio)  
  const isimcik = (data.fullName.length === 0 ? 'Yok' : data.fullName)

  var gizlimi;
  var onaylimi;

  if (data.isPrivate === false) gizlimi = "Hayır"
  if (data.isPrivate === true) gizlimi = "Evet"
  if (data.isVerified === false) onaylimi = "Hayır"
  if (data.isVerified === true) onaylimi = "Evet"

    const embed = new Discord.RichEmbed()
    .setColor('AEED13')
    .setAuthor(`${kullanici} instagram hesabı hakkında bilgi`)
    .setThumbnail(`${data.avatarHD}`)
    .addField('Tam ismi:', isimcik)
    .addField('Takipçi sayısı:', `${data.subscriberCount}`)
    .addField('Takip ettiği kişi sayısı:', `${data.subscribtions}`)
    .addField('Gönderi sayısı:', `${data.postCount}`)
    .addField('Biografisi:', biocuk)
    .addField('ID:', `${data.id}`)
    .addField('Profili gizli mi?', `${gizlimi}`)
    .addField('Profili onaylanmış mı?', `${onaylimi}`)
    .addField(':diamonds: Hesabın linki:', `${data.profileLink}`)
    .setTimestamp()
    .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
    
  message.channel.send(embed)
}) 
}

exports.conf = {
    enabled: true, 
    guildOnly: true, 
    aliases: [],
    permLevel: 0 
  };
  
  exports.help = {
    name: 'instagram', 
    description: 'Belirlenen instagram hesabı hakkında bilgi verir.',
    usage: 'instagram <hesap ismi>'
  };