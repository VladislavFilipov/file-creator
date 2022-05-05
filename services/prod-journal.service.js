const { createFile } = require("./utils/pdf.utils");
const { addWorksToEmps, getEmpsByWorkshop } = require("./utils/prod-journal.utils");


class ProdJournalService {

    createPdfDay(data) {
        return new Promise(async (res, rej) => {
            // const yesterday = 
            // console.log('data.employees', data.employees);
            const employees = addWorksToEmps(data.employees.filter(epm => epm.relevance === 'Работает'), data.works);

            const workshopsEmployees = getEmpsByWorkshop(employees);

            const file = await createFile(workshopsEmployees, Date.parse(data.date), false, data.drafts);

            return res(file);
            // return rej({ status: 500, message: 'omg error' });
        })
    }
}

module.exports = new ProdJournalService();