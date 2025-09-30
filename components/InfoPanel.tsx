import React from 'react';
import type { RiskData } from '../types';

interface InfoPanelProps {
  riskData: RiskData;
}

const getRiskStyles = (level: string | number): { bg: string; text: string; ring: string, icon: string, label: string } => {
    let levelName: string;
    if (typeof level === 'number') {
        levelName = ['', 'thấp', 'trung bình', 'cao', 'rất cao'][level];
    } else {
        levelName = level.toLowerCase();
    }

    switch (levelName) {
        case 'rất cao':
            return { bg: 'bg-red-600/20', text: 'text-red-500', ring: 'ring-red-500', icon: '🚨', label: 'Rất cao' };
        case 'cao':
            return { bg: 'bg-orange-500/20', text: 'text-orange-500', ring: 'ring-orange-500', icon: '⚠️', label: 'Cao' };
        case 'trung bình':
            return { bg: 'bg-yellow-500/20', text: 'text-yellow-500', ring: 'ring-yellow-500', icon: '🟡', label: 'Trung bình' };
        case 'thấp':
            return { bg: 'bg-green-500/20', text: 'text-green-400', ring: 'ring-green-500', icon: '✅', label: 'Thấp' };
        default:
            return { bg: 'bg-gray-600/20', text: 'text-gray-500', ring: 'ring-gray-500', icon: '❔', label: 'Không xác định' };
    }
};

export const InfoPanel: React.FC<InfoPanelProps> = ({ riskData }) => {
  const { overallRiskLevel, summary, communeRisks } = riskData;
  const overallRiskStyles = getRiskStyles(overallRiskLevel);
  const sortedCommunes = [...communeRisks].sort((a, b) => b.riskLevel - a.riskLevel);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className={`p-6 rounded-xl shadow-lg border border-yellow-300/50 ${overallRiskStyles.bg}`}>
        <h2 className="text-lg font-semibold text-slate-700">Rủi ro Tổng thể</h2>
        <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-4xl">{overallRiskStyles.icon}</span>
            <p className={`text-3xl font-bold ${overallRiskStyles.text}`}>{overallRiskLevel}</p>
        </div>
        <p className="text-slate-600 text-center">{summary}</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-yellow-300/50 h-[60vh] flex flex-col">
        <h2 className="text-lg font-semibold text-slate-800 p-4 border-b border-yellow-300/60">
          Chi tiết Rủi ro theo Xã/Phường
        </h2>
        <div className="overflow-y-auto flex-grow">
            <ul className="divide-y divide-yellow-300/60">
            {sortedCommunes.map(commune => {
                const communeRiskStyles = getRiskStyles(commune.riskLevel);
                return (
                <li key={commune.name} className="flex justify-between items-center text-sm p-3 hover:bg-yellow-100/50 transition-colors duration-150">
                    <span className="text-slate-700">{commune.name}</span>
                    <span className={`font-bold px-2 py-1 rounded-full text-xs ${communeRiskStyles.text} ${communeRiskStyles.bg}`}>
                        {communeRiskStyles.label}
                    </span>
                </li>
                )
            })}
            </ul>
        </div>
      </div>
    </div>
  );
};