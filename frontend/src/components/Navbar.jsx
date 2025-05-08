import React from 'react';
import logo from '../assets/Screenshot_20250428_203955_Chrome.jpg'; // استيراد الصورة

const Navbar = () => {
    return (
        <header className="bg-white shadow-md p-4 flex flex-col items-center sm:flex-row sm:justify-between sm:items-center">
            {/* اسم الشركة */}
            <h1 className="text-2xl font-bold text-slate-700">طاقة الصمود</h1>

            {/* شعار الشركة */}
            <img
                src={logo} // <-- غيّر المسار حسب مكان شعار شركتك
                alt="شعار الشركة"
                className="w-16 h-16 mt-2 sm:mt-0"
            />
        </header>
    );
};

export default Navbar;
