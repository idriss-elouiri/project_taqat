import Task from './task.model.js';
import { errorHandler } from '../../utils/error.js'

// إنشاء مهمة جديدة
export const createTask = async (req, res, next) => {
    const { description, subsiteId } = req.body;

    const newTask = new Task({
        description,
        completed: false,
        site: req.params.siteId,
        subsite: subsiteId,
        user: req.user.id,
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        next(error);
    }
};

// الحصول على جميع المهام لموقع معين
export const getSiteTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            site: req.params.siteId,
            user: req.user.id,
        });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// الحصول على مهمة معينة
export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!task) return next(errorHandler(404, 'المهمة غير موجودة'));

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// تحديث مهمة
export const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.taskId, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedTask) return next(errorHandler(404, 'المهمة غير موجودة'));

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// حذف مهمة
export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!deletedTask) return next(errorHandler(404, 'المهمة غير موجودة'));

        res.status(200).json({ message: 'تم حذف المهمة بنجاح' });
    } catch (error) {
        next(error);
    }
};

// تبديل حالة المهمة (مكتملة/غير مكتملة)
export const toggleTaskCompletion = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!task) return next(errorHandler(404, 'المهمة غير موجودة'));

        task.completed = !task.completed;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};
