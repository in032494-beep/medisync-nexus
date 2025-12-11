import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, AlertCircle, FileCheck, DollarSign } from 'lucide-react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {change && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${
            change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {change} from last month
        </span>
      )}
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
      {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
    </div>
  </div>
);

export const FinanceDashboard: React.FC = () => {
  const barData = [
    { name: 'Jan', submitted: 4000, approved: 2400 },
    { name: 'Feb', submitted: 3000, approved: 1398 },
    { name: 'Mar', submitted: 2000, approved: 9800 },
    { name: 'Apr', submitted: 2780, approved: 3908 },
    { name: 'May', submitted: 1890, approved: 4800 },
    { name: 'Jun', submitted: 2390, approved: 3800 },
  ];

  const pieData = [
    { name: 'Paid', value: 75, color: '#10B981' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Disputed', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Claims Submitted" 
          value="Rp 2.4B" 
          change="+12%" 
          icon={<FileCheck />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Approved (BAV)" 
          value="Rp 1.9B" 
          change="+8%" 
          icon={<TrendingUp />} 
          color="bg-green-500"
        />
        <StatCard 
          title="Claim Discrepancy" 
          value="Rp 500M" 
          change="-2%" 
          icon={<AlertCircle />} 
          color="bg-red-500"
        />
        <StatCard 
          title="Cost Recovery Rate" 
          value="82.5%" 
          change="+1.5%" 
          icon={<DollarSign />} 
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Claim Submission vs Approval Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    cursor={{fill: '#f1f5f9'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="submitted" name="Submitted" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" name="Approved (BAV)" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Claim Status Distribution</h3>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">Based on current period (October 2023)</p>
          </div>
        </div>
      </div>
      
      {/* Workflow Diagram Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">SIA Deployment Architecture</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-slate-50 rounded-lg border border-slate-200">
           
           <div className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border border-slate-200 w-32">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
               <User className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold text-slate-700">Client PC</span>
           </div>

           <div className="h-0.5 w-12 bg-slate-300 md:w-24 relative">
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 bg-slate-50 px-1">LAN/Net</span>
           </div>

           <div className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border border-slate-200 w-32 border-red-200">
             <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold text-slate-700">Firewall</span>
           </div>

           <div className="h-0.5 w-12 bg-slate-300 md:w-24"></div>

           <div className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border border-slate-200 w-32">
             <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
               <Server className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold text-slate-700">App Server</span>
           </div>

           <div className="h-0.5 w-12 bg-slate-300 md:w-24 relative">
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 bg-slate-50 px-1">LAN</span>
           </div>

           <div className="flex flex-col items-center p-4 bg-white shadow-sm rounded-lg border border-slate-200 w-32">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
               <Database className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold text-slate-700">Database</span>
           </div>
        </div>
      </div>
    </div>
  );
};

// Quick icons for the diagram
const User = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const ShieldCheck = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
const Server = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
const Database = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
