import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditSectionPage = () => {
    const [tableData, setTableData] = useState({
        employees: [{ name: "", date: new Date() }],
        tasks: [{ content: "", date: new Date() }],
        remaining: [{ content: "", date: new Date() }]
    });
    
    const { mainSite, subSite } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3005";

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${encodeURIComponent(mainSite)}/${encodeURIComponent(subSite)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            setTableData({
                employees: data.employees?.length ? data.employees : [{ name: "", date: new Date() }],
                tasks: data.tasks?.length ? data.tasks : [{ content: "", date: new Date() }],
                remaining: data.remainingWork?.length ? data.remainingWork : [{ content: "", date: new Date() }]
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [API_URL, mainSite, subSite]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSave = async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${encodeURIComponent(mainSite)}/${encodeURIComponent(subSite)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employees: tableData.employees.filter(emp => emp.name.trim()),
                    tasks: tableData.tasks.filter(task => task.content.trim()),
                    remainingWork: tableData.remaining.filter(item => item.content.trim())
                }),
            });

            if (!response.ok) throw new Error('Failed to save data');
            navigate(`/display/${mainSite}/${subSite}`);
        } catch (err) {
            alert(err.message || "فشل في الحفظ");
            console.error(err);
        }
    };

    const handleChange = (section, index, field, value) => {
        setTableData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addRow = (section) => {
        setTableData(prev => ({
            ...prev,
            [section]: [...prev[section], 
                section === 'employees' ? { name: "", date: new Date() } 
                : { content: "", date: new Date() }
            ]
        }));
    };

    const removeRow = (section, index) => {
        setTableData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {subSite} - {mainSite} - وضع التحرير
            </h2>

            {/* جدول متكامل */}
            <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">#</th>
                            <th className="border p-2">الموظفين</th>
                            <th className="border p-2">المهام</th>
                            <th className="border p-2">العمل المتبقي</th>
                            <th className="border p-2">تاريخ الإضافة</th>
                            <th className="border p-2">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.max(
                            tableData.employees.length,
                            tableData.tasks.length,
                            tableData.remaining.length
                        )}).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border p-2 text-center">{rowIndex + 1}</td>
                                
                                {/* خلايا الموظفين */}
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={tableData.employees[rowIndex]?.name || ""}
                                        onChange={(e) => 
                                            handleChange('employees', rowIndex, 'name', e.target.value)
                                        }
                                    />
                                </td>
                                
                                {/* خلايا المهام */}
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={tableData.tasks[rowIndex]?.content || ""}
                                        onChange={(e) => 
                                            handleChange('tasks', rowIndex, 'content', e.target.value)
                                        }
                                    />
                                </td>
                                
                                {/* خلايا العمل المتبقي */}
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={tableData.remaining[rowIndex]?.content || ""}
                                        onChange={(e) => 
                                            handleChange('remaining', rowIndex, 'content', e.target.value)
                                        }
                                    />
                                </td>
                                
                                {/* خلية التاريخ */}
                                <td className="border p-2 text-center">
                                    {formatDate(
                                        tableData.employees[rowIndex]?.date || 
                                        tableData.tasks[rowIndex]?.date || 
                                        tableData.remaining[rowIndex]?.date || 
                                        new Date()
                                    )}
                                </td>
                                
                                {/* خلية الإجراءات */}
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => {
                                            if (tableData.employees[rowIndex]) removeRow('employees', rowIndex);
                                            if (tableData.tasks[rowIndex]) removeRow('tasks', rowIndex);
                                            if (tableData.remaining[rowIndex]) removeRow('remaining', rowIndex);
                                        }}
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

            {/* أزرار الإضافة */}
            <div className="flex gap-4 mb-6 justify-center">
                <button
                    onClick={() => addRow('employees')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    إضافة صف للموظفين
                </button>
                <button
                    onClick={() => addRow('tasks')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    إضافة صف للمهام
                </button>
                <button
                    onClick={() => addRow('remaining')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    إضافة صف للعمل المتبقي
                </button>
            </div>

            {/* أزرار الحفظ والعودة */}
            <div className="flex gap-4">
                <button
                    className="flex-1 bg-purple-600 text-white py-3 rounded font-bold"
                    onClick={handleSave}
                >
                    حفظ البيانات
                </button>
                <button
                    className="flex-1 bg-gray-600 text-white py-3 rounded font-bold"
                    onClick={() => navigate(`/view/${mainSite}/${subSite}`)}
                >
                    عرض البيانات
                </button>
            </div>
        </div>
    );
};

export default EditSectionPage;