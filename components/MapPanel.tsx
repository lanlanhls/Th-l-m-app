import React from 'react';

export const MapPanel: React.FC = () => {
  return (
    <div className="bg-slate-800/60 rounded-xl shadow-2xl p-4 sm:p-6 h-full border border-slate-700 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-200">Bản đồ Rủi ro Sạt lở</h2>
        <p className="text-gray-400">
          Bản đồ nền hiển thị vị trí địa lý của các xã và phường trong tỉnh Lạng Sơn. 
          Phân tích chi tiết về mức độ rủi ro cho từng khu vực được trình bày trong bảng bên cạnh.
        </p>
      </div>
       <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>Thấp</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>Trung bình</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-orange-500 mr-2"></span>Cao</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-600 mr-2"></span>Rất cao</div>
       </div>
    </div>
  );
};