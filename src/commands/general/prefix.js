const schema = require('../../models/Prefix');

module.exports = {
    name: 'prefix',
    aliases: ['prefix'],
    category: 'general',
    args: { option: false },
    description: {
        content: 'Shows the current guild\'s prefix / Changes the prefix of the guild',
        usage: '[new prefix: optional]',
        examples: ['?', '.', '!', '.r']
    },
    async exec(message, args) { 
        if (!args.length) {
            const data = await schema.findOne({guild: message.guild.id}, {prefix: 1, guild: 1});
            return message.channel.send(`Prefix is \`${data.prefix}\`\nIn guild: \`${message.client.guilds.get(data.guild)}\``);    
        } else {
            if (args[0].length > 10) {
                message.reply(`Please keep prefix lower than 10 characters..`)
                return;
            };

            schema.findOne({guild: message.guild.id}, (err, data) => {
                if (err) console.error(err);
                if (args[0] === data.prefix) return message.reply(`Can't save prefix, the prefix you're trying to save is the same as the previous prefix..`);
                if (!data) {
                    new schema({
                        guild: message.guild.id,
                        prefix: '?'
                    }).save().catch(er => console.err(er));
                } else {
                    data.prefix = args[0];
                    data.save().catch(err => console.error(err));
                    return message.channel.send(`Successfully set prefix to \`${args[0]}\``); 
                }
            });
        };
    }
}