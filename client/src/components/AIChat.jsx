
import React, { useState } from 'react';

export default function AIChat() {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'হ্যালো! আমি আপনার জেমিনি এআই অ্যাসিস্ট্যান্ট। আজ আপনাকে কীভাবে সাহায্য করতে পারি?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = "YOUR_GEMINI_API_KEY"; // এখানে আপনার জেমিনি এপিআই কি বসাবেন

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            });

            const data = await response.json();
            const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
            
            setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
            speakText(aiReply);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।" }]);
        } finally {
            setLoading(false);
        }
    };

    const startVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'bn-BD';
        recognition.start();

        recognition.onresult = (event) => {
            setInput(event.results[0][0].transcript);
        };
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'bn-BD';
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', background: '#1e293b', color: '#fff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <h3>Taskflow AI Assistant</h3>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px', padding: '10px', background: '#0f172a', borderRadius: '8px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ padding: '10px', borderRadius: '8px', maxWidth: '80%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? '#3b82f6' : '#334155' }}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={{ color: '#94a3b8' }}>চিস্তা করা হচ্ছে...</div>}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="এখানে কিছু লিখুন..." 
                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#1e293b', color: '#fff' }}
                />
                <button onClick={startVoiceInput} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>🎤</button>
                <button onClick={sendMessage} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer' }}>পাঠান</button>
            </div>
        </div>
    );
}
