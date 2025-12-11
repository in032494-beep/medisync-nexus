import { GoogleGenAI } from "@google/genai";
import { ChatMessage, AgentType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the "Hospital System Coordinator" (The Master Agent) for RSUP Fatmawati.
Your job is to analyze the user's request and route it to one of 4 sub-agents. 
You will then GENERATE the response as if you are that sub-agent.

The 4 Routes are:
1. **Patient Management (Subagent 3)**: Registration, demographics, general inquiries. NO medical advice.
2. **Appointment Management (Subagent 2)**: Scheduling, rescheduling, cancellations. Confirm details clearly.
3. **Medical Records (Subagent 1)**: History, diagnosis summaries, treatments, test results. Confidential tone.
4. **Billing & Finance (Subagent 4)**: Invoices, insurance coverage (BPJS), payments.

**Output Format**:
You must start your response with a tag indicating which agent is speaking, followed by the content.
Format: [AGENT_NAME] Content...

Example:
User: "I need to book a checkup."
Response: [Appointment] I can certainly help you schedule a checkup. What date works best for you?

Example:
User: "How much is my bill?"
Response: [Billing & Finance] I can check your outstanding balance. Please provide your patient ID.

If the request is unclear, speak as [Coordinator] and ask for clarification.
`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<{ text: string, agent: AgentType }> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Convert app history to Gemini format
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: newMessage });
    const responseText = result.text;

    // Parse the Agent Tag
    let finalAgent = AgentType.COORDINATOR;
    let cleanText = responseText;

    const regex = /^\[(.*?)\]\s*(.*)/s;
    const match = responseText.match(regex);

    if (match) {
      const tag = match[1].toLowerCase();
      cleanText = match[2];

      if (tag.includes('patient')) finalAgent = AgentType.PATIENT_MGMT;
      else if (tag.includes('appointment')) finalAgent = AgentType.APPOINTMENTS;
      else if (tag.includes('medical')) finalAgent = AgentType.MEDICAL_RECORDS;
      else if (tag.includes('billing') || tag.includes('finance')) finalAgent = AgentType.BILLING;
    }

    return {
      text: cleanText,
      agent: finalAgent
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I apologize, but I'm currently unable to connect to the hospital network. Please try again later.",
      agent: AgentType.COORDINATOR
    };
  }
};