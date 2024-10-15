import { getRandomDate } from "./get-random-date.js";
import { sendMessage } from "./send-message.js";

let currentTimeout = null;

export const scheduleRandomTimeMessage = (client, forTomorrow = false) => {
    if (currentTimeout) clearTimeout(currentTimeout);
    
    const now = new Date();
    const today = now;
    const tomorrow = new Date(now.setDate(now.getDate() + 1))

    const nextTime = getRandomDate(forTomorrow ? tomorrow : today)

    if (nextTime <= now) {
        console.log('PetsReal: Programmed date already in the past. Reprogramming a new time.')
        scheduleRandomTimeMessage(client);
    } else {
        console.log(`PetsReal: message programmed at ${nextTime}`);
                
        const timeUntilNextMessage = nextTime - now;
        currentTimeout = setTimeout(async () => {
            await sendMessage(client);
            scheduleRandomTimeMessage(client, true);
        }, timeUntilNextMessage);
    }
}
