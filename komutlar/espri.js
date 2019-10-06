const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, params) => {
  const DBL = require('dblapi.js')
  const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjE0NDg5MzM5OTY2MjYwMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY3OTcwMzc5fQ.uV6--5slJjiDY2GDWNSBT8PnE5o-YLELs3HSYrLk7ak', client) 
  
  dbl.hasVoted(message.author.id).then(voted => {
    if(voted) {
      var request = require('request');
      request('https://apiler.glitch.me/api/kaccm', function (error, response, body) {
     exports.run = (client, message) => {
   message.channel.send('Espiri yükleniyor.').then(message => {
      var espriler = ['Seni görünce; \ngözlerim dolar, \nkulaklarım euro.','Gidenin arkasına bakmayın yoksa geleni göremezsiniz.','+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.','+Kanka ben banyoya 3 kişi giriyom. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!','+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.','+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.','+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.','Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.','+Acıkan var mı ya? \n-Yok bizde tatlı kan var.','Yılanlardan korkma, yılmayanlardan kork.','+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.','Baraj Dendimi Akar Sular Durur', 'İphone Alacam \n 8 mi 10 Mu \n Birtane Yeter Kanka.','Aaa siz çok terlemişsiniz durun size terlik getireyim.','Aklımı kaçırdım, 100.000 TL fidye istiyorum.'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
            message.edit(`${espri}`);
 });
  

        }
      })
      
    } else {
      message.channel.send("** Bu komutu oy vermeden kullanamazsınız! **\n\nBu komutu kullanabilmek için botumuza 12 saatte 1 kez oy vermelisiniz.\n( Oy verdikten sonra 2 - 3 dakika bekleyiniz. )\nOy vermek için alttaki linke tıklayınız.\n\nhttps://discordbots.org/bot/616144893399662602/vote")
    }
  })
};





exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espri', 'espiri-yap', 'yap-espiri', 'do-espiri'],
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Espiri yapar.',
  usage: 'espri'
};