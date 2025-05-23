import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DisplayData = () => {
    const { mainSite, subSite } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/sections/${mainSite}/${subSite}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [mainSite, subSite, API_URL]); 
    
    if (!data) return <div className="p-6 text-center">جاري تحميل البيانات...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {subSite} - {mainSite} - بيانات محفوظة
            </h2>
            
            {/* جدول الموظفين */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">الموظفين</h3>
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
                            {data.employees?.map((emp, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{emp.name}</td>
                                    <td className="border p-2 text-center">
                                        {emp.date ? formatDate(emp.date) : 'غير محدد'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* جدول المهام */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">المهام</h3>
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
                            {data.tasks?.map((task, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{task.content}</td>
                                    <td className="border p-2 text-center">
                                        {task.date ? formatDate(task.date) : 'غير محدد'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* جدول العمل المتبقي */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">العمل المتبقي</h3>
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
                            {data.remainingWork?.map((item, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{item.content}</td>
                                    <td className="border p-2 text-center">
                                        {item.date ? formatDate(item.date) : 'غير محدد'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="flex gap-4">
                <button
                    className="flex-1 bg-blue-600 text-white py-3 rounded font-bold"
                    onClick={() => navigate(-1)}
                >
                    العودة للتعديل
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

export default DisplayData;