from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_pdf():
    file_name = "Quotation_MOZA_CONSULTORIA_20260522.pdf"
    doc = SimpleDocTemplate(file_name, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = ParagraphStyle('TitleStyle', parent=styles['Title'], fontSize=24, spaceAfter=20)
    story.append(Paragraph("QUOTATION", title_style))

    # Header Info
    header_data = [
        [Paragraph("<b>Seller:</b> Shandong Forgealloy Racing Tech Co., Ltd", styles['Normal']), 
         Paragraph("<b>Date:</b> 2026-05-22", styles['Normal'])],
        [Paragraph("<b>Address:</b> Shandong, China", styles['Normal']), 
         Paragraph("<b>Quotation No:</b> Q20260522-01", styles['Normal'])]
    ]
    header_table = Table(header_data, colWidths=[4*inch, 2.5*inch])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP')]))
    story.append(header_table)
    story.append(Spacer(1, 0.2*inch))

    # Bill To
    story.append(Paragraph("<b>BILL TO:</b>", styles['Heading3']))
    bill_to = [
        "MOZA CONSULTORIA LTDA",
        "Mozaniel Andrade de Souza",
        "rua Raposo da Fonseca, 1014, São Paulo, SP, Brasil",
        "+5511984387707"
    ]
    for line in bill_to:
        story.append(Paragraph(line, styles['Normal']))
    story.append(Spacer(1, 0.3*inch))

    # Product Table
    def get_image(path, width=0.8*inch):
        try:
            img = Image(path)
            aspect = img.imageHeight / img.imageWidth
            img.drawWidth = width
            img.drawHeight = width * aspect
            return img
        except:
            return "No Image"

    data = [
        ["Item", "Product Image", "Description", "Qty", "Unit Price ($)", "Total ($)"],
        ["1", get_image("temp_images/img1.jpg"), "Customized Gift Cup Set (Boxed)", "100", "2.493", "249.30"],
        ["2", get_image("temp_images/img4.jpg"), "Customized Ceramic Cup and Saucer (300ml)", "50", "2.99", "149.50"],
        ["3", get_image("temp_images/img2.jpg"), "Customized Ceramic Cup and Saucer (70ml)", "50", "1.94", "97.00"],
        ["4", get_image("temp_images/img3.jpg"), "Customized Ceramic Cup and Saucer (200ml)", "50", "2.39", "119.50"],
        ["", "", "", "", "<b>Total:</b>", "<b>$615.30</b>"]
    ]

    # Column Widths
    col_widths = [0.5*inch, 1.2*inch, 2.8*inch, 0.6*inch, 1.1*inch, 1.1*inch]
    
    product_table = Table(data, colWidths=col_widths)
    product_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1f4e78")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('GRID', (0, 0), (-1, -5), 1, colors.grey),
        ('BACKGROUND', (0, -1), (-1, -1), colors.whitesmoke),
        ('LINEABOVE', (0, -1), (-1, -1), 1, colors.black),
    ]))
    
    story.append(product_table)
    story.append(Spacer(1, 0.3*inch))

    # Terms
    story.append(Paragraph("<b>Terms & Conditions:</b>", styles['Heading4']))
    terms = [
        "1. Trade Terms: EXW",
        "2. Validity: 30 Days",
        "3. Lead Time: To be confirmed upon order confirmation."
    ]
    for term in terms:
        story.append(Paragraph(term, styles['Normal']))

    doc.build(story)
    print(f"PDF generated: {file_name}")

if __name__ == "__main__":
    generate_pdf()
