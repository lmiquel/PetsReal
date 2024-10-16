import { readdirSync } from 'fs';

export const loadAllCommands = async () => {
    const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    const commands = [];

    for await (const file of commandFiles) {
        const command = await import(`../../commands/${file}`);
        commands.push(command.default);
    }

    return commands;
}