import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Stethoscope, Calendar, FileText, CreditCard } from 'lucide-react';
import { ChatMessage, AgentType } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatAgent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hello! I am your Hospital System Coordinator. How can I assist you today? I can help with appointments, medical records, patient registration, or billing inquiries.',
      agent: AgentType.COORDINATOR,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(messages, inputText);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        agent: response.agent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentIcon = (agent?: AgentType) => {
    switch (agent) {
      case AgentType.PATIENT_MGMT: return <User className="w-5 h-5 text-green-500" />;
      case AgentType.APPOINTMENTS: return <Calendar className="w-5 h-5 text-purple-500" />;
      case AgentType.MEDICAL_RECORDS: return <FileText className="w-5 h-5 text-orange-500" />;
      case AgentType.BILLING: return <CreditCard className="w-5 h-5 text-yellow-500" />;
      default: return <Bot className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAgentStyle = (agent?: AgentType) => {
    switch (agent) {
      case AgentType.PATIENT_MGMT: return 'bg-green-50 border-green-200';
      case AgentType.APPOINTMENTS: return 'bg-purple-50 border-purple-200';
      case AgentType.MEDICAL_RECORDS: return 'bg-orange-50 border-orange-200';
      case AgentType.BILLING: return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Hospital System Coordinator</h2>
          <p className="text-sm text-slate-500">AI-Powered Routing System</p>
        </div>
        <div className="flex gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Patient Mgmt</span>
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Appointments</span>
            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">Records</span>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Billing</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-white'
              }`}>
                 {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : getAgentIcon(msg.agent)}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : `${getAgentStyle(msg.agent)} text-slate-800 rounded-bl-none border`
              }`}>
                {msg.role === 'model' && (
                  <p className="text-xs font-bold mb-1 opacity-70 uppercase tracking-wider">
                    {msg.agent}
                  </p>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="flex items-end gap-2">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <Bot className="w-5 h-5 text-blue-500 animate-pulse" />
               </div>
               <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-slate-800 placeholder-slate-400"
            placeholder="Ask about appointments, bills, or medical records..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
