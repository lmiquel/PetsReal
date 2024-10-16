export const getMessageInfos = (guild, config) => {
    const { selectedChannelId, selectedRoleId, customMessage } = config;
    const channel = guild.channels.cache.get(selectedChannelId);
    const mention = guild.roles.cache.get(selectedRoleId);
    const message = customMessage || "C'est l'heure des CHATS (et autre). Envoyez animaux svp !! (ce message peut être personnalisé via la commande '/setmessage')";

    return { channel, mention, message };
};