const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const ayarlar = require('./ayarlar.json')
const moment = require('moment');
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
const express = require("express");
const http = require("http");
const Jimp = require("jimp");
const app = express();
require('./util/eventLoader')(client);

const ayarlar1 = client.ayarlar;

client.tr = require('./tr.js');
client.en = require('./en.js');

client.ayarlar = {
    
      
        "prefix": "!!",
        
        "secenek": ["tr", "en"],
       
};

var prefix = "!!";



const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



app.listen(process.env.PORT);
app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 5000);



   

////////////////////////

client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "giriş-çıkış");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "üye");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " artık " + role + " rolü ile aramızda");
	
	member.send("Aramıza hoş geldin! Artık @üye rolüne sahipsin!")
	
});

////////////////////////

////////////////////////
client.on("message", async message =>{
  const a = message.content.toLowerCase();
  if(a === "selam" || a === "sa" ||a === "selamun aleyküm" || a==="selamın aleyküm" || a==="slm" || a==="sea"){
  let i = await   db.fetch(`saas_${message.guild.id}`)
       if(i === "acik"){
         message.channel.send(`Aleyküm Selam, hoşgeldin.`)
           
         
         message.react(':as:585483225107922964');
         message.react(':hg:585438810599325716');


       }
     
     }
})

//////////////////////////////////

client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply("Başarıyla afk modundan çıktınız.");
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    message.channel.send(`${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**` )
  }
});


client.on("guildMemberAdd", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/577242119261913090/594920692303265822/hosgeldin.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 400, 400, member.user.tag);
            await userimg.resize(187, 169)
            await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");///sağa sola, yukarı aşşa
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
        
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on('message', async message => {
    if (message.content === 'fake') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});



/////////////bb-kanal
client.on("guildMemberRemove", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog1.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
        let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/594583488787644447/595138392216436746/gorusuruz.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
             if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 300, 300, member.user.tag);
            await userimg.resize(189, 173);////boyut
            await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");///sağa sola, yukarı aşşa
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })


//////////////////////////



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});






client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("AEDD13")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("AEDD13")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:sayacout:620149633095827457> | \`${member.user.tag}\`, aramızdan ayrıldı, \`${sayac[member.guild.id].sayi}\` kişi olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` kişi kaldı!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("AEDD13")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:sayacg:620149260125601792> | \`${member.user.tag}\`, sunucuya katıldı \`${sayac[member.guild.id].sayi}\` kişi olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` kişi kaldı!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});

