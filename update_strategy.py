import sys

# Read original content up to the end of Part 3
with open("Alibaba_SEO_Full_Strategy.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

content_up_to_part3 = "".join(lines[:282])

# Part 4 & 5
part4_5 = """
## 第四部分：双片式 (2-Piece) 专项调研发现

基于对国际站（Alibaba.com）及改装市场的深度调研，双片式锻造轮毂由于其“轮辐+轮辋”的分离式结构，在溢价能力和定制灵活性上远超单片式。以下是提升转化的核心热词与技术解析：

1.  **12000T 锻造压力 (12000-Ton Forging)**：
    *   **解析**：双片式结构对连接处的强度要求更高。12000 吨级压力不仅是强度的背书，更是产品进入“顶级改装圈”的入场券。
    *   **应用**：在描述中强调“12000T Aircraft-grade 6061-T6 Aluminum”，增加买家信任。

2.  **Step Lip (阶梯唇/阶梯边)**：
    *   **解析**：相对于平边（Flat Lip），阶梯唇能创造更丰富的视觉层次感，是高性能跑车和豪华轿车的主流选择。
    *   **应用**：标题中必须包含 "Step Lip" 或 "Stepped Lip"。

3.  **Barrel Polished (轮辋抛光)**：
    *   **解析**：双片轮毂的一大卖点是轮辋与轮辐可以做不同涂装。将 Barrel（轮辋/外边）做镜面抛光（Mirror Polish），而轮辐做拉丝（Brushed），是目前高溢价产品的标配。
    *   **应用**：卖点中加入 "Two-tone finish options (Brushed face + Polished barrel)"。

4.  **Hardware Options (五金工艺)**：
    *   **Hidden Hardware (隐藏螺栓)**：适合极简、现代风格。
    *   **Exposed Rivets/Bolts (外露铆钉)**：适合竞技、工业风。使用“钛合金螺栓 (Titanium Bolts)”作为升级项，可显著提升客单价。

---

## 第五部分：双片式爆款标题矩阵 (100条)

| # | 标题 (Title) |
| :--- | :--- |
"""

with open("titles_100.txt", "r", encoding="utf-8") as f:
    titles = f.read()

part4_5 += titles

# Part 6
part6 = """
---

## 第六部分：操作建议
1.  **批量上传**：建议使用配套生成的 [Alibaba_SEO_Titles_230.xlsx](Alibaba_SEO_Titles_230.xlsx) 文件进行国际站后台批量上传。确保“产品关键词”字段与标题中的核心词对齐。
2.  **主图优化**：每组标题应匹配对应的渲染图或实拍图。越野类建议使用“户外山地装车图”，深唇类建议使用“镜面微距特写图”。
3.  **详情页联动**：在详情页顶部嵌入 Section 1 中的工厂优势文字，并配以“万吨锻压过程”的短视频，可有效缩短买家询盘决策周期。
4.  **长尾覆盖**：标题中已嵌入大量车系关键词（Mustang, BMW, Silverado 等），这符合 Accio 2026 年最新的“精准适配流”推送算法。

---
**文档生成者**：生意助手 - SEO 策略专家
**日期**：2026-05-19
"""

final_content = content_up_to_part3 + part4_5 + part6

with open("Alibaba_SEO_Full_Strategy.md", "w", encoding="utf-8") as f:
    f.write(final_content)
