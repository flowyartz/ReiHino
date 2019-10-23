const { readdirSync, readdir } = require('fs');

module.exports = (commandPath, client)  => {
    readdir(`../src/${commandPath}`,(e, folder)=> {
        for (const subfolder of folder) {
            const commandFile = readdirSync(`../src/${commandPath}${subfolder}`).filter(f => f.endsWith('js'));
            for (const file of commandFile) {
                const command = require(`../${commandPath}${subfolder}/${file}`);
                client.commands.set(command.name, command);
            }
        }
    });

    const listeners = readdirSync('../src/listeners/').filter(file => file.endsWith('js'));
    for (const files of listeners) {
        const events = require(`../listeners/${files}`);
        client.on(files.split('.')[0], events.bind(null, client));
    };
}