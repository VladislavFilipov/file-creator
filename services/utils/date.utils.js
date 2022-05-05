module.exports.formatDateString = (dateString, separator = '.') => {
    const date = new Date(dateString);
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        }${separator}${getDateMonthString(date)}${separator}${date.getFullYear()}`;
};


const getDateMonthString = (date) =>
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
