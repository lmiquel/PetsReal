import { SlashCommandBuilder } from "discord.js";
import { setConfig } from "../database/guilds/set-guild-config.js";

const setChannelCommand = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Sélectionnez le channel pour envoyer les messages.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le channel à utiliser')
                .setRequired(true)),
                
    async execute(interaction, client) {
        const guildConfig = client.guildConfigs.get(interaction.guildId) || {};
        const channel = interaction.options.getChannel('channel');

        if (channel.type !== 0) {
            return interaction.reply('Veuillez sélectionner un channel textuel.');
        }

        guildConfig.selectedChannelId = channel.id;
        setConfig(interaction.guildId, guildConfig, client);

        await interaction.reply(`Le channel a été défini sur ${channel}`);
    },
};

export default setChannelCommand;