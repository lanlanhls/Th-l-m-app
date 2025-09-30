import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { InfoPanel } from './components/InfoPanel';
import { MapPanel } from './components/MapPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchLandslidePrediction } from './services/geminiService';
import type { RiskData } from './types';
import { Toast } from './components/Toast';
import { GameModal } from './components/GameModal';

const App: React.FC = () => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGameVisible, setGameVisible] = useState<boolean>(false);
  const [isMuted, setMuted] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  const playAlarm = () => {
    if (isMuted) return;
    
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser.", e);
        return;
      }
    }

    const context = audioContextRef.current;
     if (context.state === 'suspended') {
        context.resume();
    }
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(900, context.currentTime); 
    gainNode.gain.setValueAtTime(0.3, context.currentTime);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.6);
  };
  
  const getPrediction = async (date: Date) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLandslidePrediction(date);
        setRiskData(data);
      } catch (err)
 {
        console.error("Error fetching landslide prediction:", err);
        setError("Không thể tải dữ liệu dự báo. Vui lòng thử lại sau.");
        setRiskData(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    getPrediction(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (riskData && (riskData.overallRiskLevel === 'Cao' || riskData.overallRiskLevel === 'Rất cao')) {
      playAlarm();
    }
  }, [riskData, isMuted]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    // Adjust for timezone offset
    const timezoneOffset = newDate.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(newDate.getTime() + timezoneOffset));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen font-sans">
      <Header 
        onPlayGame={() => setGameVisible(true)}
        isMuted={isMuted}
        onToggleMute={() => setMuted(!isMuted)}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {isGameVisible && <GameModal onClose={() => setGameVisible(false)} />}
        {loading && (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-slate-600 animate-pulse">Đang phân tích dữ liệu và tạo dự báo...</p>
          </div>
        )}
        {error && <Toast message={error} type="error" />}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-yellow-300/50">
                <label htmlFor="date-picker" className="block text-sm font-medium text-slate-700 mb-2">Chọn ngày dự báo:</label>
                 <input 
                  type="date"
                  id="date-picker"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={handleDateChange}
                  max={today}
                  className="w-full p-2 rounded-md bg-white/80 border-yellow-400 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {riskData && <MapPanel />}
            </div>
            <div className="lg:col-span-2">
              {riskData && <InfoPanel riskData={riskData} />}
            </div>
          </div>
        )}
         <footer className="text-center text-slate-600 text-sm mt-12 pb-4">
            <p>Tuyên bố miễn trừ trách nhiệm: Thông tin trên trang này là sản phẩm mô phỏng của AI và chỉ dành cho mục đích trình diễn, không được sử dụng cho các quyết định trong đời thực.</p>
            <p>&copy; 2024 Lạng Sơn Landslide Prediction Demo</p>
        </footer>
      </main>
    </div>
  );
};

export default App;