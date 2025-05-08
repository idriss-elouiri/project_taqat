import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewSectionPage = () => {
    const [employees, setEmployees] = useState([{ name: "", date: new Date() }]);
    const [tasks, setTasks] = useState([{ content: "", date: new Date() }]);
    const [remaining, setRemaining] = useState([{ content: "", date: new Date() }]);
    const { mainSite, subSite } = useParams();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3005";

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${encodeURIComponent(mainSite)}/${encodeURIComponent(subSite)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            setEmployees(data.employees?.length ? data.employees : [{ name: "", date: new Date() }]);
            setTasks(data.tasks?.length ? data.tasks : [{ content: "", date: new Date() }]);
            setRemaining(data.remainingWork?.length ? data.remainingWork : [{ content: "", date: new Date() }]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [API_URL, mainSite, subSite]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {subSite} - {mainSite} - عرض البيانات
            </h2>

            {/* جدول الموظفين */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">الموظفين</h3>
                    <button 
                        onClick={() => navigate(`/edit/${mainSite}/${subSite}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        تعديل البيانات
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">اسم الموظف</th>
                                <th className="border p-2">تاريخ الإضافة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{emp.name}</td>
                                    <td className="border p-2 text-center">{formatDate(emp.date)}</td>
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
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">المهمة</th>
                                <th className="border p-2">تاريخ الإضافة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{task.content}</td>
                                    <td className="border p-2 text-center">{formatDate(task.date)}</td>
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
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">المهمة المتبقية</th>
                                <th className="border p-2">تاريخ الإضافة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {remaining.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{item.content}</td>
                                    <td className="border p-2 text-center">{formatDate(item.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* أزرار إضافية */}
            <div className="flex gap-4">
                <button
                    className="flex-1 bg-green-700 text-white py-3 rounded font-bold"
                    onClick={() => window.print()}
                >
                    طباعة البيانات
                </button>
                <button
                    className="flex-1 bg-gray-600 text-white py-3 rounded font-bold"
                    onClick={() => navigate('/')}
                >
                    العودة للرئيسية
                </button>
            </div>
        </div>
    );
};

export default ViewSectionPage;