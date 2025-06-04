const getDateRange = (date) => {
    if (!date) {
        throw new Error('Date is required');
    }

    const targetDate = new Date(date);
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return { targetDate, nextDate };
}

module.exports = getDateRange;