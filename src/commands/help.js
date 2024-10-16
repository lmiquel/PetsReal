import { SlashCommandBuilder } from "discord.js";

const helpCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Afficher la liste des commandes.'),
        
    async execute(interaction) {
        const commandList = [
            { name: '/setmessage', description: 'Choisissez le message à envoyer.' },
            { name: '/setchannel', description: 'Sélectionnez le channel pour envoyer les messages.' },
            { name: '/setrole', description: 'Sélectionnez le rôle à mentionner.' },
            { name: '/help', description: 'Affiche la liste des commandes disponibles.' }
        ];

        let helpMessage = '**Voici la liste des commandes disponibles :**\n\n';
        commandList.forEach(command => {
            helpMessage += `**${command.name}** - ${command.description}\n`;
        });

        await interaction.reply(helpMessage);
    },
};

export default helpCommand;