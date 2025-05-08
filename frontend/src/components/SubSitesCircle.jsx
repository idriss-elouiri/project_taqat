import React, { useEffect, useState } from "react";

const subSitesMap = {
    "أرزو": ["الأمن", "الخزرجي", "الطويسة", "العامرية", "ليمونة", "المعهد", "مخابرات جيران"],
    "م. أوس": ["بلال", "شقق زيونة", "منزل زيونة"],
    "م. حسين": ["مكتبة الداوودي"],
    "الخاص": [
        "الأطباء أبو معتز", 
        "ألبان عويريج", 
        "الأطباء عمر الكرخي", 
        "شقق نينوى", 
        "مخازن ٢٤", 
        "فيلا الجادريه", 
        "بناية الأعظمية"
    ],
};

const SubSitesCircle = ({ mainSite, onSelectSubSite, goBack }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subSites = subSitesMap[mainSite] || [];

    return (
        <div className="relative w-[400px] h-[400px] mx-auto mt-10 rounded-full border-4 border-green-500 flex items-center justify-center bg-gradient-to-br from-green-100 to-white shadow-xl">
            <h2 className="absolute text-center text-lg font-bold">{mainSite}</h2>

            {subSites.map((sub, index) => {
                const angle = (index / subSites.length) * 2 * Math.PI;
                const x = 150 * Math.cos(angle);
                const y = 150 * Math.sin(angle);
                return (
                    <button
                        key={index}
                        onClick={() => onSelectSubSite(sub)}
                        className="absolute w-20 h-20 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center hover:bg-green-800 transition duration-300"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                        }}
                    >
                        {sub}
                    </button>
                );
            })}

            <button
                onClick={goBack}
                className="absolute bottom-[-60px] px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
            >
                رجوع
            </button>
        </div>
    );
};

export default SubSitesCircle;