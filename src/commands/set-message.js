import { SlashCommandBuilder } from 'discord.js';
import { setConfig } from '../database/guilds/set-guild-config.js';

const setMessageCommand = {
    data: new SlashCommandBuilder()
        .setName('setmessage')
        .setDescription('Choisissez le message à envoyer.')
        .addStringOption((option) =>
            option
                .setName('message')
                .setDescription('Le message à envoyer')
                .setRequired(true),
        ),

    async execute(interaction, client) {
        const guildConfig = client.guildConfigs.get(interaction.guildId) || {};
        const customMessage = interaction.options.getString('message');

        guildConfig.customMessage = customMessage;
        setConfig(interaction.guildId, guildConfig, client);

        await interaction.reply({
            content: `Le message personnalisé a été mis à jour : "${customMessage}"`,
            ephemeral: true,
        });
    },
};

export default setMessageCommand;
