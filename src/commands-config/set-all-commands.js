export const setAllCommands = async (client, commands = []) => {
    commands.map(command => client.commands.set(command.data.name, command));
}