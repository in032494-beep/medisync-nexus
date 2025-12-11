import React, { useState } from 'react';
import { Upload, Search, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { ClaimData } from '../types';

const mockClaims: ClaimData[] = [
  { id: 'CLM-2023-001', patientName: 'Budi Santoso', date: '2023-10-01', amountSubmitted: 1500000, amountApproved: 1500000, status: 'Approved', bavMatch: true },
  { id: 'CLM-2023-002', patientName: 'Siti Aminah', date: '2023-10-02', amountSubmitted: 2000000, amountApproved: 1800000, status: 'Disputed', bavMatch: false },
  { id: 'CLM-2023-003', patientName: 'Agus Setiawan', date: '2023-10-03', amountSubmitted: 750000, amountApproved: 750000, status: 'Approved', bavMatch: true },
  { id: 'CLM-2023-004', patientName: 'Dewi Lestari', date: '2023-10-04', amountSubmitted: 3000000, amountApproved: 0, status: 'Pending', bavMatch: false },
  { id: 'CLM-2023-005', patientName: 'Rina Wati', date: '2023-10-05', amountSubmitted: 1200000, amountApproved: 1200000, status: 'Approved', bavMatch: true },
];

export const Reconciliation: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<ClaimData[]>(mockClaims);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processReconciliation = () => {
    if (!file) return;
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      alert("BAV File Processed Successfully! Discrepancies highlighted.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Upload size={24} className="text-blue-600"/>
            Import BAV Data (BPJS)
        </h2>
        <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center">
            <input 
                type="file" 
                id="bav-upload" 
                className="hidden" 
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
            />
            {file ? (
                 <div className="flex flex-col items-center">
                    <FileIcon className="w-12 h-12 text-green-500 mb-2" />
                    <span className="font-medium text-slate-700">{file.name}</span>
                    <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                 </div>
            ) : (
                <label htmlFor="bav-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Upload size={24} />
                    </div>
                    <p className="text-slate-700 font-medium">Click to upload BAV File</p>
                    <p className="text-slate-400 text-sm mt-1">Supports Excel (.xlsx) or CSV</p>
                </label>
            )}
            
            <button 
                onClick={processReconciliation}
                disabled={!file || isProcessing}
                className={`mt-6 px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                    !file || isProcessing ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isProcessing ? 'Processing Reconciliation...' : 'Run Reconciliation'}
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Reconciliation Results</h3>
              <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <Search size={16} /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                      <Download size={16} /> Export Report
                  </button>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                      <tr>
                          <th className="px-6 py-3 font-medium">Claim ID</th>
                          <th className="px-6 py-3 font-medium">Patient Name</th>
                          <th className="px-6 py-3 font-medium">Date</th>
                          <th className="px-6 py-3 font-medium">Submitted</th>
                          <th className="px-6 py-3 font-medium">Approved (BAV)</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                          <th className="px-6 py-3 font-medium">Match</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {data.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-700">{row.id}</td>
                              <td className="px-6 py-4 text-slate-600">{row.patientName}</td>
                              <td className="px-6 py-4 text-slate-600">{row.date}</td>
                              <td className="px-6 py-4 text-slate-600">Rp {row.amountSubmitted.toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4 text-slate-600">Rp {row.amountApproved.toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      row.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                      row.status === 'Disputed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                      {row.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4">
                                  {row.bavMatch ? (
                                      <CheckCircle className="text-green-500 w-5 h-5" />
                                  ) : (
                                      <AlertTriangle className="text-red-500 w-5 h-5" />
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

const FileIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
