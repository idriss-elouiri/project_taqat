import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SectionPage = () => {
    const [employees, setEmployees] = useState([{ name: "" }]);
    const [tasks, setTasks] = useState([{ content: "" }]);
    const [remaining, setRemaining] = useState([{ content: "" }]);
    const { mainSite, subSite } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${mainSite}/${subSite}`);
            if (!response.ok) {
                if (response.status === 404) {
                    console.log("لا توجد بيانات محفوظة لهذا القسم بعد");
                    return;
                }
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data.employees?.length ? data.employees : [{ name: "" }]);
            setTasks(data.tasks?.length ? data.tasks : [{ content: "" }]);
            setRemaining(data.remainingWork?.length ? data.remainingWork : [{ content: "" }]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [API_URL, mainSite, subSite]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSave = async () => {
        try {
            const filteredEmployees = employees.filter(emp => emp.name.trim());
            const filteredTasks = tasks.filter(task => task.content.trim());
            const filteredRemaining = remaining.filter(item => item.content.trim());

            const response = await fetch(`${API_URL}/api/sections/${mainSite}/${subSite}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employees: filteredEmployees,
                    tasks: filteredTasks,
                    remainingWork: filteredRemaining,
                }),
            });

            if (!response.ok) {
                throw new Error('فشل في الحفظ');
            }

            navigate(`/display/${mainSite}/${subSite}`);
        } catch (err) {
            alert(err.message || "فشل في الحفظ");
            console.error(err);
        }
    };

    const handleExportExcel = async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${mainSite}/${subSite}/export-excel`);
            if (!response.ok) throw new Error('فشل في تحميل ملف Excel');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${mainSite}-${subSite}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('حدث خطأ أثناء التصدير');
            console.error(error);
        }
    };

    const addRow = (type) => {
        if (type === 'employees') {
            setEmployees([...employees, { name: "" }]);
        } else if (type === 'tasks') {
            setTasks([...tasks, { content: "" }]);
        } else {
            setRemaining([...remaining, { content: "" }]);
        }
    };

    const handleChange = (type, index, field, value) => {
        if (type === 'employees') {
            const newEmployees = [...employees];
            newEmployees[index][field] = value;
            setEmployees(newEmployees);
        } else if (type === 'tasks') {
            const newTasks = [...tasks];
            newTasks[index][field] = value;
            setTasks(newTasks);
        } else {
            const newRemaining = [...remaining];
            newRemaining[index][field] = value;
            setRemaining(newRemaining);
        }
    };

    const removeRow = (type, index) => {
        if (type === 'employees') {
            setEmployees(employees.filter((_, i) => i !== index));
        } else if (type === 'tasks') {
            setTasks(tasks.filter((_, i) => i !== index));
        } else {
            setRemaining(remaining.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {subSite} - {mainSite}
            </h2>

            {/* جدول الموظفين */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">الموظفين</h3>
                    <button 
                        onClick={() => addRow('employees')}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        إضافة موظف
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">اسم الموظف</th>
                                <th className="border p-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={emp.name}
                                            onChange={(e) => handleChange('employees', index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => removeRow('employees', index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* جدول المهام */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">المهام</h3>
                    <button 
                        onClick={() => addRow('tasks')}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        إضافة مهمة
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">المهمة</th>
                                <th className="border p-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={task.content}
                                            onChange={(e) => handleChange('tasks', index, 'content', e.target.value)}
                                        />
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => removeRow('tasks', index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* جدول العمل المتبقي */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">العمل المتبقي</h3>
                    <button 
                        onClick={() => addRow('remaining')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        إضافة مهمة متبقية
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">المهمة المتبقية</th>
                                <th className="border p-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {remaining.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={item.content}
                                            onChange={(e) => handleChange('remaining', index, 'content', e.target.value)}
                                        />
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => removeRow('remaining', index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* أزرار الحفظ والتصدير */}
            <div className="flex gap-4 mt-6">
                <button
                    className="flex-1 bg-purple-600 text-white py-3 rounded font-bold"
                    onClick={handleSave}
                >
                    حفظ البيانات
                </button>
                <button
                    className="flex-1 bg-green-700 text-white py-3 rounded font-bold"
                    onClick={handleExportExcel}
                >
                    تصدير إلى Excel
                </button>
            </div>
        </div>
    );
};

export default SectionPage;