let currentTimeout = null;

export const scheduleRandomTimeMessage = () => {
    if (currentTimeout) clearTimeout(currentTimeout);
    
    const now = new Date();
    
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), randomHour, randomMinute, randomSecond);

    if (nextTime <= now) {
        console.log('PetsReal: Programmed date already in the past. Reprogramming a new time.')
        scheduleRandomTimeMessage();
    } else {
        console.log(`PetsReal: message programmed at ${nextTime}`);
                
        const timeUntilNextMessage = nextTime - now;
        currentTimeout = setTimeout(() => {
            sendMessage();
            scheduleRandomTimeMessage();
        }, timeUntilNextMessage);
    }
}

const sendMessage = () => {
    const channel = client.channels.cache.get(channel_id);
    if (!channel) return console.error('PetsReal: Channel not found!');

    channel.send("C'est l'heure des CHATS (et autre). Envoyez animaux svp !!");
}
