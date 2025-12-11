import React from 'react';
import { ViewState } from '../types';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  FileCheck, 
  PieChart, 
  Activity,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: ViewState.HOME, label: 'Beranda', icon: <Activity size={20} /> },
    { view: ViewState.AI_AGENT, label: 'Agen Pasien AI', icon: <MessageSquareText size={20} /> },
    { view: ViewState.DASHBOARD, label: 'Dashboard Keuangan', icon: <LayoutDashboard size={20} /> },
    { view: ViewState.RECONCILIATION, label: 'Rekonsiliasi Klaim', icon: <FileCheck size={20} /> },
    { view: ViewState.REPORTS, label: 'Laporan', icon: <PieChart size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          MediSync Nexus
        </h1>
        <p className="text-xs text-slate-400 mt-1">Sistem RSUP Fatmawati</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              currentView === item.view 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-slate-800 w-full rounded-lg transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};