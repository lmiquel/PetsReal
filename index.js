import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { scheduleRandomTimeMessage } from './src/message/schedule-message.js';
import { registerAllCommands } from './src/commands-config/register-all-commands.js';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const botId = process.env.DISCORD_BOT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const startBot = async () => {
    try {
        client.guildConfigs = new Collection();

        await registerAllCommands(client, botId);
        
        client.once('ready', () => {
            console.log(`PetsReal is online!`);
            scheduleRandomTimeMessage(client);
        });
        
        client.on('interactionCreate', handleInteraction);

        await client.login(token);
    } catch (error) {
        console.error('Error while initializing bot.', error);
    }
};

const handleInteraction = async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(`Error while executing command ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de la commande.', ephemeral: true });
    }
};

startBot();