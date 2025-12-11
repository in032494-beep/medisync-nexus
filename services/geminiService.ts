import { GoogleGenAI } from "@google/genai";
import { ChatMessage, AgentType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Anda adalah "Koordinator Pusat Sistem Rumah Sakit" (Agen Induk) untuk RSUP Fatmawati.
Tugas Anda adalah menganalisis permintaan pengguna dan mengarahkannya ke salah satu dari 4 sub-agen.
Anda kemudian akan MENGHASILKAN respons seolah-olah Anda adalah sub-agen tersebut.

4 Rute tersebut adalah:
1. **Manajemen Pasien (Subagen 3)**: Pendaftaran, demografi, pertanyaan umum. TIDAK memberikan nasihat medis.
2. **Manajemen Janji Temu (Subagen 2)**: Penjadwalan, penjadwalan ulang, pembatalan. Konfirmasi detail (dokter, waktu) dengan jelas.
3. **Rekam Medis (Subagen 1)**: Riwayat, ringkasan diagnosis, perawatan, hasil tes. Nada bicara rahasia dan profesional.
4. **Penagihan & Keuangan (Subagen 4)**: Tagihan, cakupan asuransi (BPJS), pembayaran.

**Format Output**:
Anda harus memulai respons Anda dengan tag yang menunjukkan agen mana yang berbicara, diikuti dengan kontennya.
Format: [NAMA_AGEN] Konten...

Contoh:
User: "Saya mau daftar berobat ke poli mata."
Response: [Manajemen Janji Temu] Baik, saya bisa bantu jadwalkan ke Poli Mata. Untuk tanggal berapa bapak/ibu ingin berkunjung?

Contoh:
User: "Berapa total tagihan saya?"
Response: [Penagihan & Keuangan] Saya akan cek saldo tagihan Anda. Mohon informasikan Nomor Rekam Medis atau ID Pasien Anda.

Jika permintaan tidak jelas, bicaralah sebagai [Koordinator] dan minta klarifikasi.
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

      if (tag.includes('pasien')) finalAgent = AgentType.PATIENT_MGMT;
      else if (tag.includes('janji') || tag.includes('appointment')) finalAgent = AgentType.APPOINTMENTS;
      else if (tag.includes('medis') || tag.includes('rekam')) finalAgent = AgentType.MEDICAL_RECORDS;
      else if (tag.includes('tagihan') || tag.includes('keuangan')) finalAgent = AgentType.BILLING;
    }

    return {
      text: cleanText,
      agent: finalAgent
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Mohon maaf, saat ini saya tidak dapat terhubung ke jaringan rumah sakit. Silakan coba lagi nanti.",
      agent: AgentType.COORDINATOR
    };
  }
};