import React, { useState } from 'react';

interface GameModalProps {
  onClose: () => void;
}

const questions = [
  {
    question: "Bạn nên làm gì nếu thấy những dấu hiệu của sạt lở đất (vết nứt trên mặt đất, cây cối nghiêng)?",
    options: [
      "Lại gần để xem xét kỹ hơn.",
      "Di tản ngay lập tức đến nơi cao hơn và an toàn.",
      "Chờ xem nó có thực sự xảy ra không."
    ],
    correctAnswer: 1,
    feedback: "Luôn ưu tiên an toàn! Di tản ngay lập tức khi có dấu hiệu nguy hiểm là hành động đúng đắn nhất."
  },
  {
    question: "Nơi nào sau đây là an toàn nhất để trú ẩn khi có cảnh báo sạt lở?",
    options: [
      "Tầng hầm của một ngôi nhà dưới chân đồi.",
      "Một tòa nhà kiên cố trên nền đất bằng phẳng, xa dốc núi.",
      "Bên trong ô tô trên đường gần sườn dốc."
    ],
    correctAnswer: 1,
    feedback: "Chọn một nơi trú ẩn vững chắc trên mặt đất ổn định và cách xa các khu vực nguy hiểm là lựa chọn an toàn."
  },
  {
    question: "Biện pháp nào giúp giảm nguy cơ sạt lở đất ở khu vực bạn sống?",
    options: [
      "Trồng thêm cây có rễ sâu trên sườn dốc.",
      "Xây nhà ngay sát mép dốc để có tầm nhìn đẹp.",
      "Dẫn tất cả nước mưa chảy thẳng xuống một điểm trên sườn dốc."
    ],
    correctAnswer: 0,
    feedback: "Thảm thực vật, đặc biệt là cây có rễ sâu, giúp giữ đất và ngăn ngừa xói mòn, làm giảm đáng kể nguy cơ sạt lở."
  },
  {
    question: "Sau khi sạt lở xảy ra, điều gì KHÔNG nên làm?",
    options: [
        "Tránh xa khu vực sạt lở vì có thể có thêm các vụ sạt lở khác.",
        "Lắng nghe thông tin từ chính quyền địa phương.",
        "Quay lại nhà ngay để lấy đồ đạc quan trọng."
    ],
    correctAnswer: 2,
    feedback: "An toàn là trên hết! Đừng quay lại khu vực nguy hiểm cho đến khi được các cơ quan chức năng cho phép."
  },
  {
    question: "Vật dụng nào quan trọng nhất cần có trong bộ dụng cụ khẩn cấp?",
    options: [
        "Trò chơi điện tử và đồ ăn vặt.",
        "Nước uống, thực phẩm, đèn pin và bộ sơ cứu.",
        "Sách ảnh gia đình và quần áo đẹp."
    ],
    correctAnswer: 1,
    feedback: "Một bộ dụng cụ khẩn cấp nên chứa những thứ thiết yếu để giúp bạn sinh tồn trong vài ngày đầu tiên sau thảm họa."
  },
  {
    question: "Nếu bạn đang ở ngoài trời và sạt lở sắp xảy ra, bạn nên làm gì?",
    options: [
        "Nhanh chóng di chuyển đến vùng đất cao nhất có thể, tránh xa đường đi của nó.",
        "Nấp dưới một cái cây to để được che chắn.",
        "Chạy về phía dòng chảy của sạt lở để thoát nhanh hơn."
    ],
    correctAnswer: 0,
    feedback: "Di chuyển lên cao và ra khỏi đường đi của sạt lở là cách tốt nhất để tránh khỏi nguy hiểm trực tiếp."
  },
    {
    question: "Âm thanh nào có thể là một dấu hiệu cảnh báo sớm của sạt lở đất?",
    options: [
        "Tiếng chim hót líu lo.",
        "Tiếng suối chảy róc rách như bình thường.",
        "Tiếng gầm nhẹ hoặc âm thanh lạo xạo, đá va vào nhau."
    ],
    correctAnswer: 2,
    feedback: "Những âm thanh bất thường như đá va chạm hoặc tiếng gầm có thể là dấu hiệu sớm của đất đá đang dịch chuyển."
  }
];

export const GameModal: React.FC<GameModalProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  const isFinished = currentQuestionIndex >= questions.length;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl shadow-xl w-full max-w-lg p-6 text-white transform transition-all animate-fade-in-up">
        {!isFinished ? (
          <>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-emerald-400">Kiến thức An toàn Sạt lở</h2>
                    <p className="text-gray-400">Câu {currentQuestionIndex + 1} / {questions.length} - Điểm: {score}</p>
                </div>
                <button onClick={onClose} className="text-2xl text-gray-500 hover:text-white">&times;</button>
            </div>
            <p className="text-lg mb-6">{questions[currentQuestionIndex].question}</p>
            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const isCorrect = index === questions[currentQuestionIndex].correctAnswer;
                const isSelected = selectedAnswer === index;
                let buttonClass = "w-full text-left p-3 rounded-lg border-2 border-slate-600 hover:bg-slate-700 transition-colors";
                if(showFeedback) {
                    if (isCorrect) buttonClass += " bg-green-500/30 border-green-500";
                    else if (isSelected) buttonClass += " bg-red-500/30 border-red-500";
                }
                return (
                  <button key={index} onClick={() => handleAnswerClick(index)} className={buttonClass} disabled={showFeedback}>
                    {option}
                  </button>
                )
              })}
            </div>
            {showFeedback && (
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg text-center">
                <p className="mb-3">{questions[currentQuestionIndex].feedback}</p>
                <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold">Tiếp tục</button>
              </div>
            )}
          </>
        ) : (
             <div className="text-center">
                <h2 className="text-2xl font-bold text-emerald-400 mb-2">Hoàn thành!</h2>
                <p className="text-lg mb-4">Điểm số cuối cùng của bạn là:</p>
                <p className="text-5xl font-bold mb-6">{score} / {questions.length}</p>
                <button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-3 rounded-lg font-bold">Đóng</button>
             </div>
        )}
      </div>
    </div>
  );
};