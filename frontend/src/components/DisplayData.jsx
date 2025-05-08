import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DisplayData = () => {
    const { mainSite, subSite } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const API_URL = process.env.REACT_APP_BACKEND_URL;

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
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {subSite} - {mainSite} - بيانات محفوظة
            </h2>
            
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">الموظفين:</h3>
                <ul className="list-disc ps-5">
                    {data.employees?.map((emp, index) => (
                        <li key={index}>{emp.name}</li>
                    ))}
                </ul>
            </div>
            
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">المهام:</h3>
                <ul className="list-decimal ps-5">
                    {data.tasks?.map((task, index) => (
                        <li key={index}>{task.content}</li>
                    ))}
                </ul>
            </div>
            
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">العمل المتبقي:</h3>
                <ul className="list-decimal ps-5">
                    {data.remainingWork?.map((item, index) => (
                        <li key={index}>{item.content}</li>
                    ))}
                </ul>
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