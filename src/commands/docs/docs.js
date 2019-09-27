const fetch = require('node-fetch');

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
        exec(message, args) {
            const query = args.join(' ');
            fetch(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(query)}`)
            .then(res => res.json())
                .then(async embed => {
                    if (embed && !embed.error) {
                        const msg = await message.channel.send({embed})
                        msg.react('🗑');
                        const collector = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑' && user.id == message.author.id, { time: 10000 });
                        collector.on('collect', res => {
                            res.message.delete();
                        });

                        collector.on('end', res => {
                            if (res.size <= 0) {
                                msg.reactions.removeAll();
                            }
                        })
                    }   else message.reply(`Cant find ${query}`);
                }).catch (err => {
                    console.error(err); 
                    message.reply('Sorry, error expected..')
                });
        }
}