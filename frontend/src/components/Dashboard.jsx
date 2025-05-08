import React, { useState } from "react";
import SitesCircle from "./SitesCircle";
import SubSitesCircle from "./SubSitesCircle";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [selectedSubSite, setSelectedSubSite] = useState(null);
    const navigate = useNavigate();

    const handleSiteSelect = (siteName) => {
        setSelectedSite(siteName);
    };

    const handleSubSiteSelect = (subSiteName) => {
        setSelectedSubSite(subSiteName);
        navigate(`/section/${selectedSite}/${subSiteName}`);
    };

    const goBackToMain = () => {
        setSelectedSite(null);
        setSelectedSubSite(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-right">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
                طاقة الصمود
            </h1>

            {!selectedSite && <SitesCircle onSelectSite={handleSiteSelect} />}

            {selectedSite && !selectedSubSite && (
                <SubSitesCircle
                    mainSite={selectedSite}
                    onSelectSubSite={handleSubSiteSelect}
                    goBack={goBackToMain}
                />
            )}
        </div>
    );
};

export default Dashboard;