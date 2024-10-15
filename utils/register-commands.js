import dotenv from 'dotenv';
import { Collection, REST, Routes } from "discord.js";
import { setChannelCommand } from "../commands/set-channel.js";
import { setRoleCommand } from "../commands/set-role.js";

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
const commands = [setChannelCommand.data, setRoleCommand.data]

export const registerCommands = async (client) => {
    try {
        console.log('Started refreshing application (/) commands.');


        client.commands = new Collection();
        client.commands.set(setChannelCommand.data.name, setChannelCommand);
        client.commands.set(setRoleCommand.data.name, setRoleCommand);

        client.selectedChannelId = null;
        client.selectedRoleId = null;

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_BOT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}