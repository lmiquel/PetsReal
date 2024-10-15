import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { scheduleRandomTimeMessage } from './utils/schedule-message.js';
import { registerCommands } from './utils/register-commands.js';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
await registerCommands(client);

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

client.login(process.env.DISCORD_BOT_TOKEN);
