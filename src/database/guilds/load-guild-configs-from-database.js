import { GuildConfig } from "../db.js";

export const loadGuildConfigsFromDatabase = async (client) => {
    const configs = await GuildConfig.findAll();

    configs.forEach(config => {
        client.guildConfigs.set(config.guildId, {
            selectedChannelId: config.selectedChannelId,
            selectedRoleId: config.selectedRoleId,
            customMessage: config.customMessage
        });
    });
};