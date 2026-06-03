const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel } = require('docx');

const content = fs.readFileSync('extracted_leads.txt', 'utf-8');
const lines = content.split('\n');

// The detailed leads start from line 107 (index 106)
const leadLines = lines.slice(106);
const leads = [];

for (let i = 0; i < leadLines.length; i += 6) {
    if (leadLines[i] && leadLines[i].includes('|')) {
        leads.push({
            name: leadLines[i].split('|')[1].trim(),
            website: leadLines[i+1] ? leadLines[i+1].split('|')[1].trim() : '',
            decisionMaker: leadLines[i+2] ? leadLines[i+2].split('|')[1].trim() : '',
            email: leadLines[i+3] ? leadLines[i+3].split('|')[1].trim() : '',
            hook: leadLines[i+4] ? leadLines[i+4].split('|')[1].trim() : '',
            action: leadLines[i+5] ? leadLines[i+5].split('|')[1].trim() : ''
        });
    }
}

async function createDoc(leadsSubset, filename, title) {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: title,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({ text: "" }),
                ...leadsSubset.flatMap(lead => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: `客户名称: `, bold: true }),
                            new TextRun(lead.name),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `官方网站: `, bold: true }),
                            new TextRun(lead.website),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `决策人: `, bold: true }),
                            new TextRun(lead.decisionMaker),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `联系邮箱: `, bold: true }),
                            new TextRun(lead.email),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `核心业务/高转化钩子: `, bold: true }),
                            new TextRun(lead.hook),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: `建议行动: `, bold: true }),
                            new TextRun(lead.action),
                        ],
                    }),
                    new Paragraph({ text: "--------------------------------------------------" }),
                ])
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filename, buffer);
}

const splitCount = Math.ceil(leads.length / 3);
const part1 = leads.slice(0, 33);
const part2 = leads.slice(33, 66);
const part3 = leads.slice(66);

const titleBase = "全球锻造轮毂经销商狩猎报告";

createDoc(part1, "Global_Forged_Leads_Part1.docx", `${titleBase} (Part 1/3)`)
    .then(() => createDoc(part2, "Global_Forged_Leads_Part2.docx", `${titleBase} (Part 2/3)`))
    .then(() => createDoc(part3, "Global_Forged_Leads_Part3.docx", `${titleBase} (Part 3/3)`))
    .then(() => console.log("Documents created successfully"));
