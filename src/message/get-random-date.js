export const getRandomDate = (nextTimeDay) => {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const nextTime = new Date(nextTimeDay.getFullYear(), nextTimeDay.getMonth(), nextTimeDay.getDate(), randomHour, randomMinute, randomSecond);

    return nextTime;
}