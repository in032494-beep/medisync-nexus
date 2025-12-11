import React, { useState } from 'react';
import { Upload, Search, Download, CheckCircle, AlertTriangle, FileText, CheckSquare, XSquare } from 'lucide-react';
import { ClaimData } from '../types';

const mockClaims: ClaimData[] = [
  { 
    id: 'CLM-2023-001', 
    patientName: 'Budi Santoso', 
    type: 'Rawat Jalan',
    date: '2023-10-01', 
    amountSubmitted: 1500000, 
    amountApproved: 1500000, 
    status: 'Disetujui', 
    bavMatch: true,
    documents: { sep: true, resume: true, billing: true, coding: true }
  },
  { 
    id: 'CLM-2023-002', 
    patientName: 'Siti Aminah', 
    type: 'Rawat Inap',
    date: '2023-10-02', 
    amountSubmitted: 2000000, 
    amountApproved: 1800000, 
    status: 'Sengketa', 
    bavMatch: false,
    documents: { sep: true, resume: true, billing: true, coding: false }
  },
  { 
    id: 'CLM-2023-003', 
    patientName: 'Agus Setiawan', 
    type: 'Rawat Jalan',
    date: '2023-10-03', 
    amountSubmitted: 750000, 
    amountApproved: 750000, 
    status: 'Disetujui', 
    bavMatch: true,
    documents: { sep: true, resume: true, billing: true, coding: true }
  },
  { 
    id: 'CLM-2023-004', 
    patientName: 'Dewi Lestari', 
    type: 'Rawat Inap',
    date: '2023-10-04', 
    amountSubmitted: 3000000, 
    amountApproved: 0, 
    status: 'Menunggu', 
    bavMatch: false,
    documents: { sep: false, resume: true, billing: true, coding: false }
  },
  { 
    id: 'CLM-2023-005', 
    patientName: 'Rina Wati', 
    type: 'Rawat Jalan',
    date: '2023-10-05', 
    amountSubmitted: 1200000, 
    amountApproved: 1200000, 
    status: 'Disetujui', 
    bavMatch: true,
    documents: { sep: true, resume: true, billing: true, coding: true }
  },
];

export const Reconciliation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'checklist'>('reconciliation');
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
      alert("File BAV Berhasil Diproses! Selisih data telah ditandai.");
    }, 2000);
  };

  const toggleDocument = (id: string, doc: keyof ClaimData['documents']) => {
    setData(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          documents: {
            ...item.documents,
            [doc]: !item.documents[doc]
          }
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${
            activeTab === 'reconciliation' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Rekonsiliasi BAV (BPJS)
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`pb-2 px-4 font-medium text-sm transition-colors ${
            activeTab === 'checklist' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Checklist Dokumen (Prosedur C)
        </button>
      </div>

      {activeTab === 'reconciliation' ? (
        <>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Upload size={24} className="text-blue-600"/>
                Impor Data BAV (BPJS)
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
                        <p className="text-slate-700 font-medium">Klik untuk unggah File BAV</p>
                        <p className="text-slate-400 text-sm mt-1">Mendukung Excel (.xlsx) atau CSV</p>
                    </label>
                )}
                
                <button 
                    onClick={processReconciliation}
                    disabled={!file || isProcessing}
                    className={`mt-6 px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                        !file || isProcessing ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isProcessing ? 'Memproses Rekonsiliasi...' : 'Jalankan Rekonsiliasi'}
                </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Hasil Rekonsiliasi</h3>
                  <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <Search size={16} /> Filter
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                          <Download size={16} /> Ekspor Laporan
                      </button>
                  </div>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                          <tr>
                              <th className="px-6 py-3 font-medium">ID Klaim</th>
                              <th className="px-6 py-3 font-medium">Pasien</th>
                              <th className="px-6 py-3 font-medium">Diajukan</th>
                              <th className="px-6 py-3 font-medium">Disetujui (BAV)</th>
                              <th className="px-6 py-3 font-medium">Status</th>
                              <th className="px-6 py-3 font-medium">Cocok</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {data.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50">
                                  <td className="px-6 py-4 font-medium text-slate-700">{row.id}</td>
                                  <td className="px-6 py-4 text-slate-600">
                                    <div>{row.patientName}</div>
                                    <div className="text-xs text-slate-400">{row.type}</div>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600">Rp {row.amountSubmitted.toLocaleString('id-ID')}</td>
                                  <td className="px-6 py-4 text-slate-600">Rp {row.amountApproved.toLocaleString('id-ID')}</td>
                                  <td className="px-6 py-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          row.status === 'Disetujui' ? 'bg-green-100 text-green-700' : 
                                          row.status === 'Sengketa' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
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
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-6 border-b border-slate-100">
             <h2 className="text-xl font-bold text-slate-800">Kelengkapan Dokumen Klaim</h2>
             <p className="text-sm text-slate-500 mt-1">
               Prosedur yang Diusulkan: Checklist kelengkapan berkas klaim (Rawat Jalan & Rawat Inap).
             </p>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                   <tr>
                      <th className="px-6 py-3 font-medium">Detail Klaim</th>
                      <th className="px-6 py-3 font-medium text-center">SEP</th>
                      <th className="px-6 py-3 font-medium text-center">Resume Medis</th>
                      <th className="px-6 py-3 font-medium text-center">Rincian Biaya</th>
                      <th className="px-6 py-3 font-medium text-center">Coding</th>
                      <th className="px-6 py-3 font-medium text-center">Lengkap</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {data.map((row) => {
                     const isComplete = row.documents.sep && row.documents.resume && row.documents.billing && row.documents.coding;
                     return (
                       <tr key={row.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4">
                            <div className="font-medium text-slate-700">{row.patientName}</div>
                            <div className="text-xs text-slate-500">{row.id} • {row.type}</div>
                         </td>
                         <td className="px-6 py-4 text-center cursor-pointer" onClick={() => toggleDocument(row.id, 'sep')}>
                            {row.documents.sep ? <CheckSquare className="mx-auto text-blue-600 w-5 h-5" /> : <div className="w-5 h-5 border-2 border-slate-300 rounded mx-auto"></div>}
                         </td>
                         <td className="px-6 py-4 text-center cursor-pointer" onClick={() => toggleDocument(row.id, 'resume')}>
                            {row.documents.resume ? <CheckSquare className="mx-auto text-blue-600 w-5 h-5" /> : <div className="w-5 h-5 border-2 border-slate-300 rounded mx-auto"></div>}
                         </td>
                         <td className="px-6 py-4 text-center cursor-pointer" onClick={() => toggleDocument(row.id, 'billing')}>
                            {row.documents.billing ? <CheckSquare className="mx-auto text-blue-600 w-5 h-5" /> : <div className="w-5 h-5 border-2 border-slate-300 rounded mx-auto"></div>}
                         </td>
                         <td className="px-6 py-4 text-center cursor-pointer" onClick={() => toggleDocument(row.id, 'coding')}>
                            {row.documents.coding ? <CheckSquare className="mx-auto text-blue-600 w-5 h-5" /> : <div className="w-5 h-5 border-2 border-slate-300 rounded mx-auto"></div>}
                         </td>
                         <td className="px-6 py-4 text-center">
                            {isComplete ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                <CheckCircle size={12} /> LENGKAP
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                <AlertTriangle size={12} /> BELUM
                              </span>
                            )}
                         </td>
                       </tr>
                     );
                   })}
                </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

const FileIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>