import { sendMessageToAllGuilds } from '../send-message-to-all-guilds.js';

export const sendMessageEveryTenMinutes = (client) => {
    const tenMinutesInMs = 10 * 60 * 1000;
    console.log(
        'Local environment detected: sending message every 10 minutes.',
    );
    sendAndReschedule(client, tenMinutesInMs);
};

const sendAndReschedule = async (client, delay) => {
    try {
        await sendMessageToAllGuilds(client);
        console.log('Message sent successfully. Scheduling next message.');
    } catch (error) {
        console.error('Error while sending message:', error);
    } finally {
        setTimeout(() => {
            sendAndReschedule(client, delay);
        }, delay);
    }
};
