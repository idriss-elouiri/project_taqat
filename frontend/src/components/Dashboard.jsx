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
  };

  const goBackToMain = () => {
    setSelectedSite(null);
    setSelectedSubSite(null);
  };

  const goBackToSubSites = () => {
    setSelectedSubSite(null);
  };

  const handleGoToSections = () => {
    if (selectedSite && selectedSubSite) {
      navigate(`/section/${selectedSite}/${selectedSubSite}`);
    }
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

      {selectedSubSite && (
        <div className="text-right">
          <h2 className="text-2xl font-bold mb-4">{selectedSubSite}</h2>
          <p className="mb-4">اختر: الفقرات أو الـ deadline</p>
          <div className="flex gap-4 flex-wrap">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-800"
              onClick={handleGoToSections}
            >
              الفقرات
            </button>
            <button
              className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-800"
              onClick={() => alert("سيتم فتح صفحة الـ Deadline")}
            >
              Deadline
            </button>
          </div>
          <button
            className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
            onClick={goBackToSubSites}
          >
            رجوع للمواقع الفرعية
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
