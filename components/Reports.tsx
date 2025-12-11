import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  const reports = [
    { id: 1, title: 'Laporan Klaim Rawat Jalan', type: 'Rawat Jalan', date: 'Okt 2023', status: 'Ready' },
    { id: 2, title: 'Laporan Klaim Rawat Inap', type: 'Rawat Inap', date: 'Okt 2023', status: 'Processing' },
    { id: 3, title: 'Laporan Pendapatan (Revenue)', type: 'Keuangan', date: 'Q3 2023', status: 'Ready' },
    { id: 4, title: 'Analisis Cost Recovery Rate (CRR)', type: 'Analisis', date: 'YTD 2023', status: 'Ready' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pembuatan Laporan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Laporan</label>
                <select className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Laporan Klaim Rawat Jalan</option>
                    <option>Laporan Klaim Rawat Inap</option>
                    <option>Pendapatan Keuangan</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Periode</label>
                <div className="relative">
                    <input type="month" className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-blue-500" />
                    <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>
            <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Buat Laporan
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
              <div key={report.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                          <FileText size={24} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800">{report.title}</h4>
                          <p className="text-sm text-slate-500">{report.type} • {report.date}</p>
                      </div>
                  </div>
                  <button 
                    disabled={report.status !== 'Ready'}
                    className={`p-2 rounded-full transition-colors ${
                        report.status === 'Ready' ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50' : 'text-slate-200 cursor-not-allowed'
                    }`}
                   >
                      <Download size={20} />
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
};