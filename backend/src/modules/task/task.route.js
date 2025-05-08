import express from "express";
import Section from "../task/task.model.js"

const router = express.Router();

// نقطة النهاية الموحدة للحفظ والتحديث
router.post("/:mainSite/:subSite", async (req, res) => {
    const { mainSite, subSite } = req.params;
    const { employees, tasks, remainingWork } = req.body;

    try {
        await Section.findOneAndUpdate(
            { mainSite, subSite },
            {
                mainSite,
                subSite,
                employees,
                tasks,
                remainingWork
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'تم الحفظ بنجاح' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'فشل في الحفظ', details: error.message });
    }
});

// جلب بيانات الموقع الفرعي
router.get("/:mainSite/:subSite", async (req, res) => {
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

export default router;