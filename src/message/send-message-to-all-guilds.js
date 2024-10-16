export const sendMessageToAllGuilds = async (client) => {
    for await (const guild of client.guilds.cache.values()) {
        const config = client.guildConfigs.get(guild.id);
        if (!config) {
            console.log(`No config found for guild ${guild.name}`);
            continue;
        }
    
        const { selectedChannelId, selectedRoleId, customMessage } = config;
        const channel = guild.channels.cache.get(selectedChannelId);
        const mention = guild.roles.cache.get(selectedRoleId);
        const message = customMessage || "C'est l'heure des CHATS (et autre). Envoyez animaux svp !! (ce message peut être personnalisé via la commande '/setmessage')";
    
        if (!channel) {
            console.log(`No channel found for guild ${guild.name}`);
            continue;
        }
    
        try {
            await channel.send(`${mention} ${message}`);
            console.log(`Message sent to guild: ${guild.name}`);
        } catch (error) {
            console.error(`Failed to send message in guild ${guild.name}:`, error);
        }
    }
};
