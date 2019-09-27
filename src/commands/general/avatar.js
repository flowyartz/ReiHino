const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['avatar', 'icon', 'pfp'],
    category: 'general',
    description: {
        content: 'Shows the user profile picture.',
        usage: '[user: optional]'
    },
    args: { option: false },
        exec(message) { 
            const member = message.mentions.users.first() || message.author;
            const embed = new MessageEmbed()
                    .setColor('#ffd86e')
                    .setAuthor(member.tag)
                    .setImage(member.displayAvatarURL({size: 2048}))
                    .setFooter(`Took ${Math.round(message.client.ws.ping)}ms`);
            return message.channel.send(embed);
        }
}