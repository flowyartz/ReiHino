const fetch = require('node-fetch');
const qs = require('querystring');

module.exports = {
    name: 'docs',
    aliases: ['docs'],
    category: 'docs',
    description: {
        content: 'Searches into discord.js documentation.',
        usage: '<query: required> [version: optional]',
        examples: ['ClientUser', 'ClientUser master']
    },
    args: {
        prompt: 'please include the query you\'re trying to find!',
        option: true,
    },
        async exec(message, args) {
            const queryString = qs.stringify({ src: 'master', q: args.join(' ') });
            const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`);
            try {
                const embed = await res.json();
        
                if (embed && !embed.error) {
                    const msg = await message.channel.send({embed});
                    msg.react('🗑');
                        const collector = await msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑' && user.id == message.author.id, { time: 10000});
                        collector.on('collect', res => res.message.delete());
                        collector.on('end', res => { if (res.size <= 0) msg.reactions.removeAll()});
                } else message.reply(`sorry I can't find ${q}`);
            } catch (e) {
                console.error(e);
                message.reply(`Sorry im having problems...`);
            }
        }
}