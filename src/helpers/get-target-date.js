export const getTargetDate = (currentDate, isForTomorrow) => {
    const targetDate = new Date(currentDate);
    if (isForTomorrow) targetDate.setDate(targetDate.getDate() + 1);

    return targetDate;
};