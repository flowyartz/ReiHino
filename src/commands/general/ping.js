module.exports = {
    name: 'ping',
    aliases: ['ping'],
    category: 'general',
    description: {
        content: 'Shows the bot\'s connection'
    },
    args: { option: false },
        async exec(message) { 
            const msg = await message.channel.send('Pinging..');
            return msg.edit(`🏓! **Latency:** ${msg.createdTimestamp - message.createdTimestamp}ms, **API:** ${Math.round(message.client.ws.ping)}ms`)
        }
}