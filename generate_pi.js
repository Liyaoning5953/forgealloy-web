const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign, PageOrientation, HeadingLevel } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "微软雅黑",
          size: 20, // 10pt
        }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 48, bold: true, color: "1F497D", font: "微软雅黑" },
        paragraph: { spacing: { after: 300 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        run: { size: 28, bold: true, color: "1F497D", font: "微软雅黑" },
        paragraph: { spacing: { before: 240, after: 120 } }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 720, right: 720, bottom: 720, left: 720 }
      }
    },
    children: [
      new Paragraph({
        text: "PROFORMA INVOICE",
        heading: HeadingLevel.TITLE,
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: "Date: 2026-06-01", bold: true }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: "PI No.: PI20260601-01", bold: true }),
        ]
      }),
      
      // Seller and Buyer Info
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "SELLER:", bold: true, color: "1F497D" })] }),
                  new Paragraph({ children: [new TextRun("Jinan Xinbo International Trade Co., Ltd")] }),
                  new Paragraph({ children: [new TextRun("Jinan, Shandong, China")] }),
                ]
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "BUYER:", bold: true, color: "1F497D" })] }),
                  new Paragraph({ children: [new TextRun("LIORA ZENVIRA BY CEDINA PONTE DE LIMA")] }),
                  new Paragraph({ children: [new TextRun("AV. dos Bombeiros Voluntários n°78 - Fracção A")] }),
                  new Paragraph({ children: [new TextRun("4990-344, Arca, Ponte de Lima")] }),
                  new Paragraph({ children: [new TextRun("NIF: 519343875")] }),
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }), // Spacer
      
      // Item Table
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          // Header Row
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Description", color: "FFFFFF", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quantity", color: "FFFFFF", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Unit Price (USD)", color: "FFFFFF", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Total (USD)", color: "FFFFFF", bold: true })] })]
              })
            ]
          }),
          // Item 1
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("50ml Small Gold Foil Cup & Saucer")] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("100 sets")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$7.45")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$745.00")] })] })
            ]
          }),
          // Item 2
          new TableRow({
            shading: { fill: "F7F7F7", type: ShadingType.CLEAR },
            children: [
              new TableCell({ children: [new Paragraph("200ml Gold Cup & Saucer")] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("20 sets")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$9.25")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$185.00")] })] })
            ]
          }),
          // Subtotal Row
          new TableRow({
            children: [
              new TableCell({ columnSpan: 3, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Subtotal:", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$930.00")] })] })
            ]
          }),
          // Shipping Row
          new TableRow({
            children: [
              new TableCell({ columnSpan: 3, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Shipping Fee:", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("$198.00")] })] })
            ]
          }),
          // Grand Total Row
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 3,
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "GRAND TOTAL:", color: "FFFFFF", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "1F497D", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$1,128.00", color: "FFFFFF", bold: true })] })]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }), // Spacer
      
      new Paragraph({
        children: [
          new TextRun({ text: "Payment Terms:", bold: true, underline: {} }),
        ]
      }),
      new Paragraph({ text: "1. 100% T/T before shipment." }),
      new Paragraph({ text: "2. Bank details will be provided upon request." }),
      
      new Paragraph({ text: "" }), // Spacer
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480 },
        children: [
          new TextRun({ text: "Thank you for your business!", italics: true }),
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("PI_LIORA_ZENVIRA_20260601.docx", buffer);
  console.log("PI generated successfully.");
});
