import React, { useState } from "react";
import { resources } from "../constants/resources";

const ResourcePage = () => {
  const [activeTab, setActiveTab] = useState("resume");

  const renderContent = () => {
    const currentResources = resources[activeTab];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-grayStroke p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary/10">
              <th className="p-4 text-left font-SatoshiBold text-black/80">
                Name
              </th>
              <th className="p-4 text-left font-SatoshiBold text-black/80">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grayStroke">
            {currentResources.map((resource, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {resource.name}
                  </a>
                </td>
                <td className="p-4 text-black/70">{resource.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex justify-center bg-africanBackground5 py-10 md:py-20 gap-2 rounded-lg relative">
        <div className="bg-black/50 border border-gray rounded-lg">
          <h1 className="text-2xl text-white font-SatoshiBold p-2 w-full text-center">
            Resources for your career
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-50 p-1 rounded-xl">
            {Object.keys(resources).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-SatoshiMedium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gray/30 text-primary shadow-sm"
                    : "text-black/60 hover:text-black/80"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 font-SatoshiRegular">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ResourcePage;
