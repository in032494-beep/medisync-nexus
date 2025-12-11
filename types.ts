import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  AI_AGENT = 'AI_AGENT',
  DASHBOARD = 'DASHBOARD',
  RECONCILIATION = 'RECONCILIATION',
  REPORTS = 'REPORTS'
}

export enum AgentType {
  COORDINATOR = 'Coordinator',
  PATIENT_MGMT = 'Patient Management',
  APPOINTMENTS = 'Appointment',
  MEDICAL_RECORDS = 'Medical Records',
  BILLING = 'Billing & Finance'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  agent?: AgentType; // Which sub-agent is responding
  timestamp: Date;
}

export interface ClaimData {
  id: string;
  patientName: string;
  type: 'Outpatient' | 'Inpatient';
  date: string;
  amountSubmitted: number;
  amountApproved: number;
  status: 'Pending' | 'Approved' | 'Disputed';
  bavMatch: boolean;
  // Checklist for completeness (Section C)
  documents: {
    sep: boolean;      // Surat Eligibilitas Peserta
    resume: boolean;   // Resume Medis
    billing: boolean;  // Rincian Biaya
    coding: boolean;   // Coding Diagnosis
  }
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
}