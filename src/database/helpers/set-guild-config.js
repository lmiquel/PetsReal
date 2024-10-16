import { GuildConfig } from "../db.js";

export const setConfig = async (guildId, config, client) => {
    client.guildConfigs.set(guildId, config);
    await updateGuildConfig(guildId, config);
};

const updateGuildConfig = async (guildId, config) => {
    console.log(guildId, config)
    await GuildConfig.upsert({
        guildId: guildId,
        selectedChannelId: config.selectedChannelId,
        selectedRoleId: config.selectedRoleId,
        customMessage: config.customMessage
    });
};
