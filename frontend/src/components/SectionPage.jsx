import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SectionPage = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");

    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    const [remaining, setRemaining] = useState([]);
    const [remainingText, setRemainingText] = useState("");
    const { mainSite, subSite } = useParams()
    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_BACKEND_URL;


    // جلب البيانات المحفوظة
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
            setEmployees(data.employees || []);
            setTasks(data.tasks || []);
            setRemaining(data.remainingWork || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [API_URL, mainSite, subSite]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    // حفظ البيانات
    const handleSave = async () => {
        try {
            const response = await fetch(`${API_URL}/api/sections/${mainSite}/${subSite}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employees: employees.map(emp => ({ name: emp.name })),
                    tasks: tasks.map(task => ({ content: task.content })),
                    remainingWork: remaining.map(item => ({ content: item.content })),
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'فشل في الحفظ');
            }

            // بعد الحفظ الناجح، توجيه المستخدم إلى صفحة العرض
            navigate(`/display/${mainSite}/${subSite}`);
        } catch (err) {
            alert(err.message || "فشل في الحفظ");
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {subSite} - {mainSite}
            </h2>

            {/* الموظفين */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">الموظفين:</h3>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="border p-2 flex-1"
                        placeholder="اسم الموظف"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 rounded"
                        onClick={() => {
                            if (employeeName) {
                                setEmployees([...employees, { name: employeeName }]);
                                setEmployeeName("");
                            }
                        }}
                    >
                        إضافة
                    </button>
                </div>
                <ul className="list-disc ps-5">
                    {employees.map((emp, index) => (
                        <li key={index} className="flex justify-between">
                            {emp.name}
                            <button
                                onClick={() =>
                                    setEmployees(employees.filter((_, i) => i !== index))
                                }
                                className="text-red-500"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* المهام */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">المهام:</h3>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="border p-2 flex-1"
                        placeholder="المهمة"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-4 rounded"
                        onClick={() => {
                            if (taskText) {
                                setTasks([...tasks, { content: taskText }]);
                                setTaskText("");
                            }
                        }}
                    >
                        إضافة
                    </button>
                </div>
                <ul className="list-decimal ps-5">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex justify-between">
                            {task.content}
                            <button
                                onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                                className="text-red-500"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* العمل المتبقي */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">العمل المتبقي:</h3>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="border p-2 flex-1"
                        placeholder="مهمة متبقية"
                        value={remainingText}
                        onChange={(e) => setRemainingText(e.target.value)}
                    />
                    <button
                        className="bg-yellow-500 text-white px-4 rounded"
                        onClick={() => {
                            if (remainingText) {
                                setRemaining([...remaining, { content: remainingText }]);
                                setRemainingText("");
                            }
                        }}
                    >
                        إضافة
                    </button>
                </div>
                <ul className="list-decimal ps-5">
                    {remaining.map((task, index) => (
                        <li key={index} className="flex justify-between">
                            {task.content}
                            <button
                                onClick={() => setRemaining(remaining.filter((_, i) => i !== index))}
                                className="text-red-500"
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* زر الحفظ */}
            <button
                className="w-full bg-purple-600 text-white py-3 rounded font-bold"
                onClick={handleSave}
            >
                حفظ البيانات
            </button>
        </div>
    );
};

export default SectionPage;
