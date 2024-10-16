import { getRandomDate } from "../helpers/get-random-date.js";
import { getTargetDate } from "../helpers/get-target-date.js";
import { sendMessageToAllGuilds } from "./send-message-to-all-guilds.js";

let currentTimeout = null;

export const scheduleRandomTimeMessage = (client, isForTomorrow = false) => {
    if (currentTimeout) clearTimeout(currentTimeout);
    
    const now = new Date();
    const targetDate = getTargetDate(now, isForTomorrow)
    const nextTime = getRandomDate(targetDate);

    if (nextTime <= now) {
        console.log('Programmed date already in the past. Reprogramming a new time.');
        scheduleRandomTimeMessage(client);
    } else {
        console.log(`Message scheduled for ${nextTime}.`);
        scheduleTimeout(client, nextTime);
    }
};

const scheduleTimeout = (client, nextTime) => {
    const now = new Date();
    const timeUntilNextMessage = nextTime - now;

    currentTimeout = setTimeout(async () => {
        try {
            await sendMessageToAllGuilds(client);
            scheduleRandomTimeMessage(client, true);
        } catch (error) {
            console.error('Error while sending message:', error);
            scheduleRandomTimeMessage(client, true);
        }
    }, timeUntilNextMessage);
};