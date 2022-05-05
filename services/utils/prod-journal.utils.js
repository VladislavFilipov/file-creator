const { sortArrayOfObjectsNew } = require("./common.utils");

module.exports.addWorksToEmps = (employees, works) => {

    return employees.map(emp => {
        let tmp = works.filter(work => work.employee?.id === emp.id).map(work => {
            let d = new Date();
            d.setFullYear(work.year);
            d.setMonth(work.month - 1);
            d.setDate(work.day);
            return ({ ...work, fullDate: d });
        });

        return { ...emp, dayToday: sortArrayOfObjectsNew(tmp, 'fullDate', 'date') };
    });
}

module.exports.getEmpsByWorkshop = (employees) => {
    const result = {};

    const filtered = employees.filter(emp => emp.dayToday?.length > 0);

    filtered.forEach(emp => {
        result[emp.workshop] ? result[emp.workshop].push(emp) : result[emp.workshop] = [emp];
    })

    return result;
}




