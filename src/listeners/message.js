const schema = require('../models/Prefix');
const { Collection } = require('discord.js');
const cooldown = new Collection();

module.exports = async (client, message) => {
    if (message.channel.type === 'dm' || message.author.bot) return;

    require('../structures/userData')(message);
    
    let args;
    let prefix;
    const guildPrefix = await schema.findOne({guild: message.guild.id}, {prefix: 1});
    if (!guildPrefix) {
        new schema({
            prefix: '?',
            guild: message.guild.id
        }).save().catch(e => console.error(e));
    } else if (message.content.startsWith(guildPrefix.prefix)) prefix = guildPrefix.prefix;

    if (!prefix) return;
    args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.args.option && !args.length) {
        return message.reply(command.args.prompt);
    };

    if (!cooldown.has(command.name)) {
        cooldown.set(command.name, new Collection());
    }

    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (cooldown.get(command.name).has(message.author.id)) {
        const expiretime = cooldown.get(command.name).get(message.author.id) + cooldownAmount;
        const timeleft = (expiretime - Date.now()) / 1000;
        if (Date.now() < expiretime) return message.reply(`please wait ${timeleft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
    }

    cooldown.get(command.name).set(message.author.id, Date.now());
    setTimeout(() => cooldown.get(command.name).delete(message.author.id), cooldownAmount);

	try {
		command.exec(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
}