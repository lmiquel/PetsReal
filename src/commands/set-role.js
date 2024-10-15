import { SlashCommandBuilder } from "discord.js";

const setRoleCommand = {
    data: new SlashCommandBuilder()
        .setName('setrole')
        .setDescription('Sélectionnez le rôle à taguer lors de l\'envoi du message.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Le rôle à utiliser')
                .setRequired(true)),
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');

        client.selectedRoleId = role.id;
        await interaction.reply(`Le rôle a été défini sur ${role}`);
    },
};

export default setRoleCommand;
