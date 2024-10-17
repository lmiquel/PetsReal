import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_BOT_TOKEN,
);

export const sendCommandsToDiscord = async (commands) => {
    const body = commands.map(({ data }) => data);

    await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), {
        body,
    });

    console.log(`Registered ${commands.length} commands to Discord.`);
};