client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`<:oke:616540844408832010> | Sunucuya hoşgeldin \`@${member.user.tag}\` otomatik rol verildi. `)
.setColor("GREEN")
    .setFooter("Botify", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:oke:616540844408832010> | Sunucuya hoşgeldin \`@${member.user.tag}\` otomatik rol verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});






client.on("guildCreate",guild => {

guild.owner.send(":inbox_tray: **| Salty** botu sunucunuza eklediğiniz için teşekkürler. \n\n**Salty** sayesinde sunucunuzu reklamlara, küfürlere, ve spamlara karşı koruyabilir\naynı zamanda destek sistemini kurarak kullanıcılarınıza\ndestek verebilirsiniz. \n**Salty** Resmi Destek Sunucusu: \nhttps://discord.gg/Zca2k3h")
})

/*client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
     .setColor('1ED760')
  .setThumbnail("https://cdn.discordapp.com/avatars/616144893399662602/069bf3036f05aca34f32629305a9fbc7.png?size=2048")
  .setDescription("Merhaba, sunucuya katıldığın için teşekkürler. \n Bottaki tüm komutlara `!!yardım` yazarak ulaşabilirsiniz. \n Ayrıca herhengi bir sorun & öneri veya şikayetiniz için destek sunucuma katılabilirsiniz. \n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n ➽ [Destek Sunucum](https://discord.gg/8ETzukW) \n ➽ [Beni Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=616144893399662602&scope=bot&permissions=271707150) \n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n")
          .setFooter("Bu Mesaj Sadece Size Gönderilmiştir.")
  member.send(e);
});*/


   
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor("AEDD13")
                    .setFooter('Salty Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("Salty Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', ''+ msg.author +'', true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`<:yasak:619596371674005515> | <@${msg.author.id}> Bu sunucuda reklam engelleme sistemi aktif durumdadır, reklam yapmana izin vermeyeceğim. `).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });   







client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   


  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'STARKs-güvenlik.png');
    chan.send(attachment)
});




client.on("message", msg => {
  if (!msg.guild) return;
 
    if (db.has(`küfürE_${msg.guild.id}`) === true) {
    const kufur = new RegExp(/(göt|amk|a m k|yarra|yarrağım|yarrram|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git|sik|o-ç|s i k|si k|s ik|ayku|amık|am1na)/)
  if (kufur.test(msg.content)==true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(``).then(message => message.delete(5000));
        var k 
        msg.channel.send(` <:red:617608486381158416> | <@${msg.author.id}> Bu sunucuda küfür engelleme sistemi aktif durumda küfür etmene izin vermeyeceğim.`)
        
        msg.channel.send(k).then(message => message.delete(5000));
    }
}
    }

    
})

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});





client.on("guildCreate", guild => {
let add = client.channels.get("618161008598319308")
const eklendim = new Discord.RichEmbed()

.setTitle(`Sunucuya Eklendim`)
.setTimestamp()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

add.send(eklendim)

});
//XiR
client.on("guildDelete", guild => {
let remove = client.channels.get("618161008598319308")
const atildim = new Discord.RichEmbed()

.setTitle(`Sunucudan Atıldım`)
.setTimestamp()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

remove.send(atildim)

});






let points = JSON.parse(fs.readFileSync('./level.json', 'utf8'));

var f = [];
function factorial (n) {
  if (n == 0 || n == 1 || n == 2)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473603413243068437/fs.png");
				const userimg = await Jimp.read(user.avatarURL);
				var font;
				if (user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_632_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				await bg.print(font2, 17, 50, `LEVEL`);
				await bg.print(font, 27, 70, `${userData.level}`);
				await userimg.resize(35, 35);
				await (!userimg.resize(35, 35));
        await bg.composite(userimg, 25, 15).write("./img/level/" + client.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:up: **| ${user.username} level atladı!**`)
						message.channel.send(new Discord.Attachment("./img/level/" + client.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/level/" + client.user.id + "-" + user.id + ".png");
				  }, 10000);
    }
