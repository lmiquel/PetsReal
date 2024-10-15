export const sendMessage = async (client) => {
    const { channels, selectedChannelId, selectedRoleId } = client;

    const channel = channels.cache.get(selectedChannelId);
    const mention = selectedRoleId ? `<@&${selectedRoleId}> ` : '';
    
    if (!channel) return console.error('PetsReal: Channel not found!');

    await channel.send(`${mention}C'est l'heure des CHATS (et autre). Envoyez animaux svp !!`);
    console.log('PetReal: message sent.')
}
