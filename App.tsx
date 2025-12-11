import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatAgent } from './components/ChatAgent';
import { FinanceDashboard } from './components/FinanceDashboard';
import { Reconciliation } from './components/Reconciliation';
import { Reports } from './components/Reports';
import { ViewState } from './types';
import { Lock, User } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate simple login
    if (username && password) {
        setIsLoggedIn(true);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.AI_AGENT:
        return <ChatAgent />;
      case ViewState.DASHBOARD:
        return <FinanceDashboard />;
      case ViewState.RECONCILIATION:
        return <Reconciliation />;
      case ViewState.REPORTS:
        return <Reports />;
      case ViewState.HOME:
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Selamat Datang di MediSync Nexus</h1>
                <p className="text-blue-100 max-w-2xl">
                    Sistem Manajemen Rumah Sakit Terintegrasi untuk RSUP Fatmawati.
                    Kelola pertanyaan pasien melalui Agen AI dan tangani Rekonsiliasi Keuangan JKN dalam satu platform terpadu.
                </p>
                <div className="mt-6 flex gap-4">
                    <button 
                        onClick={() => setCurrentView(ViewState.AI_AGENT)}
                        className="bg-white text-blue-700 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                    >
                        Buka Agen Pasien AI
                    </button>
                    <button 
                        onClick={() => setCurrentView(ViewState.DASHBOARD)}
                        className="bg-blue-500 bg-opacity-30 border border-white border-opacity-30 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-opacity-40 transition-colors"
                    >
                        Ke Dashboard Keuangan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Status Sistem</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-600">Inti Routing AI</span>
                            <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> ONLINE
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-600">Server SIA (Internal)</span>
                            <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> TERHUBUNG
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-600">API Verifikasi BPJS</span>
                            <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> ONLINE
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="text-lg font-bold text-slate-800 mb-2">Aksi Cepat</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setCurrentView(ViewState.RECONCILIATION)} className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
                            <span className="block font-bold text-slate-700 group-hover:text-blue-700">Impor BAV</span>
                            <span className="text-xs text-slate-500">Unggah Excel BPJS</span>
                        </button>
                        <button onClick={() => setCurrentView(ViewState.REPORTS)} className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
                            <span className="block font-bold text-slate-700 group-hover:text-blue-700">Pendapatan Harian</span>
                            <span className="text-xs text-slate-500">Lihat pemasukan hari ini</span>
                        </button>
                     </div>
                </div>
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
                  <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-3xl">M</span>
                      </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-slate-800 mb-1">MediSync Nexus</h2>
                  <p className="text-center text-slate-500 text-sm mb-8">Sistem Terintegrasi RSUP Fatmawati</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                          <div className="relative">
                              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                              <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                          <div className="relative">
                              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                              <input 
                                type="password" 
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                          Login Aman
                      </button>
                  </form>
                  <p className="text-center text-xs text-slate-400 mt-6">
                      Hanya Personel Berwenang • Koneksi Aman
                  </p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="ml-64 flex-1 p-8 h-screen overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
            <div>
                 <h2 className="text-2xl font-bold text-slate-800">
                    {currentView === ViewState.HOME ? 'Ringkasan Dashboard' : 
                     currentView === ViewState.AI_AGENT ? 'Koordinator Pasien AI' :
                     currentView === ViewState.DASHBOARD ? 'Tinjauan Keuangan' :
                     currentView === ViewState.RECONCILIATION ? 'Rekonsiliasi Klaim' : 'Laporan'}
                 </h2>
                 <p className="text-slate-500 text-sm">RSUP Fatmawati • {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                    {username.charAt(0).toUpperCase()}
                 </div>
                 <div className="text-right hidden sm:block">
                     <p className="text-sm font-bold text-slate-700">{username || 'Admin'}</p>
                     <p className="text-xs text-slate-500">Dept Keuangan</p>
                 </div>
            </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;