const Discord = require('discord.js');


exports.run = function(client, message) {

    message.channel.send("Pingim **" + client.ping + "** ms!");
  message.react('616152962296840193')
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['p'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};