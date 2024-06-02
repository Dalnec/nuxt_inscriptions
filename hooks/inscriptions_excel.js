import Excel from "exceljs";
import saveAs from "file-saver";
export const generateExcelReportCatalogue = async (data) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Inscripciones");

    const columns = [
        { col: "B", header: "DNI", key: "doc_num", width: 15 },
        { col: "C", header: "NOMBRES", key: "fullname", width: 45 },
        { col: "D", header: "GENERO", key: "gender", width: 12 },
        { col: "E", header: "IGLESIA", key: "church", width: 20 },
        { col: "F", header: "TIPO", key: "type_person", width: 18 },
        { col: "G", header: "TELEFONO", key: "phone", width: 15 },
        { col: "H", header: "# GROUP", key: "countgroup", width: 15 },
        { col: "I", header: "COD GRUPO", key: "vouchergroup", width: 15 },
        { col: "J", header: "METODO PAGO", key: "paymentmethod", width: 18 },
        { col: "K", header: "MONTO", key: "amount", width: 12 },
        { col: "L", header: "ESTADO", key: "status", width: 18 },
    ];

    worksheet.mergeCells("A1:L2");
    worksheet.getCell("B1").value = "Reporte de Inscripciones Campamento 2024";
    worksheet.getCell("B1").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B1").font = { color: { argb: "0c0811" }, bold: true, size: 18 };

    columns.forEach(function (c) {
        worksheet.getCell(c["col"] + 3).value = c["header"];
        worksheet.getCell(c["col"] + 3).alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getColumn(c["col"]).width = c["width"];
        worksheet.getCell(c["col"] + 3).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "34C5A1" },
            bold: true,
        };
        worksheet.getCell(c["col"] + 8).font = {
            color: { argb: "ffffff" },
            name: "Arial",
            size: 11,
            bold: true,
        };

        let col = c["key"];
        // Pintar Datos
        let formatdata = data.map((d) => {
            return {
                ...d,
                doc_num: d.person.doc_num,
                fullname: d.person.names + " " + d.person.lastnames,
                gender: d.person.gender == "M" ? "Masculino" : "Femenino",
                church: d.person.church.description,
                type_person: d.person.type_person,
                phone: d.person.phone,
                paymentmethod: d.paymentmethod.description,
                amount: d.amount,
                status: d.status,
            }
        });
        formatdata.forEach(function (d, i) {
            worksheet.getCell(c["col"] + (i + 4)).value = d[col];
            worksheet.getCell(c["col"] + (i + 4)).alignment = {
                vertical: "middle",
                horizontal: "center",
            };
        });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        saveAs(blob, "Reporte Incripciones.xlsx");
    });
};
