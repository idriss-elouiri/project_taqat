import React, { useEffect, useState } from "react";

const SitesCircle = ({ onSelectSite }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // لا تعرض أي شيء على الخادم

    const sites = [
        { id: 1, name: "أرزو" },
        { id: 2, name: "السفير" },
        { id: 3, name: "م. أوس" },
        { id: 4, name: "الخاص" },
        { id: 5, name: "م. حسين" },
    ];

    return (
        <div className="relative w-[400px] h-[400px] mx-auto mt-10 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gradient-to-br from-blue-100 to-white shadow-xl">
            <h2 className="absolute text-center text-xl font-bold">المواقع الرئيسية</h2>
            {sites.map((site, index) => {
                const angle = (index / sites.length) * 2 * Math.PI;
                const x = 150 * Math.cos(angle);
                const y = 150 * Math.sin(angle);
                return (
                    <button
                        key={site.id}
                        onClick={() => onSelectSite(site.name)}
                        style={{
                            position: "absolute",
                            transform: `translate(${x}px, ${y}px)`,
                        }}
                        className="w-24 h-24 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                    >
                        {site.name}
                    </button>
                );
            })}
        </div>
    );
};

export default SitesCircle;
