import dotenv from 'dotenv';
import { Collection, REST, Routes } from "discord.js";
import { loadAllCommands } from './load-all-commands.js';
import { setAllCommands } from './set-all-commands.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
// const commands = [setChannelCommand.data, setRoleCommand.data]

export const registerAllCommands = async (client, botId) => {
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = await loadAllCommands();
        client.commands = new Collection();
        await setAllCommands(client)
        
        client.selectedChannelId = null;
        client.selectedRoleId = null;

        await rest.put(
            Routes.applicationCommands(botId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}