import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { scheduleRandomTimeMessage } from './src/message/schedule-message.js';
import { registerAllCommands } from './src/commands-config/register-all-commands.js';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const botId = process.env.DISCORD_BOT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
await registerAllCommands(client, botId);

client.once('ready',() => {
    console.log(`PetsReal is online!`);
    scheduleRandomTimeMessage(client);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de la commande.', ephemeral: true });
    }
});

client.login(token);
