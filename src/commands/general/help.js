const { MessageEmbed, version } = require('discord.js');
const { readdirSync } = require('fs');
const schema = require('../../models/Prefix');

module.exports = {
    name: 'help',
    aliases: ['help', 'h'],
    category: 'general',
    cooldown: 0,
    description: {
        content: 'Display a list of commands the bot has available, or informations for commands.',
        usage: '[command: optional]'
    },
    args: { option: false },
        async exec(message, args) { 
            const data = await schema.findOne({guild: message.guild.id}, { prefix:1});
            if(!args[0]) {
                const embed = new MessageEmbed()
                        .setColor('#ffd86e')
                        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                        .setDescription(`You can use \`${data.prefix}help [command_name]\` for more detailed informations about a command.`)
                        .setImage('https://i.imgur.com/cBoiUvT.gif')
                        .setFooter(`djs-${version}`,message.client.user.displayAvatarURL())
                        .setTimestamp();    
                const categories = readdirSync('../src/commands/');
                for (const category of categories) {
                    const commandName = {
                        docs: '📄\u2000Docs',
                        general: '<:megumi:624247684181786625>\u2000General',
                        mod: '📝\u2000Moderation',
                        owner: '🔒\u2000Owner',
                    }[category];
                    const { commands } = message.client;
                    if (commandName) embed.addField(commandName, `\`${commands.filter(x => x.category === category).map(cmd => cmd.name).join(',` `')}\``)
                }

                return message.channel.send(embed);
            } else {

                let command = args[0].toLowerCase();
                if (message.client.commands.has(command)) {
                    command = message.client.commands.get(command);

                    const embed = new MessageEmbed()
                            .setColor('#ffd86e')
                            .setAuthor(command.name.toUpperCase(), message.client.user.displayAvatarURL())
                            .setFooter(`${Math.round(message.client.ws.ping)}ms ❤`)
                            .setTitle(`\`${command.name} ${command.description.usage ? command.description.usage : ""}\``)
                            .addField('- Description', command.description.content ||  '\u200b');

                    if (command.aliases.length > 1) {
                        embed.addField('- Aliases', `\`${command.aliases}\``, true);
                    }
                    if (command.description.examples && command.description.examples.length) {
                        embed.addField('- Examples', `\`${command.name} ${command.description.examples.join(`\`\n\`${command.name} `)}\``, true);
                    }


                    return message.channel.send(embed);
                }
            }
        }
}