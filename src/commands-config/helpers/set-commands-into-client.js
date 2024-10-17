export const setCommandsIntoClient = async (client, commands) => {
    if (commands && commands.length > 0) {
        commands.forEach((command) =>
            client.commands.set(command.data.name, command),
        );
        console.log('Commands loaded into client.');
    } else {
        console.warn('No commands were found to register.');
    }
};
