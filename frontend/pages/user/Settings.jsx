import React, { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  Shield,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ProfileSettings from "../../src/components/user/ProfileSettings";
import AccountSettings from "../../src/components/user/AccountSettings";
import BillingSettings from "../../src/components/user/BillingSettings";
import Background from "../../src/components/Background";

const TABS = [
  { id: "profile", label: "Profile", icon: User, desc: "Manage your public profile" },
  { id: "account", label: "Account", icon: Shield, desc: "Security and preferences" },
  { id: "billing", label: "Billing", icon: CreditCard, desc: "Payment methods and plans" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Email and push alerts" },
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
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <Settings size={48} className="mb-4 opacity-50" />
            <p>Settings for {activeTab} coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
      <Background />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row gap-10">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5C542] to-yellow-600 flex items-center justify-center text-black shadow-lg">
                <Settings size={20} />
              </div>
              <div>
                <h1 className="font-bold text-lg">Settings</h1>
                <p className="text-xs text-gray-500">Manage your workspace</p>
              </div>
            </div>

            <nav className="space-y-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${isActive
                        ? "bg-white/[0.08] text-white shadow-inner"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F5C542] rounded-r-full" />}
                    <tab.icon size={18} className={isActive ? "text-[#F5C542]" : "text-gray-500 group-hover:text-gray-300"} />
                    <div>
                      <span className="block text-sm font-medium">{tab.label}</span>
                      {/* <span className="block text-[10px] opacity-50">{tab.desc}</span> */}
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/[0.05] px-2">
              <button className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm font-medium w-full p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0">
          <div className="bg-[#1A1A1A]/30 backdrop-blur-md border border-white/[0.05] rounded-3xl p-6 md:p-10 min-h-[600px]">
            <div className="mb-8 pb-6 border-b border-white/[0.05] flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-gray-400">
                  {TABS.find(t => t.id === activeTab)?.desc}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
                {React.createElement(TABS.find(t => t.id === activeTab)?.icon || Settings, { size: 20, className: "text-[#F5C542]" })}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default SettingsPage;
