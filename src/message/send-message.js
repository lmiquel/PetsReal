export const sendMessage = async (client) => {
    const { channels, selectedChannelId, selectedRoleId, customMessage } = client;

    const channel = channels.cache.get(selectedChannelId);
    const mention = selectedRoleId ? `<@&${selectedRoleId}> ` : '';
    const message = customMessage || "C'est l'heure des CHATS (et autre). Envoyez animaux svp !! (ce message peut être personnalisé via la commande '/setmessage')";
    
    if (!channel) return console.error('Channel not found, could not send message.');

    await channel.send(`${mention}${message}`);
    console.log('Message sent.')
}
