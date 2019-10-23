const schema = require('../models/User');
const levels = require('../function/level');
const { Collection } = require('discord.js');
const cooldowns = new Collection();
const defaultDesc = require('../assets/arrays/descriptions');

module.exports = async (message) => {
        
    const xpAmount = Math.floor(Math.random () * 7) + 13,
        coinsAmount = Math.floor(Math.random () * 12) + 14;
    schema.findOne({user: message.author.id}, (err, data) => {
        if (err) console.error(err);
        if (!data) { new schema({
                user: message.author.id,
                description: defaultDesc[Math.floor(Math.random () * defaultDesc.length)],
                xp: xpAmount,
                level: 1, 
                coins: coinsAmount
            }).save().catch(err => console.error(err));
        } else {
                if (!cooldowns.has(message.author.id)) {
                    cooldowns.set(message.author.id);

                    data.xp = data.xp + xpAmount;
                    data.money = data.money + coinsAmount;
                    data.save().catch(err => console.error(err));

                    setTimeout(() => cooldowns.delete(message.author.id), 1000 * 2 * 60)
                };

                while (data.xp >= levels.need(data.level + 1)) {
                    if (data.xp >= levels.need(data.level + 1)) {
                        data.xp = data.xp - levels.need(data.level + 1);
                        data.level = data.level + 1;
                        data.save().catch(err => console.error(err));
        
                        message.reply(`you have leveled up to lvl.${data.level}`);
                    }
                }  
        };
    });
}
