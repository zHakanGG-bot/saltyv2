const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('⚠ Uyarı ⚠', '`davet` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(0xDF01A5)
        .addField('Botu Davet Et!', `[Tıkla!](BOT DAVET LİNKİ)`, true)
        .addField('Destek Sunucusu!', `[Tıkla!](https://discord.gg/tFCP9fm)`)
    .setFooter('Davet Sistemi', message.guild.ImageURL)
    return message.channel.sendEmbed(sunucubilgi);
    }
};


exports.conf = { // Özel ayarları belirtiyoruz.
	enabled: true, // Aktif mi değil mi? (true, false)
	guildOnly: true, // Sadece sunucuda mı kullanılsın? (true, false)
	aliases: [], // Sadece komutu değilde bunlarıda yazarsa bu işlemi gerçekleştir diyoruz.
	permLevel: 0,
	kategori: 'bot' // Yardım komutunda gözükecek kategoriyi belirtiyoruz.
}

exports.help = { // Ana ayarları belirtiyoruz.
	komut: 'davet', // Komutu belirtiyoruz.
	description: 'Bu bir örnek komuttur.', // Yardımda gözüken açıklamayı belirtiyoruz.
	usage: 'özel' // Yardımda gözükecek kullanımı belirtiyoruz.
}
//Davet resetlendi, destek sunucusunu ve bot davet linkinin tekrar giriniz.