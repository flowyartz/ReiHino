const schema = require('../../models/User');
const Canvas = require('../../structures/CanvasProfile');
const { MessageAttachment } = require('discord.js');
const Xplvl = require('../../function/level');

module.exports = {
    name: 'profile',
    aliases: ['profile'],
    category: 'general',
    args: { option: false },
    description: {
        content: 'Shows your profile',
        usage: '[user: optional]',
        examples: ['@sora#1199', '@emii#0425']
    },
    async exec(message, args) { 
        const user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author; 

        schema.findOne({user: user.id}, async (err, data) => {
            if (err) console.error(err);
            const msg = await message.channel.send(`Fetching profile infos...`)
            if (!data) {
                msg.edit(`User doesn't exist in database. Creating user..`);
            } else {
                msg.edit(`Profile card for ${user}`);
                const profile = await Canvas.profile(user, data.description, data.level, data.coins, data.xp, Xplvl);
                message.channel.send(new MessageAttachment(profile, 'profile.png'));
            };
        });
    }
}