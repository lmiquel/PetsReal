import { getMessageInfos } from "./helpers/get-message-infos.js";

export const sendMessageToAllGuilds = async (client) => {
    for await (const guild of client.guilds.cache.values()) {
        const config = client.guildConfigs.get(guild.id);
        if (!config) {
            console.log(`No config found for guild ${guild.name}`);
            continue;
        }
    
        const { channel, mention, message } = getMessageInfos(guild, config)
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
