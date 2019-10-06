const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");

const ark = ["renk", "color"]
const arm = ["resim", "image"]
const reset = ['sıfırla', 'reset']
const saydam = ['saydamlaştır', 'saydam']
const award = ['ödül', 'ödüller', 'award', 'reward', 'prize']

exports.run = async(client, msg, args) => {

    if (ark.includes(args[0])) {
        if (reset.includes(args[1])) {
            if (!db.has(`${msg.author.id}.renk`)) {
              msg.channel.send(' | Renk ayarlanmamış, neyi sıfırlayacaksınız?')
                return
            }
            db.delete(`${msg.author.id}.renk`)
            msg.channel.send(' | Renk **başarıyla** sıfırlandı.')
            return
        }
        if (!args[1]) {
            msg.channel.send(' | Bir **renk kodu** girin veya **sıfırla** yazınız.')
            return
        }
        if (args[1].length !== 6) {
           
            msg.channel.send(' | Renk kodları **6** basamaklı olur.')
            return
        }

        db.set(`${msg.author.id}.renk`, args[1])

        var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(150, 150)
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = `#${args[1]}`;
        ctx.fill()
        ctx.fillRect(0, 0, 150, 150)
        const embed = new Discord.RichEmbed()
            .setAuthor("Ayarlanan Renk: #{renk}".replace("{renk}", args[1].toUpperCase()))
            .setImage(`attachment://renk.png`)
            .setColor("AEED13")
        msg.channel.send({ embed, files: [{ attachment: canvas.toBuffer(), name: "renk.png" }] })
        return
    }
    if (arm.includes(args[0])) {
        if (reset.includes(args[1])) {
            if (!db.has(`${msg.author.id}.resim`)) {
                
                msg.channel.send(' | Ayarlı bir resim **bulunamadı**. Bu nedenle resmi sıfırlayamazsınız.')
                return
            }
            db.delete(`${msg.author.id}.resim`)
     *
            msg.channel.send(' | Resim başarıyla sıfırlanmıştır.')
            return
        }
        if (!args[1]) {
            msg.channel.send('< | Bir **resim linki** girin veya **sıfırla** yazınız.')
            return
        }
        if (!args[1].startsWith('http')) {
            msg.channel.send(' | Resim linki koymalısınız. Resim linkleri **http** veya **https** ile başlamaktadır.')
            return
        }

        db.set(`${msg.author.id}.resim`, args[1])
        msg.channel.send('- | Resim başarıyla ayarlanmıştır.')
        return
    }

    if (award.includes(args[0])) {

        if (!msg.member.hasPermission("MANAGE_ROLES")) {
            msg.channel.send(' | Bu komutu kullanabilmek için **Rolleri Yönet** iznine sahip olmalısınız.')
            return
        }

        if (reset.includes(args[1])) {
            if (!db.has(`roll_${msg.guild.id}`)) {
                if (!db.has(`rollss_${msg.guild.id}`)) {
        
                       msg.channel.send(" | Rol ödülleri sistemi **sıfırlanamıyor** çünkü bu sistem aktif edilmemiş!")
                 
                    return
                }
            }
            db.delete(`roll_${msg.guild.id}`)
            db.delete(`rollss_${msg.guild.id}`)
            const embed = new Discord.RichEmbed()
                .setDescription("Rol ödülleri sistemi başarıyla sıfırlandı!")
                .setColor("AEED13")
            msg.channel.send({ embed })
            return
        }

        let r = msg.mentions.roles.first();

        if (!r) {
           
                msg.channel.send(" | Bir rolü etiketleyiniz veya `sıfırla` yazınız!")
          
            return
        }

        if (!args[2]) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Lütfen **${r.name}** rolünü almak için kaçıncı seviyede olmak gerektiğini yazınız!`)
                .setFooter("Sayı biçiminde yazınız.")
                .setColor("AEED13")
            msg.channel.send({ embed })
            return
        }

        if (isNaN(args[2])) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Lütfen **${r.name}** rolünü almak için kaçıncı seviyede olmak gerektiğini sayı biçiminde yazınız!`)
                .setColor("AEED13")
            msg.channel.send({ embed })
            return
        }

        db.set(`roll_${msg.guild.id}`, r.id)
        db.set(`rollss_${msg.guild.id}`, args[2])

        const embed = new Discord.RichEmbed()
            .setDescription("Rol ödülleri sistemi başarıyla aktif edildi!")
            .setColor("AEED13")
        msg.channel.send({ embed })
        return
    }

    let u = msg.mentions.users.first() || msg.author;

    if (u.bot === true) {
        const embed = new Discord.RichEmbed()
            .setDescription("Botların seviyesi bulunmamaktadır!")
            .setColor("AEED13")
        msg.channel.send(embed)
        return
    }

    var g = "95"

    var Canvas = require('canvas')
    var canvas = Canvas.createCanvas(750, 300)
    var ctx = canvas.getContext('2d');
    const avatarURL = u.displayAvatarURL
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
    if (db.has(`${u.id}.resim`)) {
        const rs = await request.get(db.fetch(`${u.id}.resim`));
        const resim = await Canvas.loadImage(rs.body);
        ctx.drawImage(resim, 0, 0, 750, 300);

        var g = "55"

    }

    if (saydam.includes(args[0])) {
        if (reset.includes(args[1])) {
            if (!db.has(`${msg.author.id}.saydam`)) {
              
                msg.channel.send(" | Saydamlık zaten **standart** halinde.")
                return
            }
            db.delete(`${msg.author.id}.saydam`)
          msg.channel.send(" | Saydamlık ayarı **başarıyla** sıfırlandı.")
            return
        }
        if (!args[1]) {
            const embed = new Discord.RichEmbed()
                .setDescription("Ayarlamak istediğiniz dereceyi veya `sıfırla` yazınız! \n**Dereceler:** `1`, `2`, `3`, `4`, `5`")
                .setColor("AEED13")
            msg.channel.send({ embed })
            return
        }
        if (isNaN(args[1])) {
            
                msg.channel.send(" | Ayarlamak istediğiniz dereceyi veya `sıfırla` yazınız! \n**Dereceler:** `1`, `2`, `3`, `4`, `5`")
                
            return
        }

        if (args[1] > 5 || args[1] < 1) {
          
                msg.channel.send(" | Saydamlık derecesi için `5`'ten fazla bir seçenek yok! \n**Dereceler:** `1`, `2`, `3`, `4`, `5`")
               
            return
        };

        db.set(`${msg.author.id}.saydam`, args[1])
        const embed = new Discord.RichEmbed()
            .setDescription("Siyah katmanın saydamlığı başarıyla değiştirildi!")
            .setColor("AEED13")
        msg.channel.send({ embed })
        return

    };

    if (db.has(`${msg.author.id}.saydam`) === true) {

        if (db.fetch(`${msg.author.id}.saydam`) === "1") {

            var g = "40"

        };

        if (db.fetch(`${msg.author.id}.saydam`) === "2") {

            var g = "30"

        };

        if (db.fetch(`${msg.author.id}.saydam`) === "3") {

            var g = "20"

        };

        if (db.fetch(`${msg.author.id}.saydam`) === "4") {

            var g = "10"

        };

        if (db.fetch(`${msg.author.id}.saydam`) === "5") {

            var g = "0"

        };

    };

    ctx.fillStyle = "rgba(0, 0, 0, 0." + g + ")";
    ctx.fill()
    ctx.fillRect(25, 20, 700, 260)



    ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
    ctx.fill()
    ctx.fillRect(0, 0, 750, 300)

    var re = db.fetch(`${u.id}.renk`) || "FF0000"

    var xp = db.fetch(`puancik_${u.id + msg.guild.id}`);
    var lvl = db.fetch(`seviye_${u.id + msg.guild.id}`);

    let sira = ''
    const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`) });
    const top10 = sorted.splice(0, msg.guild.members.size)
    const mappedID = top10.map(s => s.user.id);
    for (var i = 0; i < msg.guild.members.size; i++) {
        if (mappedID[i] === u.id) {
            sira += `${i + 1}`
        }
    }

    var de = 1.6
    ctx.beginPath()
    ctx.fillStyle = "#999999";
    ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(257 + 18.5, 147.5 + 36.15, 250 * de, 37.5);
    ctx.arc(257 + 18.5 + 250 * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${re}`;
    ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(257 + 18.5, 147.5 + 36.25, xp * de, 37.5);
    ctx.arc(257 + 18.5 + xp * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = `#${re}`;
    ctx.font = '28px Impact';
    ctx.textAlign = "right";
    ctx.fillText(`Sıralama #${sira} | Seviye ${lvl || 0}`, 670, 70);
    ctx.font = '20px Impact';
    ctx.textAlign = "right";
    ctx.fillText(`${xp || 0} / 150 XP`, 670, 100);
    ctx.fillStyle = `#bfbfbf`;
    ctx.font = '28px Impact';
    ctx.textAlign = "left";
    ctx.fillText(`${u.tag}`, 270, 150)
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.fill()
    ctx.lineWidth = 8;
    ctx.arc(55 + 80, 80 + 80, 80, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 55, 80, 160, 160);

    msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "seviye.png" }] })

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["level", "rank", "xp", "puan"],
    permLevel: 0,
    kategori: "lvl"
};

exports.help = {
    name: 'seviye',
    description: 'Seviyenizi ve XP\'nizi gösterir.',
    usage: 'seviye [@kullanıcı/renk/resim] [renk kodu/resim URLsi/sıfırla]'
};