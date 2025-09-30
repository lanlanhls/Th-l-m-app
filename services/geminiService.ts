import { GoogleGenAI, Type } from "@google/genai";
import type { RiskData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const communesOfLangSon = [
    "Xã Thất Khê", "Xã Đoàn Kết", "Xã Tân Tiến", "Xã Tràng Định", "Xã Quốc Khánh", "Xã Kháng Chiến", "Xã Quốc Việt", "Xã Bình Gia", 
    "Xã Tân Văn", "Xã Hồng Phong", "Xã Hoa Thám", "Xã Quý Hòa", "Xã Thiện Hòa", "Xã Thiện Thuật", "Xã Thiện Long", "Xã Bắc Sơn", 
    "Xã Hưng Vũ", "Xã Vũ Lăng", "Xã Nhất Hòa", "Xã Vũ Lễ", "Xã Tân Tri", "Xã Vân Quan", "Xã Điềm He", "Xã Yên Phúc", "Xã Tri Lễ", 
    "Xã Tân Đoàn", "Xã Khánh Khê", "Xã Na Sầm", "Xã Hoàng Văn Thụ", "Xã Thụy Hùng", "Xã Văn Lãng", "Xã Hội Hoan", "Xã Lộc Bình", 
    "Xã Mẫu Sơn", "Xã Na Dương", "Xã Lợi Bác", "Xã Thông Nhất", "Xã Xuân Dương", "Xã Khuất Xá", "Xã Đình Lập", "Xã Thái Bình", 
    "Xã Châu Sơn", "Xã Kiến Mộc", "Xã Hữu Lũng", "Xã Tuấn Sơn", "Xã Tân Thành", "Xã Vân Nham", "Xã Yên Tĩnh", "Xã Yên Bình", 
    "Xã Hữu Liên", "Xã Cai Kinh", "Xã Chi Lăng", "Xã Quan Sơn", "Xã Chiên Thắng", "Xã Nhân Lý", "Xã Bằng Mạc", "Xã Vạn Linh", 
    "Xã Đồng Đăng", "Xã Cao Lộc", "Xã Công Sơn", "Xã Ba Sơn", "Phường Tam Thanh", "Phường Lương Văn Tri", "Phường Kỳ Lừa", "Phường Đông Kinh"
];


const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallRiskLevel: {
      type: Type.STRING,
      description: "Mức độ rủi ro tổng thể, một trong các giá trị: 'Thấp', 'Trung bình', 'Cao', 'Rất cao'.",
    },
    summary: {
      type: Type.STRING,
      description: "Một bản tóm tắt ngắn gọn bằng tiếng Việt về tình hình sạt lở đất cho ngày được chỉ định.",
    },
    communeRisks: {
      type: Type.ARRAY,
      description: "Một danh sách các rủi ro cho từng xã/phường.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Tên của xã hoặc phường ở Lạng Sơn.",
          },
          riskLevel: {
            type: Type.INTEGER,
            description: "Mức độ rủi ro từ 1 đến 4, trong đó 1 là Thấp, 2 là Trung bình, 3 là Cao, và 4 là Rất cao.",
          },
        },
        required: ["name", "riskLevel"],
      },
    },
  },
  required: ["overallRiskLevel", "summary", "communeRisks"],
};

export const fetchLandslidePrediction = async (date: Date): Promise<RiskData> => {
  const formattedDate = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const prompt = `
    Phân tích và tạo ra một báo cáo dự báo rủi ro sạt lở đất hư cấu nhưng hợp lý cho tỉnh Lạng Sơn, Việt Nam, cho ngày ${formattedDate}.
    Dựa trên các mô hình thời tiết mô phỏng cho ngày này (ví dụ: lượng mưa giả định, độ ẩm đất) và các yếu tố địa chất của khu vực.
    Lạng Sơn là một tỉnh miền núi phía Bắc Việt Nam, có khí hậu cận nhiệt đới.
    Sử dụng kiến thức về dữ liệu sạt lở đất của NASA làm cơ sở để đưa ra một đánh giá đáng tin cậy.
    1. Cung cấp mức độ rủi ro tổng thể (Thấp, Trung bình, Cao, Rất cao).
    2. Cung cấp một bản tóm tắt ngắn gọn bằng tiếng Việt.
    3. Đánh giá rủi ro cho TẤT CẢ 65 xã và phường của Lạng Sơn sau: ${communesOfLangSon.join(', ')}. Đảm bảo mọi xã/phường trong danh sách này đều có trong kết quả trả về.
    Cung cấp kết quả dưới dạng JSON theo schema đã định sẵn.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    if (!parsedData.communeRisks || parsedData.communeRisks.length < 65) {
        // Simple validation to ensure we got a reasonable number of results
      throw new Error(`AI response is missing or has incomplete commune risk data. Expected 65, got ${parsedData.communeRisks?.length || 0}`);
    }

    return parsedData as RiskData;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a valid prediction from the AI model.");
  }
};