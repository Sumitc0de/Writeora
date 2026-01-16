import React, { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Contact,
} from "lucide-react";

import ProfileSettings from "../../src/components/user/ProfileSettings";
import AccountSettings from "../../src/components/user/AccountSettings";
import BillingSettings from "../../src/components/user/BillingSettings";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Settings },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "account":
        return <AccountSettings />;
      case "billing":
        return <BillingSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0D] lg:px-22  text-white flex flex-col lg:flex-row">
      
      {/* SIDEBAR (DESKTOP) */}
      <aside className="hidden lg:flex w-72 bg-[#141410] border-r border-[#2A2A20] p-6 flex-col sticky top-0 h-screen">
        <h1 className="text-xl font-bold mb-10">Writeora</h1>

        <nav className="flex flex-col gap-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${
                isActive
                ? "bg-[#F2CC0D]/10 border-l-4 border-[#F2CC0D] text-[#F2CC0D]"
                : "text-[#C4C1A0] hover:bg-[#2A2A20]/20"
              }`}
              >
              <tab.icon size={18} />
              <span className="text-sm font-light">{tab.label}</span>
              </button>
            );
            })}
          </nav>

          <hr className="mt-5 border-t border-[white]/40" />

          <button className="mt-auto flex items-center gap-3 text-[#C4C1A0] hover:text-red-400 font-light">
            <LogOut size={18} />
            Sign Out
          </button>
          </aside>

          {/* MOBILE TABS */}
      <div className="lg:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-[#141410] border-b border-[#2A2A20]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#F2CC0D] text-black"
                : "bg-[#2A2A20] text-[#C4C1A0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default SettingsPage;