fs.writeFile('./level.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
});
    if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if (message.content.indexOf(ayarlar.prefix) !== 0) return;
    const args = message.content.substring(ayarlar.prefix.length).split(" ");
     var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdisi") : (Durum == "idle" ? ("Bosta") : (Durum == "dnd" ? ("Rahatsiz Etmeyin") : ("Bilinmiyor/bulunamadi.")))))
    const command = args.shift().toLowerCase();
     if (command === 'profil' || command === '') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let memberID = await db.fetch(`memberID_${user.id}`);
        if (memberID == null) memberID = 'Aciklama mesaji ayarlanmamis.'
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
        let memberBadge = await db.fetch(`memberBadge_${user.id}`);
        if (memberBadge == null) memberBadge = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
        if (memberBadge4 == null) memberBadge4 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
				const bg = await Jimp.read("https://i.postimg.cc/ZYDZmVBr/xirprofil.png");
				const userimg = await Jimp.read(user.avatarURL);
				const onay = await Jimp.read(`${memberBadge}`);
				const mod = await Jimp.read(`${memberBadge4}`);
				var font;
				if (membername.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else if (membername.length > 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHİTE);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				var font3;
				if (user.tag.length < 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else if (user.tag.length > 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
				else font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				var font4;
				if (user.tag.length < 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else if (user.tag.length > 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				else font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				await bg.print(font, 270, 70, `${membername}`);
				await bg.print(font4, 40, 300, `Level: ${userData.level}`);
				await bg.print(font2, 40, 340, `GP: ${userData.points}`);
				await bg.print(font3, 40, 380, `Aciklama: ${memberID}`);
        await bg.print(font3, 40, 420, `Durum: ${durm}`);
				await userimg.resize(200, 200);
				await (!userimg.resize(210, 210));
				await onay.resize(32, 32);
				await mod.resize(32, 32);
        await bg.composite(onay, 270, 120).write("./img/onay/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(mod, 390, 120).write("./img/mod/" + client.user.id + "-" + user.id + ".png");
        await bg.composite(userimg, 40, 40).write("./img/userimg/" + client.user.id + "-" + user.id + ".png");
				  setTimeout(function () {  
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
						message.channel.send(new Discord.Attachment("./img/userimg/" + client.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/userimg/" + client.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
  if (command === "açıklamaayarla" || command === "açıklama") {
        if (args.join(' ').length > 35) return message.channel.send(`${process.env.basarisiz} En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${ayarlar.prefix}biyografi Biyografin`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberID_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`**Yeni biyografin ayarlandı.**`)
        })
    }
});






client.on("messageDelete", async message => {
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  var kanal = await db.fetch(`modlogK_${message.guild.id}`)
  if (!kanal) return;
var kanal2 = message.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("ID", message.author.id, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  kanal2.send(embed);
  
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  
  if (oldMsg.author.bot) return;
  
  var user = oldMsg.author;
  
  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMsg.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
  .addField("Kullanıcı Tag", oldMsg.author.tag, true)
  .addField("ID", oldMsg.author.id, true)
  .addField("Eski Mesaj", "```" + oldMsg.content + "```")
  .addField("Yeni Mesaj", "```" + newMsg.content + "```")
  .setThumbnail(oldMsg.author.avatarURL)
  kanal2.send(embed);
  
});

client.on("roleCreate", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on("roleDelete", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)    

  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on("roleUpdate", async role => {
  
  if (!log[role.guild.id]) return;
  
 var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  
  
  
  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMember.guild.channels.find('name', kanal) 
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal2.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
    kanal2.send(embed);
    
  }
  
  client.on('channelCreate', async (channel,member) => {
    var kanal = await db.fetch(`modlogK_${member.guild.id}`)
    const hgK = member.guild.channels.find('name', kanal) 
    if (!hgK) return;
        if (!channel.guild) return;
            if (channel.type === "text") {
                var embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                .setFooter(`ID: ${channel.id}`)
                embed.send(embed);
            };
            if (channel.type === "voice") {
                var embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }
        
    })
        
    client.on('channelDelete', async channel => {
            const fs = require('fs');
        var kanal = await db.fetch(`modlogK_${channel.guild.id}`)
  
        const hgK = channel.guild.channels.find('name', kanal) 
        if (!hgK) return;
            if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }
        
    });
  
});



client.on("message", async msg => {



  if (msg.content === client.ayarlar.prefix+"gizli") {
    msg.channel.send(`**İngilizceye Çevrilmiş Komut Sayısı:** \`${client.english.size}\` \n--------------\n**Toplam Komut Sayısı:** \`${client.commands.size}\` \n\n[${client.commands.size}'da ${client.english.size} ingilizceye çevrilmiş.]`)
  }
  
  const request = require('node-superfetch');
  const db = require('quick.db');
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`
_${msg.author.id + msg.guild.id}`, 1)
    
    msg.channel.send(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)
    
  };
});


  

client.on('message', async msg => {
  
  if (!msg.guild) return;
  
  let prefix = await db.fetch(`prefix_${msg.guild.id}`) || "!!";
  
  var s = 'tr'
  var r = 'Destek Ekibi'
  var k = 'destek-kanalı'
    if(db.has(`dil_${msg.guild.id}`) === true) {
        var s = 'en'
        var r = 'Support Team'
        var k = 'support-channel'
    }
  const dil = s
  
  let rol = '';
  let kanal = '';
  
  if (db.has(`destekK_${msg.guild.id}`) === true) {
 kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name
  }
  
  if (db.has(`destekK_${msg.guild.id}`) === false) {
  kanal = k
  }
  
  if (db.has(`destekR_${msg.guild.id}`) === true) {
  rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`))
  }
  
  if (db.has(`destekR_${msg.guild.id}`) === false) {
  rol = r
  }
  
  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.name== kanal) {
     if (msg.author.bot) return;
    /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`)) {
      
      msg.author.send(client[dil].desteksistem.aciktalepozel.replace("{kisi}", msg.author.tag).replace("{kanal}", `${msg.guild.channels.get(msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).id)}`))
      msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).send(client[dil].desteksistem.aciktalep.replace("{kisi}", msg.author.tag).replace("{sebep}", msg.content))
      
      msg.delete()
      return
    }
    if(msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
      const category = msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
      c.setParent(category.id)
      let role = msg.guild.roles.find(r => r.name === rol.name);
      let role2 = msg.guild.roles.find(r => r.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("AEED13")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`_Merhaba ${msg.author.username}!_`)
      .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
      .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
      .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    }
  }

  if (msg.channel.name== kanal) {
    if(!msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(client[dil].desteksistem.kategori, 'category').then(category => {
      category.setPosition(1)
      let every = msg.guild.roles.find(c => c.name === "@everyone");
      category.overwritePermissions(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
      c.setParent(category.id)
      let role = msg.guild.roles.find(c => c.name === rol.name);
      let role2 = msg.guild.roles.find(c => c.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("AEED13")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`_Merhaba ${msg.author.username}!_`)
     .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
      .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
      .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    })
  }
}
})

client.on('message', async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!!";
  
  var s = 'tr'
  var r = 'Destek Ekibi'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var r = 'Support Team'
    }
  const dil = s
  
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
  if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);

  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Destek Talebi Kapatma İşlemi!`)
  .setDescription(`Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
        message.channel.delete();
      })
      .catch(() => {
        m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});

