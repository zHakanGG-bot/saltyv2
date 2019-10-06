const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let slots = [":smile:",  ":poop:",":rage: "];
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  let name = message.author.displayName;
  let msg = await message.channel.send("**Emoji Slot Oynatılıyor**");
  let aicon = message.author.displayAvatarURL;    
      if (slots[result1] === slots[result2] && slots[result3]){ 
      let wEmbed = new Discord.RichEmbed()
       .setFooter("Kazandınız !",aicon)
       .setTitle(':slot_machine:Emoji Slot:slot_machine:')
       .addField('Sonuç:', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("#f4e842");
      await message.channel.send(wEmbed);
       
          }else {
       
       let embed = new Discord.RichEmbed()
       .setFooter('Kaybettiniz !',aicon)
       .setTitle(':slot_machine:Emoji Slot:slot_machine:')
       .addField('Sonuç', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("#f4e842");
     await  message.channel.send(embed);
      
       }   
  if (slots[result1] ==  slots[result2] == slots[result1] && slots[result3] == slots[result1]){
    let embed = new Discord.RichEmbed()
       .setFooter('Jackpotu kazandın!',aicon)
       .setTitle(':slot_machine:Emoji Slot:slot_machine:')
       .addField('Sonuç', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("#f4e842");
     await  message.channel.send(embed);
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojislot'],
  permLevel: 0
};

exports.help = {
  name: 'emojislot',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};