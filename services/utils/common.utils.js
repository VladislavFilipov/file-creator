module.exports.sortArrayOfObjectsNew = (array, objField, objFieldType = 'string', order = 'inc') => {

    if (objFieldType === 'string' || objFieldType === 'date') {
        return array.sort((a, b) => {
            if (a[objField] > b[objField]) {
                return order === 'inc' ? 1 : -1;
            } else if (a[objField] < b[objField]) {
                return order === 'inc' ? -1 : 1;
            } else {
                return 0;
            }
        });
    } else if (objFieldType === 'number') {
        return array.sort((a, b) => order === 'inc' ? a[objField] - b[objField] : b[objField] - a[objField]);
    } else {
        return array;
    }
}