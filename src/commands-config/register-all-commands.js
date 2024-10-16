import { loadAllCommands } from './load-all-commands.js';
import { setCommandsIntoClient } from './set-commands-into-client.js';
import { sendCommandsToDiscord } from './send-commands-to-discord.js';
import { Collection } from 'discord.js';

export const registerAllCommands = async (client) => {
    try {
        console.log('Started refreshing application (/) commands.');

        client.commands = new Collection();
        
        const commands = await loadAllCommands();
        if (commands.length === 0) return;

        await setCommandsIntoClient(client, commands)

        await sendCommandsToDiscord(commands);

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}