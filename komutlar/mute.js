const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;


var mutelirolu = "muted" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {

  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  if(mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(`:warning: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

  if(!mutezaman) return message.reply(`<a:carpi:616152962938568733> | Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)

  await(mutekisi.addRole(muterol.id));
  message.channel.send(`<a:tikk:616152962296840193> | <@${mutekisi.id}> kullanıcısı ${args[1]} süresi boyunca susturuldu!`);

  setTimeout(function(){
    mutekisi.removeRole(muterol.id);
    message.channel.send(`<:oke:616540844408832010> | <@${mutekisi.id}> kullanıcısının susturulma süresi sona erdi!`);
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: "mute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };