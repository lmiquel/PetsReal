import { SlashCommandBuilder } from "discord.js";

const setMessageCommand = {
    data: new SlashCommandBuilder()
        .setName('setmessage')
        .setDescription('Choisissez le message à envoyer.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message à envoyer')
                .setRequired(true)),
                
    async execute(interaction, client) {
        const customMessage = interaction.options.getString('message');
        client.customMessage = customMessage;

        await interaction.reply({
            content: `Le message personnalisé a été mis à jour : "${customMessage}"`,
            ephemeral: true,
        });
    },
};

export default setMessageCommand;