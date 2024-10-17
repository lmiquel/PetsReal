import { SlashCommandBuilder } from 'discord.js';
import { setConfig } from '../database/guilds/set-guild-config.js';

const setRoleCommand = {
    data: new SlashCommandBuilder()
        .setName('setrole')
        .setDescription(
            "Sélectionnez le rôle à taguer lors de l'envoi du message.",
        )
        .addRoleOption((option) =>
            option
                .setName('role')
                .setDescription('Le rôle à utiliser')
                .setRequired(true),
        ),

    async execute(interaction, client) {
        const guildConfig = client.guildConfigs.get(interaction.guildId) || {};
        const role = interaction.options.getRole('role');

        guildConfig.selectedRoleId = role.id;
        setConfig(interaction.guildId, guildConfig, client);

        await interaction.reply(`Le rôle a été défini sur ${role}`);
    },
};

export default setRoleCommand;
