const { formatDateString } = require("./date.utils");

const PdfPrinter = require('pdfmake');

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};


module.exports.createFile = async (data, date, isWeekMode, testDrafts) => {
    const docDefinition = createDocDefinition(data, date, isWeekMode, testDrafts)
    // console.log('docDefinition', docDefinition);

    const pdfFile = await getPDF(docDefinition);
    // console.log('file', file);

    return new Promise((resolve, reject) => {
        try {
            var chunks = [];
            pdfFile.on('data', chunk => chunks.push(chunk));
            pdfFile.on('end', () => resolve(Buffer.concat(chunks)));
            pdfFile.end();
        } catch (err) {
            reject(err);
        }
    });

    // const fileBase64 = file.getBlob((data) => {
    //     // alert(data);
    //     const fileData = createFormDataFromObject({ files: [data] });
    //     console.log('fileData', fileData);
    // });
    // // console.log('sendEmailData', file, fileBase64);


    // createPDF(docDefinition);
    // try {
    // const fileData = createFormDataFromObject({ files: file });


    // console.log('fileData', fileData);
    //     if (fileData) {
    //         await editProductFile(fileData, formData.id)
    //     }
    // } catch (error) {

    // }
}

const getPDF = async (docDefinition) => {
    const printer = new PdfPrinter(fonts);
    return printer.createPdfKitDocument(docDefinition);


}

const createDocDefinition = (data, date, isWeekMode, testDrafts) => {
    const title = `Дневник производства ${formatDateString(date)} ${isWeekMode ? '(вся неделя)' : ''}`;
    let content = [{
        text: title, style: 'header'
    }];

    for (const workshop of Object.keys(data)) {
        const employees = data[workshop];
        const body = getWorkshopList(employees, testDrafts);

        if (body.length > 0) {
            content.push({
                text: workshop, style: 'workshopName', margin: [0, 10]
            });

            content.push({
                table: {
                    widths: [120, '*', 30],
                    body: body
                }
            });

            content.push('');
        }
    }

    return {
        info: {
            title: title
        },
        // header: { text: title, style: 'header' },
        content: content,
        styles: {
            workshopName: {
                fontSize: 16
            },
            header: {
                fontSize: 18,
                alignment: 'center',
                decoration: 'underline'
            }
        }
    };

    // createPDF(docDefinition);
}

const getWorkshopList = (employees, testDrafts) => {

    let result = [];

    for (const emp of employees) {
        for (let i = 0; i < emp.dayToday.length; i++) {
            const work = emp.dayToday[i];
            const composition = `${work.workList.work}` +
                getWorkComposition(work, testDrafts) +
                (work.comment ? `\nКомментарий: ${work.comment}` : '');

            if (i === 0) {
                result.push([
                    { text: `${emp.lastName} ${emp.name[0]}. ${emp.middleName[0]}.`, rowSpan: emp.dayToday.length },
                    composition,
                    `${work.hours} ч`
                ])
            } else {
                result.push([
                    '',
                    composition,
                    `${work.hours} ч`
                ])
            }
        }
    }

    return result;
}

const getWorkComposition = (work, testDrafts) => {

    let result = '';

    if (work.workControlProduct.length > 0) {
        result += work.workControlProduct.map(product => `- ${product.product.name} - ${product.quantity} шт.`).join('\n')
    }

    if (work.partsWorks.length > 0) {
        result += work.partsWorks.map(partsWorksItem => {
            const d = testDrafts.find(draft => draft.id === partsWorksItem.draftId);

            if (d) {
                const tmp = d.stampParts.find(part => part.id === partsWorksItem.partId);

                return `- ${tmp ? `${tmp.number}: ${tmp.name}` : 'Чертеж ' + partsWorksItem.name} - ${partsWorksItem.quantity} шт.`
            } else {
                return '';
            }
        }).join('\n')
    }

    return result ? '\n' + result : result;
}