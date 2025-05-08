import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import loginImage from '../assets/contact_img.png'; // استيراد الصورة

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })

            });
            const data = await response.json()
            if (response.ok) {

                setUser(data)
                navigate('/');
            }
        } catch (err) {
            setError('اسم المستخدم أو كلمة السر غير صحيحة');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* الجانب الأيسر: الصورة */}
                <div className="md:w-1/2 bg-blue-600 hidden md:block relative">
                    <img
                        src={loginImage}
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-800 bg-opacity-40 flex items-center justify-center p-8">
                        <div className="text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">طاقة الصمود</h2>
                            <p className="text-xl">نظام إدارة المواقع والموظفين</p>
                        </div>
                    </div>
                </div>

                {/* الجانب الأيمن: نموذج الدخول */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8 md:hidden">
                        <img
                            src="/logo.png"
                            alt="Company Logo"
                            className="w-24 h-24 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-blue-800">طاقة الصمود</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 text-center">تسجيل الدخول</h2>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                                اسم المستخدم:
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="أدخل اسم المستخدم"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                                كلمة السر:
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="أدخل كلمة السر"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            دخول
                        </button>
                    </form>

                  
                </div>
            </div>
        </div>
    );
};

export default Login;