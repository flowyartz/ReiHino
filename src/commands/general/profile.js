const schema = require('../../models/User');

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
                msg.edit(`Profile info for ${user}\n- xp: 0\n- level: 0`)
            } else {
                msg.edit(`Profile info for ${user}\n- xp: ${data.xp}\n- level: ${data.level}`)
            };
        });
    }
}