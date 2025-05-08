import express from "express";
import Section from "../task/task.model.js";
import ExcelJS from "exceljs";

const router = express.Router();

router.post("/:mainSite/:subSite", async (req, res) => {
    const { mainSite, subSite } = req.params;
    const { employees, tasks, remainingWork } = req.body;

    try {
        const filteredEmployees = employees.filter(emp => emp.name?.trim());
        const filteredTasks = tasks.filter(task => task.content?.trim());
        const filteredRemaining = remainingWork.filter(item => item.content?.trim());

        await Section.findOneAndUpdate(
            { mainSite, subSite },
            { 
                mainSite, 
                subSite, 
                employees: filteredEmployees, 
                tasks: filteredTasks, 
                remainingWork: filteredRemaining 
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'تم الحفظ بنجاح' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'فشل في الحفظ', details: error.message });
    }
});

router.get("/:mainSite/:subSite/export-excel", async (req, res) => {
    const { mainSite, subSite } = req.params;

    try {
        const section = await Section.findOne({ mainSite, subSite });
        if (!section) return res.status(404).json({ error: 'Section not found' });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`${mainSite}-${subSite}`);

        // إعداد التنسيق للعناوين
        const headerStyle = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } },
            font: { bold: true },
            alignment: { horizontal: 'center' }
        };

        // الموظفين
        worksheet.addRow(['الموظفين']).eachCell(cell => { cell.style = headerStyle; });
        worksheet.addRow(['م', 'اسم الموظف']);
        section.employees.forEach((emp, index) => {
            worksheet.addRow([index + 1, emp.name]);
        });

        worksheet.addRow([]);

        // المهام
        worksheet.addRow(['المهام']).eachCell(cell => { cell.style = headerStyle; });
        worksheet.addRow(['م', 'وصف المهمة']);
        section.tasks.forEach((task, index) => {
            worksheet.addRow([index + 1, task.content]);
        });

        worksheet.addRow([]);

        // العمل المتبقي
        worksheet.addRow(['العمل المتبقي']).eachCell(cell => { cell.style = headerStyle; });
        worksheet.addRow(['م', 'وصف العمل المتبقي']);
        section.remainingWork.forEach((item, index) => {
            worksheet.addRow([index + 1, item.content]);
        });

        // ضبط عرض الأعمدة تلقائياً
        worksheet.columns.forEach(column => {
            column.width = Math.max(
                10, 
                column.values.reduce((max, value) => 
                    Math.max(max, value ? value.toString().length : 0), 0)
            ) + 2;
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${mainSite}-${subSite}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'خطأ في التصدير', details: err.message });
    }
});
router.get('/:mainSite/:subSite', async (req, res) => {
    const { mainSite, subSite } = req.params;
    
    try {
        const section = await Section.findOne({ mainSite, subSite });
        if (section) {
            res.status(200).json(section);
        } else {
            res.status(404).json({ message: "لم يتم العثور على الفقرات" });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "فشل في الجلب", details: error.message });
    }
});
// بقية النقاط الأخرى (GET /:mainSite/:subSite) تبقى كما هي...

export default router;