client.on("message", async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!!";
  
  var s = 'tr'
  var r = 'Destek Ekibi'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var r = 'Support Team'
    }
  const dil = s
  
  if (message.content.toLowerCase().startsWith(`${prefix}talepleri-kapat`)) {
  
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`))) return;
  if (!message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))) return;
  
  if (db.has(`destekK_${message.guild.id}`) === true) {
  var kanal = message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)).name
  var rol = message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))
  }
  
  if (db.has(`destekK_${message.guild.id}`) === false) {
  var kanal = client[dil].desteksistem.kanal
  var rol = client[dil].desteksistem.rol
  }
    
  if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);
    
  if(message.member.roles.has(rol.toString().replace("<@&", "").toString().replace(">", "")) === false) return message.reply(`Bu komutu sadece ${rol} rolüne sahip kullanıcılar kullanabilir!`);

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Tüm Destek Talepleri Kapatma İşlemi!`)
  .setDescription(`Tüm Destek taleplerini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
   try {
    message.guild.channels.filter(c => c.name.startsWith('yardım-')).forEach(async (kanal, id) => {
     kanal.delete()
  });
  } catch(e){
      //console.log(e.stack);
  }
    })
      .catch(() => {
        m.edit('Tüm Destek taleblerini kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});

client.on("message", async msg => {
  const request = require('node-superfetch');
  const db = require('quick.db');
  const ms = require('parse-ms')
  let timeout = 300000
  let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
  let i = db.fetch(`gold_${msg.author.id}`)
  if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if (msg.content.length > 1) {
        db.set(`goldzzz_${msg.author.id}`, Date.now());
        
        msg.channel.send(`<a:altinim:620287023286059098> Özel bir insan belirdi! <@${msg.author.id}> <a:elmas:619439297472233472>`).then(msg => msg.delete(5000));
      
      }
    };
  }
  else if (i == undefined) {
  }
  if (!i) return;

});






client.login(ayarlar.token);

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 600000 //süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  var embed = new Discord.RichEmbed()
  .setAuthor(`Gold Üye ${msg.author.username}`,`${msg.author.avatarURL || msg.author.displayAvatarURL}`)
  .setDescription(`${client.emojis.get("622521341916086283")} Gold Üye Belirdi  <@${msg.author.id}> ${client.emojis.get("622521341916086283")}  `)
  .setColor("GREEN")
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'js') {  // İstediğiniz Komut
       msg.member.addRole("js") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Js Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 600000 //süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  var embed = new Discord.RichEmbed()
  .setAuthor(`OwO Gold Üye ${msg.author.username}`,`${msg.author.avatarURL || msg.author.displayAvatarURL}`)
  .setDescription(`${client.emojis.get('623604057961136159')} **Gold Üye Belirdi**  <@${msg.author.id}>`)
  .setColor("BLUE")
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});