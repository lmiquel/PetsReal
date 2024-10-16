import { getRandomIntInRange } from "../numbers/get-random-int-in-range.js";

export const getRandomDate = (baseDate) => {
    if (!baseDate || !(baseDate instanceof Date)) console.error('Invalid date provided.');

    const randomHour = getRandomIntInRange(0, 24);
    const randomMinute = getRandomIntInRange(0, 60);
    const randomSecond = getRandomIntInRange(0, 60);

    return new Date(
        baseDate.getFullYear(), 
        baseDate.getMonth(), 
        baseDate.getDate(), 
        randomHour, 
        randomMinute, 
        randomSecond
    );
}