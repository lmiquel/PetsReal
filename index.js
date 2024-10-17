import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { initDB } from './src/database/db.js';
import { loadGuildConfigsFromDatabase } from './src/database/guilds/load-guild-configs-from-database.js';
import { registerAllCommands } from './src/commands-config/register-all-commands.js';
import { sendMessageEveryTenMinutes } from './src/message/local-env/send-message-every-ten-minutes.js';
import { scheduleRandomTimeMessage } from './src/message/schedule-message.js';

dotenv.config();
const env = process.env.ENV;
const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const startBot = async () => {
    try {
        client.guildConfigs = new Collection();

        await initDB();
        await loadGuildConfigsFromDatabase(client);

        await registerAllCommands(client);

        client.once('ready', () => {
            console.log(`PetsReal is online!`);

            if (env === 'local') {
                sendMessageEveryTenMinutes(client);
            } else {
                scheduleRandomTimeMessage(client);
            }
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
        console.error(
            `Error while executing command ${interaction.commandName}:`,
            error,
        );
        await interaction.reply({
            content:
                "Une erreur s'est produite lors de l'exécution de la commande.",
            ephemeral: true,
        });
    }
};

startBot();
