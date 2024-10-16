import { Collection } from "discord.js";

export const initializeClientCommands = (client) => {
    client.commands = new Collection();
    client.selectedChannelId = null;
    client.selectedRoleId = null;
    client.customMessage = null;
};